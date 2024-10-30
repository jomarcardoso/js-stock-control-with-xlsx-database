'use client';

import { useContext } from 'react';
import { SupplierSheetsContext } from '../providers/supplier-sheets.provider';

export function Select({ label = '', ...props }) {
  const { values = [] } = useContext(SupplierSheetsContext);

  const optionsList = Array.isArray(values) ? values : [];

  const options = optionsList?.map((value) => <option>{value}</option>);

  return (
    <div className="form-control">
      <label className="label" htmlFor={props.id}>
        {label}
      </label>
      <select className="input" {...props}>
        {options}
      </select>
    </div>
  );
}
