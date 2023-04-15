import classNames from "classnames";
import styles from "./index.module.css";

export interface InputProps {
  placeholder?: string;
  className?: string;
}

export function Input({ className, placeholder }: InputProps): JSX.Element {
  const containerClass = classNames(className, styles.input);
  return <input className={containerClass} placeholder={placeholder} />;
}
