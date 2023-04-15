import styles from "./index.module.css";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export function Header(): JSX.Element {
  const list = [
    { name: "global", url: "./global" },
    { name: "rule", url: "./rule" },
    { name: "direct", url: "./direct" },
    { name: "script", url: "./script" },
  ];
  return (
    <ul className={styles.header}>
      {list.map(({ name, url }) => (
        <li key={name}>
          <NavLink to={url}>
            <FormattedMessage
              id={`proxy.header.${name}`}
              defaultMessage="The link is {name}"
              values={{ name }}
            />
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
