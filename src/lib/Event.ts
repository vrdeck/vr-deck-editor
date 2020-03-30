import React from "react";

export interface ChangeEvent<T> {
  target: {
    value: T;
  };
}

export type OnChange<T> = (event: ChangeEvent<T>) => void;

export function useFormUpdate<O>(object: O, onChange: OnChange<O>) {
  function handleUpdate<T extends keyof O>(field: T) {
    return (event: ChangeEvent<O[T]>) => {
      const updated = { ...object, [field]: event.target.value };

      onChange({ target: { value: updated } });
    };
  }

  return React.useCallback(handleUpdate, [object, onChange]);
}
