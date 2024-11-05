export function Input({ label = '', setValue, ...props }) {
  return (
    <div className="form-control">
      <label className="label" htmlFor={props.id}>
        {label}
      </label>
      <input
        className="input"
        type="text"
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </div>
  );
}
