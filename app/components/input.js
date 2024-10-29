export function Input({ label = '', ...props }) {
  return (
    <div className="form-control">
      <label className="label" htmlFor={props.id}>
        {label}
      </label>
      <input className="input" type="text" {...props} />
    </div>
  );
}
