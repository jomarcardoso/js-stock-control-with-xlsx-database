'use client';

import { useRef } from 'react';

export function InputNumber({ label = '', setValue, ...props }) {
  const inputRef = useRef();
  /** @type {HTMLInputElement} */
  const input = inputRef?.current;
  const value = Number(input?.value ?? 0);

  console.log(input?.value);

  return (
    <div className="form-control">
      <label className="label" htmlFor={props.id}>
        {label}
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setValue(value - 1)}
          className="button-control"
        >
          -
        </button>
        <input
          onChange={(e) => setValue(e.target.value)}
          ref={inputRef}
          className="input appearance-none text-center"
          type="number"
          {...props}
        />
        <button
          type="button"
          onClick={() => setValue(value + 1)}
          className="button-control"
        >
          +
        </button>
      </div>
    </div>
  );
}
