import { ReactNode } from "react";
import dayjs from "dayjs";

import "./table.css";

export type TColumn<T> = {
  label: string;
  accessor: string | ((arg0: T) => ReactNode);
  key?: string;
  date?: boolean;
};

export type TRow = {
  [key: string | number]: any;
  key?: string;
};

type TableProps<T extends TRow> = {
  columns: TColumn<T>[];
  data?: T[];
  title?: ReactNode;
};

function getCell<T extends TRow>(col: TColumn<T>, row: T) {
  if (typeof col.accessor === "function") return col.accessor(row);
  if (col.date) return dayjs(row[col.accessor]).format("MM/DD/YYYY HH:MM");

  return row[col.accessor];
}

export function Table<T extends TRow>({ columns, data, title }: TableProps<T>) {
  return (
    <table>
      <thead>
        {title && (
          <tr>
            <th colSpan={4}>
              <h3>{title}</h3>
            </th>
          </tr>
        )}
        <tr>
          {columns.map((col, index) => (
            <th key={col.key || index}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row, index) => (
          <tr key={row.key || index}>
            {columns.map((col, index) => {
              const key = row.key && col.key ? `${row.key}-${col.key}` : index;
              return <td key={key}>{getCell(col, row)}</td>;
            })}
          </tr>
        )) || (
          <tr>
            <td>No Data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
