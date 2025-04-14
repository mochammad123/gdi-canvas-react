import { memo } from 'react';
import clsx from 'clsx';
import { useHeaderContext } from '../service/header-context';
import TableVirtualCheckbox from './table-virtual-checkbox';
import { VIBILITY_COLUMNS_CARD_HEIGHT } from '../constants';

const TableVirtualVisibilityColumnsCard = () => {
  const { visibilityColumnsCardOptions, visibleColumns, onChangeVisibilityColumns } = useHeaderContext();

  const visibleColumnsFiltered = visibleColumns.filter((name) => !['Checkbox Selection', 'Action'].includes(name));

  const handleClickColumnVisibility = (name: string) => {
    if (visibleColumnsFiltered.length === 1 && visibleColumnsFiltered[0] === name) return;
    onChangeVisibilityColumns?.(name);
  };

  return (
    <div
      className={clsx('bg-white shadow-md shadow-gray-300 border border-gray-200 rounded-md mt-2.5 overflow-auto w-full')}
      style={{ maxHeight: VIBILITY_COLUMNS_CARD_HEIGHT }}
    >
      <div className="flex flex-col max-h-[40vh] overflow-auto">
        {visibilityColumnsCardOptions?.map((name) => {
          return (
            <div
              key={'visibility-columns-card-item-' + name}
              className={clsx(
                'dropdown-item flex items-center gap-2 px-3 py-2 cursor-pointer',
                'hover:!bg-blue-950/50 hover:!text-white',
                visibleColumns.includes(name) && '!bg-blue-950 !text-white'
              )}
              onClick={() => handleClickColumnVisibility(name)}
            >
              <TableVirtualCheckbox readOnly checked={visibleColumns.includes(name)} />
              <p className="text-sm">{name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(TableVirtualVisibilityColumnsCard);
