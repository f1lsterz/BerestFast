import React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgProps } from "../model";
import { CustomColors } from "common/enum/colors";

export const ProfileIcon: React.FC<SvgProps> = ({ height, width, color }) => {
  const size = height ?? width ?? 24;
  const strokeColor = color ? CustomColors[color] : "#333333";

  return (
    <Svg
      width={width ?? size}
      height={height ?? size}
      viewBox="0 0 16 18"
      fill="none"
    >
      <Path
        d="M14.2998 17C14.2998 13.2793 11.3897 10.2632 7.7998 10.2632C4.20995 10.2632 1.2998 13.2793 1.2998 17M7.7998 9.42105C10.0435 9.42105 11.8623 7.53594 11.8623 5.21053C11.8623 2.88512 10.0435 1 7.7998 1C5.55615 1 3.7373 2.88512 3.7373 5.21053C3.7373 7.53594 5.55615 9.42105 7.7998 9.42105Z"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};
