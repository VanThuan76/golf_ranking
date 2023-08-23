import { useState } from 'react';
import { Column } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpIcon, SearchIcon } from 'lucide-react';
import classNames from 'classnames';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/tailwindPlugin';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  defaultFilter?: any;
  defaultSort?: any;
}

const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
  defaultFilter,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  const [searchValue, setSearchValue] = useState<string>(defaultFilter);
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  const itemClassName = 'p-2 rounded-md flex gap-4 items-center hover:bg-foreground/5 cursor-pointer';
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className={classNames('w-full h-8 data-[state=open]:bg-accent', {
              'bg-accent': !!defaultFilter,
            })}
          >
            <span>{title}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align='start' className='px-1 py-0'>
          <div onClick={() => column.toggleSorting(false)} className={itemClassName}>
            <ArrowUpIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Asc
          </div>
          <div onClick={() => column.toggleSorting(true)} className={itemClassName}>
            <ArrowDownIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Desc
          </div>
          <div className={itemClassName}>
            <Input
              value={searchValue}
              onChange={v => {
                setSearchValue(v.target.value);
              }}
            />
            <Button
              onClick={() => {
                const metaCol = column?.columnDef.meta as any;
                if (metaCol.searchFn) {
                  metaCol.searchFn(searchValue);
                }
              }}
            >
              <SearchIcon />
            </Button>
            <Button
              variant={'destructive'}
              onClick={() => {
                setSearchValue('');
                const metaCol = column?.columnDef.meta as any;
                if (metaCol.searchFn) {
                  metaCol.searchFn(undefined);
                }
              }}
            >
              X
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DataTableColumnHeader;
