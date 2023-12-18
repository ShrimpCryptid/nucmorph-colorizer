import { Checkbox, Divider, Slider } from "antd";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { Color } from "three";

import { Dataset } from "../../colorizer";
import { DrawMode } from "../../colorizer/ColorizeCanvas";
import { FlexColumn, FlexRowAlignCenter } from "../../styles/utils";
import { DrawSettings } from "../CanvasWrapper";
import DrawModeDropdown from "../DrawModeDropdown";
import LabeledDropdown from "../LabeledDropdown";

const NO_BACKDROP = {
  key: "",
  label: "(None)",
};

type SettingsTabProps = {
  outOfRangeDrawSettings: DrawSettings;
  outlierDrawSettings: DrawSettings;
  showScaleBar: boolean;
  showTimestamp: boolean;
  dataset: Dataset | null;
  backdropOpacity: number;
  backdropSaturation: number;
  backdropName: string | null;
  objectOpacity: number;
  setOutOfRangeDrawSettings: (drawSettings: DrawSettings) => void;
  setOutlierDrawSettings: (drawSettings: DrawSettings) => void;
  setShowScaleBar: (show: boolean) => void;
  setShowTimestamp: (show: boolean) => void;
  setBackdropOpacity: (opacity: number) => void;
  setBackdropSaturation: (saturation: number) => void;
  setBackdropName: (name: string | null) => void;
  setObjectOpacity: (opacity: number) => void;
};

const SectionHeaderText = styled.h2`
  margin: 10px 0 0 0;
  padding: 0;
`;

export default function SettingsTab(props: SettingsTabProps): ReactElement {
  const backdropOptions =
    props.dataset?.getBackdropNames().map((value) => {
      return { key: value, label: value };
    }) ?? [];
  backdropOptions.unshift(NO_BACKDROP);

  return (
    <FlexColumn $gap={5}>
      <SectionHeaderText>Backdrop</SectionHeaderText>
      <LabeledDropdown
        // TODO: Add a None option? Or an option to clear?
        label={"Backdrop images"}
        selected={props.backdropName || NO_BACKDROP.key}
        items={backdropOptions}
        onChange={props.setBackdropName}
        disabled={backdropOptions.length === 1}
      />
      <FlexRowAlignCenter $gap={6}>
        <h3>Opacity</h3>
        <Slider
          style={{ maxWidth: "200px", width: "100%" }}
          min={0}
          max={100}
          value={props.backdropOpacity}
          onChange={props.setBackdropOpacity}
          tooltip={{ formatter: (value) => `${value}%` }}
        />
      </FlexRowAlignCenter>
      <FlexRowAlignCenter $gap={6}>
        <h3>Saturation</h3>
        <Slider
          style={{ maxWidth: "200px", width: "100%" }}
          min={0}
          max={100}
          value={props.backdropSaturation}
          onChange={props.setBackdropSaturation}
          tooltip={{ formatter: (value) => `${value}%` }}
        />
      </FlexRowAlignCenter>
      <Divider />
      <SectionHeaderText>Objects</SectionHeaderText>
      <DrawModeDropdown
        label="Filtered out values"
        selected={props.outOfRangeDrawSettings.mode}
        color={props.outOfRangeDrawSettings.color}
        onChange={(mode: DrawMode, color: Color) => {
          props.setOutOfRangeDrawSettings({ mode, color });
        }}
      />
      <DrawModeDropdown
        label="Outliers"
        selected={props.outlierDrawSettings.mode}
        color={props.outlierDrawSettings.color}
        onChange={(mode: DrawMode, color: Color) => {
          props.setOutlierDrawSettings({ mode, color });
        }}
      />{" "}
      <FlexRowAlignCenter $gap={6}>
        <h3>Opacity</h3>
        <Slider
          style={{ maxWidth: "200px", width: "100%" }}
          min={0}
          max={100}
          value={props.objectOpacity}
          onChange={props.setObjectOpacity}
        />
      </FlexRowAlignCenter>
      <Checkbox
        type="checkbox"
        checked={props.showScaleBar}
        onChange={() => {
          props.setShowScaleBar(!props.showScaleBar);
        }}
      >
        Show scale bar
      </Checkbox>
      <Checkbox
        type="checkbox"
        checked={props.showTimestamp}
        onChange={() => {
          props.setShowTimestamp(!props.showTimestamp);
        }}
      >
        Show timestamp
      </Checkbox>
    </FlexColumn>
  );
}
