import React, { PropsWithChildren, ReactElement, useContext } from "react";
import { Button, ConfigProvider } from "antd";
import styled, { css } from "styled-components";

import { AppThemeContext } from "./AppStyle";

type IconButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  type?: "outlined" | "primary" | "link" | "text";
};

// Button styling varies based on the type (outlined vs. primary)
const StyledButton = styled(Button)<{ $type: IconButtonProps["type"] }>`
  height: var(--button-height-small);
  width: var(--button-height-small);
  min-width: var(--button-height-small);
  border-radius: 4px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => {
    switch (props.$type) {
      case "outlined":
        return css`
          border: 1px solid var(--color-button);
          background-color: transparent;
          color: var(--color-button);
          fill: var(--color-button);

          &:disabled {
            border: 1px solid var(--color-borders);
            background-color: var(--color-button-disabled);
            color: var(--color-text-disabled);
            fill: var(--color-text-disabled);
          }
        `;
      case "link":
        return css`
          border: 0;
          background-color: transparent;
          color: var(--color-button);
          fill: var(--color-button);

          &:disabled {
            border: 0;
            background-color: transparent;
            color: var(--color-text-disabled);
            fill: var(--color-text-disabled);
          }
        `;
      case "text":
        return css`
          border: 1px solid transparent;
          background-color: transparent;
          color: var(--color-text-hint);
          fill: var(--color-text-hint);
        `;
      case "primary":
      default:
        return css`
          fill: var(--color-text-button);

          &:disabled {
            fill: var(--color-text-disabled);
          }
        `;
    }
  }}

  &:not(:disabled):hover {
    border-color: var(--color-button-hover);
    color: var(--color-text-button);
    fill: var(--color-text-button);
  }

  &:not(:disabled):active {
    border-color: var(--color-button);
  }

  & span {
    display: flex;
    justify-content: center;
    vertical-align: middle;
    align-items: center;
  }

  & svg {
    --size: calc(var(--button-height-small) - 8px);
    width: var(--size);
    height: var(--size);
  }
`;

/**
 * Custom styled button intended to hold a single icon passed in as a child.
 * @params onClick: The callback fired when a click event occurs.
 *
 * @example
 * <IconButton onClick={myClickHandler}>
 *    <PauseOutlined /> // From Antd Icons
 * </IconButton>
 */
export default function IconButton(props: PropsWithChildren<IconButtonProps>): ReactElement {
  const themeContext = useContext(AppThemeContext);

  return (
    <ConfigProvider theme={{ components: { Button: { colorPrimaryActive: themeContext.color.button.hover } } }}>
      <StyledButton
        type="primary"
        $type={props.type || "primary"}
        disabled={props.disabled}
        onClick={props.onClick}
        style={props.style}
      >
        {props.children}
      </StyledButton>
    </ConfigProvider>
  );
}
