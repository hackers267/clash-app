import { NavLink } from "react-router-dom";
import { type PropsWithChildren } from "react";
import "./index.css";

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
    <div className="container">
      <ul className="side">
        {routes.map((route) => (
          <li key={route.to} className="side-item">
            <NavLink to={route.to}>{route.label}</NavLink>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}
