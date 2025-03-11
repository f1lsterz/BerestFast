import React from "react";
import Svg, { Path } from "react-native-svg";

const UserIcon = ({ width = 30, height = 25, color = "white" }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 16 20" fill="none">
      <Path
        d="M12 5C12 7.20914 10.2091 9 8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 12C4.13401 12 1 15.134 1 19H15C15 15.134 11.866 12 8 12Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default UserIcon;
