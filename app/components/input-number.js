'use client';

import { useRef } from 'react';

export function InputNumber({ label = '', setValue, ...props }) {
  const inputRef = useRef();

  return (
    <div className="form-control">
      <label className="label" htmlFor={props.id}>
        {label}
      </label>
      <div className="flex gap-3">
        <button
          onClick={() => setValue((inputRef.current.valueAsNumber || 0) - 1)}
          className="button-control rounded-l-md"
        >
          -
        </button>
        <input
          onChange={console.log}
          ref={inputRef}
          className="input appearance-none text-center rounded-none"
          type="number"
          {...props}
        />
        <button
          onClick={() => setValue((inputRef.current.valueAsNumber || 0) + 1)}
          className="button-control rounded-r-md"
        >
          +
        </button>
      </div>
    </div>
  );
}
