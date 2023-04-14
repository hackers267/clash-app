import { catchError, from, of, Subject, switchMap } from "rxjs";
import { invoke } from "@tauri-apps/api";
import { atomWithObservable } from "jotai/utils";

const subject = new Subject();

const fetch = from(invoke("fetch_rules")).pipe(
  catchError((err) => {
    console.log("Error fetching rules :", err);
    return of([]);
  })
);

const ob$ = subject.pipe(
  switchMap(() => {
    return fetch;
  })
);

export const rulesAtom = atomWithObservable(() => ob$ as Subject<any>,{ initialValue: [] });
