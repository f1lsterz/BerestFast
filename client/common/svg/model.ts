import { CustomColors } from "common/enum/colors";
export type SvgProps = (
  | { height: number; width?: never }
  | { width: number; height?: never }
) & { color?: keyof typeof CustomColors };
