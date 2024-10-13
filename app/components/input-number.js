'use client';

import { useRef } from 'react';

export function InputNumber({ label = '', setValue, ...props }) {
  const inputRef = useRef();

  return (
    <div className="text-center shadow p-4 rounded-lg border-2 bg-gray-100 has-[input:focus]:border-pink-500 ">
      <label
        className="block text-gray-700 text-lg mb-2 uppercase"
        htmlFor={props.id}
      >
        {label}
      </label>
      <div className="flex gap-3">
        <button
          onClick={() => setValue((inputRef.current.valueAsNumber || 0) - 1)}
          className="caret-pink-700 appearance-none rounded-l-md border-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 bg-white w-12 font-bold"
        >
          -
        </button>
        <input
          onChange={console.log}
          ref={inputRef}
          className=" caret-pink-700 appearance-none border-2 flex-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 text-center"
          type="number"
          {...props}
        />
        <button
          onClick={() => setValue((inputRef.current.valueAsNumber || 0) + 1)}
          className="caret-pink-700 appearance-none border-2 rounded-r-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500 bg-white w-12 font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
}
