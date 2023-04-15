import { Cards, Header } from "./Components";
import styles from "./index.module.css";

export function Profiles(): JSX.Element {
  return (
    <div className={styles.container}>
      <Header />
      <Cards />
    </div>
  );
}
