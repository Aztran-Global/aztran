import { useState, type Dispatch, type SetStateAction } from "react";

/**
 * Local editable form state that resets to `toEmpty()` for a new record, or
 * populates from `existing` once an async-loaded doc arrives — without an
 * effect. Adjusts state during render (React's documented pattern for
 * deriving state from a changed id/query result) instead of after commit,
 * so there is no extra render pass and no `setState`-in-effect cascade.
 */
export function useHydratedFormState<TId, TDoc, TForm>(
  id: TId | undefined,
  existing: TDoc | null | undefined,
  toEmpty: () => TForm,
  fromDoc: (doc: TDoc) => TForm,
): [TForm, Dispatch<SetStateAction<TForm>>, boolean] {
  const [form, setForm] = useState<TForm>(toEmpty);
  const [hydrated, setHydrated] = useState(!id);
  const [prevId, setPrevId] = useState(id);
  const [prevExisting, setPrevExisting] = useState(existing);

  if (id !== prevId || existing !== prevExisting) {
    setPrevId(id);
    setPrevExisting(existing);
    if (!id) {
      setForm(toEmpty());
      setHydrated(true);
    } else if (existing) {
      setForm(fromDoc(existing));
      setHydrated(true);
    }
  }

  return [form, setForm, hydrated];
}
