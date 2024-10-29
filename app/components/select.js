export function Select({ label = '', ...props }) {
  return (
    <div className="form-control">
      <label className="label" htmlFor={props.id}>
        {label}
      </label>
      <select className="input" {...props}>
        <option></option>
        <option>Móveis Primavera</option>
        <option>Móveis Sul</option>
        <option>Móveis Henn</option>
      </select>
    </div>
  );
}
