import * as React from 'react';
import { Box, TableCell, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

export type CellId<T> = keyof T | 'action';

export type Order = 'asc' | 'desc';

export interface Cell<T> {
  disablePadding: boolean;
  sortable: boolean;
  id: CellId<T>;
  label: string;
  numeric: boolean;
  width?: string | number | undefined;
}

export function EnhancedTableHeadCell<T>(props: TableHeadCellProperties<T>) {
  const { cell, orderBy, order, onClick } = props;

  return (
    <TableCell
      width={cell.width}
      align={cell.numeric ? 'right' : 'left'}
      padding={cell.disablePadding ? 'none' : 'normal'}
      sortDirection={orderBy === cell.id ? order : false}
    >
      {cell.sortable ? (
        <TableSortLabel active={orderBy === cell.id} direction={orderBy === cell.id ? order : 'asc'} onClick={onClick}>
          {cell.label}
          {orderBy === cell.id ? (
            <Box component="span" sx={visuallyHidden}>
              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </Box>
          ) : null}
        </TableSortLabel>
      ) : (
        cell.label
      )}
    </TableCell>
  );
}

interface TableHeadCellProperties<T> {
  cell: Cell<T>;
  orderBy: CellId<T>;
  order: Order;
  onClick: (event: React.MouseEvent<unknown>) => void;
}
