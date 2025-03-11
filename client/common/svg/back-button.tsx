import React from "react";
import { Svg, Path } from "react-native-svg";

const BackButton = ({ width = 20, height = 40, color = "white" }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 14 29" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.36893 14.3852L13.179 25.6394C13.7234 26.2639 13.7234 27.2764 13.179 27.9009C12.6347 28.5254 11.7521 28.5254 11.2078 27.9009L0.408261 15.5116C-0.136087 14.8871 -0.136087 13.8746 0.408261 13.2501C0.471019 13.1781 0.538274 13.1144 0.608987 13.059C0.653029 12.9885 0.702681 12.9211 0.757944 12.8577L11.5574 0.468361C12.1018 -0.156121 12.9843 -0.15612 13.5287 0.468361C14.073 1.09284 14.073 2.10533 13.5287 2.72981L3.36893 14.3852Z"
        fill={color}
      />
    </Svg>
  );
};

export default BackButton;
