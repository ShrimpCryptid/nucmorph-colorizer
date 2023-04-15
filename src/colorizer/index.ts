export type { IFrameLoader, IFeatureLoader } from "./loaders/ILoader";
import ImageFrameLoader from "./loaders/ImageFrameLoader";
import JsonFeatureLoader from "./loaders/JsonFeatureLoader";

import ColorRamp from "./ColorRamp";
import ColorizeCanvas from "./ColorizeCanvas";
import Dataset from "./Dataset";

export { ColorizeCanvas, Dataset, ColorRamp, ImageFrameLoader, JsonFeatureLoader };
