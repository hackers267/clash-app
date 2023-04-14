import { atom } from "jotai";
import { atomWithObservable } from "jotai/utils";
import { lang } from "@/locales";
import { catchError, from, map, of } from "rxjs";
import { invoke } from "@tauri-apps/api";

export * from "./rule";

export const langAtom = atom({ message: lang.cn, locals: "zh-CN" });
export const choiceProxy = atom("");

const proxies$ = from(invoke<any[]>("proxies")).pipe(
  catchError((err) => {
    console.log(err);
    return of([] as any[]);
  }),
  map((array: any[]) => {
    array.sort((a, b) => (a.name > b.name ? 1 : -1));
    return array;
  })
);

export const proxiesAtom = atomWithObservable<any>(() => proxies$);
