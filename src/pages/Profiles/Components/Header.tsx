import { Button, Input } from "@/components";
import styles from "./index.module.css";

export function Header(): JSX.Element {
  return (
    <div className={styles.header}>
      <Input className={styles.input} placeholder="Download from a URL" />
      <div className={styles.buttonGroup}>
        <Button className={styles.btn} type="gray">
          Download
        </Button>
        <Button className={styles.btn} disabled>
          Update All
        </Button>
        <Button className={styles.btn} disabled>
          Import
        </Button>
      </div>
    </div>
  );
}
