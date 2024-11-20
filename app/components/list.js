import { useContext } from 'react';
import { SupplierSheetsContext } from '../providers/supplier-sheets.provider';

export function List() {
  const { values } = useContext(SupplierSheetsContext);

  return (
    <ul>
      {values.map((value, index) => (
        <li className="relative" key={index}>
          <input type="text" placeholder={value} defaultValue={value} />
        </li>
      ))}
    </ul>
  );
}
