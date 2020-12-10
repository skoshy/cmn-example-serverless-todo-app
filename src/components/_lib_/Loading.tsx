import React from "react";
import { colors } from "src/styles";
import { classnames } from "src/lib";
import moduleCss from "./Loading.module.scss";

// modified from https://projects.lukehaas.me/css-loaders/
// this component will be an example of using the `.module.scss` pattern

interface Props {
  size?: string;
  borderSize?: string;
  colorFilled?: string;
  colorEmpty?: string;
}

export const Loading = ({
  size = "100px",
  borderSize = "2em",
  colorFilled = colors.brand,
  colorEmpty = colors.brandLight,
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderWidth: borderSize,
        borderColor: colorFilled,
        borderLeftColor: colorEmpty,
      }}
      className={classnames("loading-spinner", moduleCss.loader)}
    />
  );
};
