import styles from "./index.module.css";
import { type PropsWithChildren } from "react";
import classNames from "classnames";

const presetColor = ["red", "green", "blue"];
type PresetColor = (typeof presetColor)[number];

export interface PuddingProps {
  color?: PresetColor;
}

export function Pudding({
  children,
  color = "green",
}: PropsWithChildren<PuddingProps>): JSX.Element {
  const containerClass = classNames(styles.container, {
    [`${color}`]: isPresetColor(color),
  });
  return <span className={containerClass}>{children}</span>;
}

function isPresetColor(color: string): boolean {
  return presetColor.includes(color);
}
