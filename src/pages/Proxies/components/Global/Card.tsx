import styles from "./index.module.css";
import { useAtom } from "jotai";
import { choiceProxy } from "@/storage";
import classNames from "classnames";

export interface CardProps {
  name: string;
  type: string;
}

export function Card({ name, type }: CardProps): JSX.Element {
  const [active, setActive] = useAtom(choiceProxy);
  const containerClass = classNames(styles.card, {
    [styles.cardActive]: active === name,
  });
  return (
    <div
      className={containerClass}
      onClick={() => {
        setActive(name);
      }}
    >
      <div className={styles.cardName}>{name}</div>
      <div className={styles.cardCheck}>Check</div>
      <div className={styles.cardType}>
        <span>{type}</span>
        <span className={styles.cardLabel}>UDP</span>
      </div>
    </div>
  );
}
