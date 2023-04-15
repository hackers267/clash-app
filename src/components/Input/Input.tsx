import classNames from "classnames";
import styles from "./index.module.css";
import { type ChangeEvent } from "react";

export interface InputProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  value,
  className,
  placeholder,
  onChange,
}: InputProps): JSX.Element {
  const containerClass = classNames(className, styles.input);
  return (
    <input
      value={value}
      onChange={onChange}
      className={containerClass}
      placeholder={placeholder}
    />
  );
}
