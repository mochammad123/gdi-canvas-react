import { useUIContext } from './service/ui-context';
import TableVirtualHeaderItemDoubleRow from './table-virtual-header-item-double-row';
import TableVirtualHeaderItemSingleRow from './table-virtual-header-item-single-row';
import { ITableVirtualHeaderItem } from './types';

export default function TableVirtualHeaderItem(props: ITableVirtualHeaderItem) {
  const { headerModel } = useUIContext();

  if (headerModel === 'single-row') {
    return <TableVirtualHeaderItemSingleRow {...props} />;
  }

  return <TableVirtualHeaderItemDoubleRow {...props} />;
}
