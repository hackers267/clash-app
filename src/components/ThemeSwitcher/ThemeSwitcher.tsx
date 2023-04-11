import styles from "./index.module.css";

export function ThemeSwitcher(): JSX.Element {
  return (
    <ul className={styles.container}>
      <li
        onClick={() => {
          toggledTheme("light");
        }}
      >
        Light
      </li>
      <li
        onClick={() => {
          toggledTheme("dark");
        }}
      >
        Dark
      </li>
    </ul>
  );
}

function toggledTheme(theme: string): void {
  if (theme === "light") {
    document.body.className = "light";
  }
  if (theme === "dark") {
    document.body.className = "dark";
  }
}
