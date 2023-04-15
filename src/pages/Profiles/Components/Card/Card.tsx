import styles from "./index.module.css";
import classNames from "classnames";
import { AiOutlineEdit, AiOutlineSync } from "react-icons/all";

export function Card({ name, type, active }: ProfileCard): JSX.Element {
  const cardClass = classNames(styles.card, {
    [styles.active]: active,
  });
  return (
    <div className={cardClass}>
      <div className={styles.name}>{name}</div>
      <div className={styles.status}>
        {active ? <AiOutlineSync /> : <AiOutlineEdit />}
      </div>
      <div className={styles.type}>{type}</div>
    </div>
  );
}
