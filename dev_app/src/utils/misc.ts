import type { RefObject } from "react";

// eslint-disable-next-line import/prefer-default-export
export function trySetRefAttr<RefType>(
  ref: RefObject<RefType>,
  changes: Partial<RefType>
) {
  if (!ref.current) return;
  Object.assign(ref.current, changes);
}
