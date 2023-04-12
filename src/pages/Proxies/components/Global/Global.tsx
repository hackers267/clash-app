import styles from "./index.module.css";
import { Header } from "./Header";
import { Card } from "./Card";

export function Global(): JSX.Element {
  return (
    <div className="global">
      <Header />
      <div className={styles.cardContainer}>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
