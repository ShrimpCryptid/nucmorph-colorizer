import styled, { css } from "styled-components";

/**
 * Blocks `input` elements inside this container from having visible spinner handles.
 */
export const NoSpinnerContainer = styled.div`
  /* Chrome, Safari, Edge, Opera */
  & input::-webkit-outer-spin-button,
  & input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  & input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;

const FlexDiv = styled.div<{ $gap?: number }>`
  display: flex;
  ${(props) => {
    // Gap between items is parameterized
    if (props.$gap) {
      return css`
        gap: ${props.$gap}px;
      `;
    }
    return;
  }}
`;

/**
 * A flexbox container that lays out children in a column.
 * @param $gap: The gap, in pixels, between each child element. 0 by default.
 */
export const FlexColumn = styled(FlexDiv)`
  flex-direction: column;
`;

/**
 * A flexbox container that lays out children in a row.
 * @param $gap: The gap, in pixels, between each child element. 0 by default.
 */
export const FlexRow = styled(FlexDiv)`
  flex-direction: row;
`;

/**
 * A flexbox container that lays out children in a row, and aligns all items
 * to the vertical center.
 * @param $gap: The gap, in pixels, between each child element. 0 by default.
 */
export const FlexRowAlignCenter = styled(FlexRow)`
  align-items: center;
`;
