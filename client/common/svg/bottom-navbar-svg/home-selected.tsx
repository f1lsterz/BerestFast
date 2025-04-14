import React from "react";
import { CustomColors } from "common/enum/colors";
import Svg, { Path } from "react-native-svg";
import { SvgProps } from "../model";

export const HomeSvg: React.FC<SvgProps> = ({ height, width, color }) => {
  const size = height ?? width ?? 24;
  const fillColor = color ? CustomColors[color] : "#333333";

  return (
    <Svg
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V9.5Z"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
