import { type MouseEventHandler, type PropsWithChildren } from "react";
import styles from "./index.module.css";
import classNames from "classnames";

export type ButtonType =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "gray"
  | "default";

export interface ButtonProps {
  disabled?: boolean;
  type?: ButtonType;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  children,
  disabled = false,
  type = "default",
  className,
  onClick,
}: PropsWithChildren<ButtonProps>): JSX.Element {
  const typeClass = getTypeClass(type);
  const btnClass = classNames(
    styles.button,
    typeClass,
    {
      [styles.disabled]: disabled,
    },
    className
  );
  return (
    <button onClick={onClick} className={btnClass}>
      {children}
    </button>
  );

  function getTypeClass(type: ButtonType): Record<string, boolean> {
    return {
      [styles.success]: type === "success",
      [styles.warning]: type === "warning",
      [styles.danger]: type === "danger",
      [styles.info]: type === "info",
      [styles.gray]: type === "gray",
      [styles.default]: type === "default",
    };
  }
}
