import styles from "./index.module.css";
import { Pudding } from "@/components";
import { AiFillInfoCircle, MdSpeed } from "react-icons/all";

export function Header(): JSX.Element {
  return (
    <div className={styles.header}>
      <div className={styles.item}>
        <span>Global</span>
        <Pudding>S</Pudding>
        <span>美国07</span>
      </div>
      <div className={styles.item}>
        <span className={styles.icon}>
          <AiFillInfoCircle />
        </span>
        <span className={styles.icon}>
          <MdSpeed />
        </span>
      </div>
    </div>
  );
}
