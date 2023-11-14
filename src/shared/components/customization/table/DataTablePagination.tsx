import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { Table } from '@tanstack/react-table';

import { Button } from '@/src/shared/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/shared/components/ui/select';
import useTrans from '@/src/shared/hooks/useTrans';

interface DataTablePaginationProps<TData> {
  business?: string;
  table: Table<TData>;
  onChangeFunc?: (value: number, type: 'Page_change' | 'Size_change') => void;
  isClientPagination: boolean;
}

export default function DataTablePagination<TData>({
  business,
  table,
  onChangeFunc,
  isClientPagination,
}: DataTablePaginationProps<TData>) {
  const { trans } = useTrans();
  if (isClientPagination) {
    return (
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    );
  }
  return (
    <div className='w-full mx-auto flex items-end justify-end px-2 ml-auto'>
      <div className='grid grid-cols-3 justify-center items-center space-x-6 lg:space-x-8'>
        <div className='col-span-2 md:col-span-1 flex items-center space-x-2'>
          <p className='w-full text-sm font-medium'>{trans.table.quantityPerPage}</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={value => {
              // table.setPageSize(Number(value));
              if (onChangeFunc) {
                onChangeFunc(Number(value), 'Size_change');
              }
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[15, 30, 45].map(pageSize => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {business === 'table-detail-tournament'
                    ? pageSize === 15
                      ? 5
                      : pageSize === 30
                      ? 10
                      : pageSize === 45
                      ? 15
                      : pageSize
                    : pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='hidden md:flex w-[150px] items-center justify-center text-sm font-medium'>
          {trans.table.page} {table.getState().pagination.pageIndex} {trans.table.of} {table.getPageCount() - 1}{' '}
          {trans.table.page}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => {
              if (onChangeFunc) {
                onChangeFunc(0, 'Page_change');
              }
              // table.setPageIndex(0)
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to first page</span>
            <ChevronsLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => {
              if (onChangeFunc) {
                onChangeFunc(table.getState().pagination.pageIndex - 1, 'Page_change');
              }
              // table.previousPage()
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => {
              if (onChangeFunc) {
                onChangeFunc(table.getState().pagination.pageIndex + 1, 'Page_change');
              }
              // table.nextPage()
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => {
              if (onChangeFunc) {
                onChangeFunc(table.getPageCount() - 1, 'Page_change');
              }
              // table.setPageIndex(table.getPageCount() - 1)
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to last page</span>
            <ChevronsRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
