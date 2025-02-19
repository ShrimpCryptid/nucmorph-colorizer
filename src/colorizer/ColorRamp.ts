import { DataTexture, Color, ColorRepresentation, RGBAFormat, FloatType, LinearFilter, NearestFilter } from "three";

export enum ColorRampType {
  LINEAR,
  HARD_STOP,
}

export default class ColorRamp {
  private colorStops: Color[];
  public readonly texture: DataTexture;
  private type: ColorRampType;

  constructor(colorStops: ColorRepresentation[], type: ColorRampType = ColorRampType.LINEAR) {
    this.colorStops = colorStops.map((color) => new Color(color));
    const dataArr = this.colorStops.flatMap((col) => [col.r, col.g, col.b, 1]);
    this.texture = new DataTexture(new Float32Array(dataArr), this.colorStops.length, 1, RGBAFormat, FloatType);
    this.type = type;
    if (this.type === ColorRampType.HARD_STOP) {
      this.texture.minFilter = NearestFilter;
      this.texture.magFilter = NearestFilter;
    } else {
      this.texture.minFilter = LinearFilter;
      this.texture.magFilter = LinearFilter;
    }
    this.texture.internalFormat = "RGBA32F";
    this.texture.needsUpdate = true;
  }

  /** Creates a canvas filled in with this color ramp, to present as an option in a menu e.g. */
  public createGradientCanvas(width: number, height: number, vertical = false): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;

    if (this.colorStops.length < 2) {
      ctx.fillStyle = `#${this.colorStops[0].getHexString()}`;
      ctx.fillRect(0, 0, width, height);
    } else if (this.type === ColorRampType.LINEAR) {
      const gradient = ctx.createLinearGradient(0, 0, vertical ? 0 : width, vertical ? height : 0);
      const step = 1 / (this.colorStops.length - 1);
      this.colorStops.forEach((color, idx) => {
        gradient.addColorStop(step * idx, `#${color.getHexString()}`);
      });
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    } else {
      // Draw as hard stop gradients
      const step = width / this.colorStops.length;
      this.colorStops.forEach((color, idx) => {
        ctx.fillStyle = `#${color.getHexString()}`;
        ctx.fillRect(Math.floor(step * idx), 0, Math.ceil(step), height);
      });
    }

    return canvas;
  }

  public dispose(): void {
    this.texture.dispose();
  }

  /**
   * Samples the color of the ColorRamp at an interpolation time `t`.
   * @param t A float, in the range of 0 to 1.
   * @returns a new `Color` object, representing the interpolated color
   * of the ramp at the time `t`.
   */
  public sample(t: number): Color {
    // Clamp t
    t = Math.min(Math.max(t, 0), 1);

    // Scale t so it represents a (float) index in the array of color stops
    const tIndex = t * (this.colorStops.length - 1);

    // Get the two colors on either side of the tIndex
    const minIndex = Math.floor(tIndex);
    const maxIndex = Math.ceil(tIndex);
    // For single-color color ramps, or if t is the exact index of a color stop
    if (maxIndex === minIndex) {
      return new Color(this.colorStops[minIndex]);
    }

    // Get a new normalized t value between the min and max indices, range [0, 1]
    const tNormalized = (tIndex - minIndex) / (maxIndex - minIndex);
    const minColor = new Color(this.colorStops[minIndex]);
    const maxColor = new Color(this.colorStops[maxIndex]);
    return minColor.lerp(maxColor, tNormalized);
  }

  /**
   * Returns a new ColorRamp object with a reversed gradient.
   */
  public reverse(): ColorRamp {
    const newColorStops = [...this.colorStops].reverse();
    return new ColorRamp(newColorStops);
  }
}
