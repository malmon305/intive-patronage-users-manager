import * as React from 'react';
import { TableHead, TableRow, TableCell, Checkbox } from '@mui/material';
import { Cell, EnhancedTableHeadCell, Order } from './EnhancedTableHeadCell';

export interface EnhancedTableHeadProps<T> {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: keyof T;
  rowCount: number;
  cells: readonly Cell<T>[];
}

export function EnhancedTableHead<T>(props: EnhancedTableHeadProps<T>) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, cells } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell>
        {cells.map((cell) => (
          <EnhancedTableHeadCell<T>
            cell={cell}
            orderBy={orderBy}
            order={order}
            onClick={(event) => onRequestSort(event, cell.id)}
          />
        ))}
      </TableRow>
    </TableHead>
  );
}
