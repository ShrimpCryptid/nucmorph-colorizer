import { Color } from "three";
import { RawColorData } from "./color_ramps";

export type PaletteData = RawColorData & {
  colors: Color[];
};

const rawPaletteData: RawColorData[] = [
  {
    key: "adobe-bold",
    name: "Bold",
    colorStops: [
      "#27B4AE",
      "#4047C4",
      "#F48730",
      "#DB4281",
      "#7E84F4",
      "#78DF76",
      "#1C7AED",
      "#7129CD",
      "#E7C73B",
      "#C95F1E",
      "#188E61",
      "#BEE952",
    ],
  },
  {
    key: "adobe-bold-light",
    name: "Bold Light",
    colorStops: [
      "#93D9D7",
      "#8DBCF6",
      "#F9C397",
      "#EDA0C0",
      "#BEC1F9",
      "#BBEFBA",
      "#9FA3E1",
      "#B894E6",
      "#F3E39D",
      "#E4AF8E",
      "#8BC7B0",
      "#DFF4A8",
    ],
  },
  {
    key: "matplotlib-paired",
    name: "Paired",
    colorStops: [
      "#A8CEE2",
      "#2678B0",
      "#B4DF92",
      "#3C9F3C",
      "#F99C9B",
      "#E02626",
      "#FCC079",
      "#FC822A",
      "#C9B3D4",
      "#693E96",
      "#CC967B",
      "#AF5B31",
    ],
  },
  {
    key: "matplotlib-accent",
    name: "Accent",
    colorStops: [
      "#F25FA4",
      "#7598C5",
      "#E8E895",
      "#AC8FD2",
      "#A8D9AA",
      "#BD5D26",
      "#BEAED2",
      "#5D5D6A",
      "#FFFFA4",
      "#3A6CAC",
      "#ED1B7D",
      "#83C885",
    ],
  },
  {
    key: "matplotlib-tab10",
    name: "Set 1",
    colorStops: [
      "#2677B0",
      "#FC822E",
      "#369F3C",
      "#E179BF",
      "#8B574D",
      "#9368B9",
      "#8A0115",
      "#BCBD40",
      "#64637C",
      "#2CBDCD",
      "#FF8964",
      "#862CCD",
    ],
  },
  {
    key: "iwanthue-set2",
    name: "Set 2",
    colorStops: [
      "#E085FB",
      "#8BE56C",
      "#D12983",
      "#03BD7D",
      "#64E9CB",
      "#F16741",
      "#DC9F1C",
      "#8A0115",
      "#0047AA",
      "#00B69C",
      "#BDB0FF",
      "#FCCE6F",
    ],
  },
  {
    key: "iwanthue-set3",
    name: "Set 3",
    colorStops: [
      "#767800",
      "#FF6B76",
      "#7E0046",
      "#9BE5AB",
      "#2FEBE5",
      "#990004",
      "#007631",
      "#F769CD",
      "#73ED84",
      "#832093",
      "#FFC140",
      "#0080EA",
    ],
  },
  {
    key: "bright",
    name: "Bright",
    colorStops: [
      "#33FCFE",
      "#F91EF8",
      "#49FE86",
      "#FAEC4C",
      "#AF26F3",
      "#49FEFE",
      "#FFB800",
      "#6822F2",
      "#F72B75",
      "#F89C38",
      "#CFFA4E",
      "#3EBAFB",
    ],
  },
  {
    key: "iwanthue-dark",
    name: "Dark",
    colorStops: [
      "#44C098",
      "#A2408D",
      "#6A70D7",
      "#9B8034",
      "#B94858",
      "#543889",
      "#BA4B7D",
      "#C6A940",
      "#BA5436",
      "#67A852",
      "#638ED5",
      "#FCCE6F",
    ],
  },
  {
    key: "matplotlib-pastel1",
    name: "Pastel 1",
    colorStops: [
      "#90D3C8",
      "#BB81BA",
      "#FBB56D",
      "#82B1D1",
      "#B5DE76",
      "#F88376",
      "#BEBAD8",
      "#FBCEE4",
      "#DDC09E",
      "#9EDADD",
      "#FFED7F",
      "#DD9ED3",
    ],
  },
  {
    // TODO: This is missing a color (#F3CBE3 is duplicated)
    key: "matplotlib-pastel2",
    name: "Pastel 2",
    colorStops: [
      "#F9B5B0",
      "#B4CDE2",
      "#CDEBC8",
      "#DECBE3",
      "#FDDAAB",
      "#E5D8C0",
      "#F3CBE3",
      "#CCD5E7",
      "#B5E2CE",
      "#F3CBE3",
      "#FCCEB0",
      "#F1E2CE",
    ],
  },
  {
    key: "iwanthue-pastel_3",
    name: "Pastel 3",
    colorStops: [
      "#9CD2B8",
      "#AAF1D9",
      "#89BAA9",
      "#7CD7D5",
      "#D3C998",
      "#99C2EC",
      "#D6EDB5",
      "#9EC991",
      "#C4B7EA",
      "#EAACCD",
      "#5ECDE9",
      "#E8B297",
    ],
  },
];

// Format the array so it can be read as a map
const keyedPaletteData: [string, PaletteData][] = rawPaletteData.map((value) => {
  const colors = value.colorStops.map((color) => new Color(color));
  return [value.key, { colors, ...value }];
});
const paletteMap: Map<string, PaletteData> = new Map(keyedPaletteData);

export const DEFAULT_CATEGORICAL_PALETTES = paletteMap;
export const DEFAULT_CATEGORICAL_PALETTE_ID = "matplotlib-paired";
