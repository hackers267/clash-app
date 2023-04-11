import styles from "./index.module.css";
import { useAtom } from "jotai";
import { langAtom } from "../../storage";
import { lang } from "../../locales";

export function LangSwitcher(): JSX.Element {
  const [, setLang] = useAtom(langAtom);
  return (
    <ul className={styles.container}>
      <li
        onClick={() => {
          setLang({ locals: "en", message: lang.en });
        }}
      >
        EN
      </li>
      <li
        onClick={() => {
          setLang({ locals: "zh-CN", message: lang.cn });
        }}
      >
        中文
      </li>
    </ul>
  );
}
