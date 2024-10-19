export function Input({ label = '', ...props }) {
  return (
    <div className="shadow p-4 rounded-lg border-2 bg-gray-100 has-[input:focus]:border-pink-500">
      <label
        className="block text-gray-700 text-lg mb-2 uppercase"
        htmlFor={props.id}
      >
        {label}
      </label>
      <input
        className=" caret-pink-700 appearance-none border-2 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
        type="text"
        {...props}
      />
    </div>
  );
}
