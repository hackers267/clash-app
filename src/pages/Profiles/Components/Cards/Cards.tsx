import { Card } from "../Card";
import styles from "./index.module.css";

export function Cards(): JSX.Element {
  const list: ProfileCard[] = [
    { active: true, name: "config.yaml", type: "local file" },
    { active: false, name: "cnfig.yaml", type: "local file" },
    { active: false, name: "cofig.yaml", type: "local file" },
    { active: false, name: "conig.yaml", type: "local file" },
  ];
  return (
    <div className={styles.container}>
      {list.map((file) => {
        return <Card {...file} key={file.name} />;
      })}
    </div>
  );
}
