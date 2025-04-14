import { CustomColors } from "common/enum/colors";

export type CustomButtonProps = {
  selected: boolean;
  color: keyof typeof CustomColors;
  unselectedColor: keyof typeof CustomColors;
  text?: string;
  pressHandle: () => void;
  Svg: () => JSX.Element;
};
