import clsx from 'clsx';
import * as React from 'react';
import { Typography } from '../typhography';
import SortIcon from '../icon/sort';
import InputDebounce from '../inputs/input-debounce';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <table ref={ref} className={clsx('w-full caption-bottom text-sm overflow-auto border-[1.7px] border-black-20', className)} {...props} />
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <thead ref={ref} className={clsx('bg-greyish-semi-dark-50 text-left', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={clsx('[&_tr:last-child]:border-0', className)} {...props} />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={clsx('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} {...props} />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement> & {}>(({ className, ...props }, ref) => {
  return <tr ref={ref} className={clsx('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)} {...props} />;
});
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    activeSort?: boolean;
    withSort?: boolean;
    onClickSort?: (sort: TIconSort['sort']) => void;
  }
>(({ activeSort, className, children, withSort = false, onClickSort, ...props }, ref) => {
  const [sort, setSort] = React.useState<TIconSort['sort']>('unset');

  const getUpdateSort = (sort: TIconSort['sort']) => {
    if (sort === 'asc') return 'desc';
    if (sort === 'desc') return 'unset';
    if (sort === 'unset') return 'asc';
    return 'unset';
  };

  React.useEffect(() => {
    if (activeSort) return;
    setSort('unset');
  }, [activeSort]);
  return (
    <th ref={ref} className={clsx('px-1 align-middle global-report-title py-[.375rem] border-black-20 border-[1.7px] ', className)} {...props}>
      {withSort ? (
        <div
          className="flex justify-between items-center th-sort "
          onClick={() => {
            if (!onClickSort) return;
            onClickSort(getUpdateSort(sort));
            setSort((prev) => getUpdateSort(prev));
          }}
        >
          <Typography as="global-report-title">{children}</Typography>
          <div className="shrink-0 ">
            <SortIcon sort={sort} />
          </div>
        </div>
      ) : (
        children
      )}
    </th>
  );
});
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    editable?: boolean;
    onUpdateContent?: (value: string) => void;
    editableOptions?: { type: 'number' | 'text' };
    onFocusEdit?: (e: React.MouseEvent<HTMLTableCellElement>) => void;
  }
>(({ editable, editableOptions, children, className, onUpdateContent, onFocusEdit, ...props }, ref) => {
  const [clicked, setClicked] = React.useState<boolean>(false);
  const tdRef = React.useRef<HTMLTableCellElement | null>(null);
  const [textContent, setTextContent] = React.useState('');

  const onDblClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    const node = tdRef.current;
    if (!editable || !node) return;
    onFocusEdit?.(e);
    setTextContent(node.textContent || '');
    setClicked((c) => !c);
  };
  const adjusHeightInput = (inputEl: HTMLInputElement) => {
    const tdHeight = tdRef.current?.clientHeight || 29;
    inputEl.style.height = tdHeight - 2 + 'px';
  };

  React.useEffect(() => {
    if (!clicked || !tdRef.current) return;
    const inputEl = tdRef?.current?.querySelector('input');
    if (!inputEl) return;
    inputEl?.focus();
    inputEl?.select();

    adjusHeightInput(inputEl);
  }, [clicked]);

  return (
    <td
      ref={(node) => {
        tdRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      className={clsx('global-report-content break-words align-middle border-black-20 border-[1.7px]', className, {
        relative: clicked,
        'py-2 px-[.125rem]': !clicked,
      })}
      {...props}
      onClick={onDblClick}
    >
      {clicked && onUpdateContent ? (
        <InputDebounce
          onClick={(e) => e.stopPropagation()}
          type="text"
          onChangeValue={() => ''}
          onChange={(e) => {
            if (editableOptions?.type === 'number') {
              if (isNaN(+e.target.value)) return;
            }
            setTextContent(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault();
            }
          }}
          onKeyUp={(e) => {
            if (!onUpdateContent || e.key !== 'Enter') return;
            setClicked(false);
            onUpdateContent?.(e.currentTarget.value);
          }}
          onBlur={(e) => {
            setClicked(false);
            onUpdateContent?.(e.currentTarget.value);
          }}
          value={textContent || ''}
          classNameInput="!bg-white !px-[.125rem] global-report-content !absolute left-0 right-0 top-0 rounded-none  border-none"
        />
      ) : (
        children
      )}
    </td>
  );
});
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(({ className, ...props }, ref) => (
  <caption ref={ref} className={clsx('mt-4 text-sm text-muted-foreground', className)} {...props} />
));
TableCaption.displayName = 'TableCaption';

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
