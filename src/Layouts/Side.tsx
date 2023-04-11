import { NavLink } from "react-router-dom";
import { type PropsWithChildren } from "react";
import styles from "./index.module.css";
import { FormattedMessage } from "react-intl";

export function Side(props: PropsWithChildren): JSX.Element {
  const { children } = props;

  interface Item {
    label: string;
    to: string;
  }

  const routes: Item[] = [
    { to: "/", label: "General" },
    { to: "/proxies", label: "Proxies" },
    { to: "/profiles", label: "Profiles" },
    { to: "/logs", label: "Logs" },
    { to: "/connections", label: "Connections" },
    { to: "/settings", label: "Settings" },
    { to: "/feedback", label: "Feedback" },
  ];
  return (
    <div className={styles.container}>
      <ul className={styles.side}>
        {routes.map((route) => (
          <li key={route.to} className={styles.sideItem}>
            <NavLink to={route.to}>
              <FormattedMessage
                id={route.label}
                defaultMessage="The link is {label}"
                values={{ label: route.label }}
              />
            </NavLink>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}
