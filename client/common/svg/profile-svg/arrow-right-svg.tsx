import React from "react";
import Svg, { Path } from "react-native-svg";
import { CustomColors } from "common/enum/colors";
import { SvgProps } from "../model";

const ArrowRightSvg: React.FC<SvgProps> = ({
  width,
  height,
  color = "Gray",
}) => {
  const fillColor = color ? CustomColors[color] : "#ADB3BC";
  const resolvedWidth = width ?? (height ? (height * 8) / 14 : 8);
  const resolvedHeight = height ?? (width ? (width * 14) / 8 : 14);

  return (
    <Svg
      width={resolvedWidth}
      height={resolvedHeight}
      viewBox="0 0 8 14"
      fill="none"
    >
      <Path
        d="M5.70048 7.00305L0.288644 1.66583C0.104851 1.48434 0.0107398 1.25623 0.00631106 0.981482C0.00210374 0.706955 0.0962149 0.474688 0.288644 0.284682C0.481295 0.0948941 0.714691 0 0.988831 0C1.26297 0 1.49637 0.0948941 1.68902 0.284682L7.6602 6.1739C7.78443 6.29664 7.87212 6.42604 7.92327 6.5621C7.97442 6.69816 8 6.84514 8 7.00305C8 7.16095 7.97442 7.30793 7.92327 7.44399C7.87212 7.58005 7.78443 7.70946 7.6602 7.83219L1.68902 13.7214C1.505 13.9027 1.27371 13.9955 0.995142 13.9999C0.716794 14.004 0.481295 13.9112 0.288644 13.7214C0.0962149 13.5314 0 13.3012 0 13.0308C0 12.7605 0.0962149 12.5303 0.288644 12.3403L5.70048 7.00305Z"
        fill={fillColor}
      />
    </Svg>
  );
};

export default ArrowRightSvg;
