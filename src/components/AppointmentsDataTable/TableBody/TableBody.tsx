import { Table, flexRender } from '@tanstack/react-table'

import { TableBody, TableCell, TableRow } from '@/components/ui/table'

interface TableBodyProps<TData> {
  table: Table<TData>
}

const TableBodyComponent = <TData,>({ table }: TableBodyProps<TData>) => {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={table.getAllColumns().length}
            className="h-24 text-center"
          >
            Sem resultados.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

export default TableBodyComponent
