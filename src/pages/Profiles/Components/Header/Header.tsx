import { Button, Input } from "@/components";
import styles from "./index.module.css";
import { type ChangeEvent, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { FormattedMessage } from "react-intl";

// TODO: 添加国际化

export function Header(): JSX.Element {
  const [url, updateUrl] = useState<string>();
  return (
    <div className={styles.header}>
      <Input
        value={url}
        className={styles.input}
        onChange={onChange}
        placeholder="Download from a URL"
      />
      <div className={styles.buttonGroup}>
        <Button
          className={styles.btn}
          type="gray"
          onClick={() => {
            download();
          }}
        >
          <FormattedMessage
            id="profile.action.download"
            defaultMessage="profile action is {download}"
            values={{
              download: "download",
            }}
          />
        </Button>
        <Button className={styles.btn} disabled>
          <FormattedMessage
            id="profile.action.update"
            defaultMessage="Update"
            values={{ update: "update" }}
          />
        </Button>
        <Button className={styles.btn} disabled>
          <FormattedMessage
            id="profile.action.import"
            defaultMessage="Import"
            values={{ import: "import" }}
          />
        </Button>
      </div>
    </div>
  );

  function download(): void {
    invoke("down_profile", { url });
  }

  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    updateUrl(value);
  }
}
