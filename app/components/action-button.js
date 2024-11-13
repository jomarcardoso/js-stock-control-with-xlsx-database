import { useContext } from 'react';
import { SupplierSheetsContext } from '../providers/supplier-sheets.provider';

export function ActionButton({
  children,
  type = 'button',
  description = '',
  ...props
}) {
  const { values = [] } = useContext(SupplierSheetsContext);
  const classes = `py-2 px-3 text-end inline-block ${
    type === 'submit' || type === 'select' ? 'submit-button' : ''
  }`;

  if (type === 'select') {
    const optionsList = Array.isArray(values) ? values : [];
    const options = optionsList?.map((value) => (
      <option key={value}>{value}</option>
    ));

    return (
      <label className={`${classes} button relative`} htmlFor={props.id}>
        {children}
        <select
          className="appearance-none absolute inset-0 opacity-0"
          {...props}
        >
          <option value="">Selecione</option>
          {options}
        </select>
      </label>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      <span className="uppercase text-md font-bold">{children}</span>
      {description && (
        <>
          <br /> <span className="text-sm">{description}</span>
        </>
      )}
    </button>
  );
}
