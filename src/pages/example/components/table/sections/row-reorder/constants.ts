// Mode 1: Drag dari seluruh row (reorderOnlyFromToggle=false, tidak perlu kolom row-reorder)
export const CODE_EXAMPLE_REGULAR_WHOLE_ROW = `import { useCallback, useState } from 'react';
import { KnittoTable, type IHeader } from '@knittotextile/react-ui';
import { generateUserData, User } from '@/lib/variables/table-sample';

const headers: IHeader<User>[] = [
  { key: 'id', caption: 'ID', width: 80 },
  { key: 'name', caption: 'Name', width: 200 },
  { key: 'email', caption: 'Email', width: 250 },
];

const RegularTableReorderWholeRow = () => {
  const [data, setData] = useState<User[]>(() => generateUserData(20));

  const handleReorderRows = useCallback((fromIndex: number, toIndex: number) => {
    setData((prev) => {
      const next = [...prev];
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      return next;
    });
  }, []);

  return (
    <KnittoTable
      data={data}
      headers={headers}
      rowKey="id"
      onReorderRows={handleReorderRows}
      reorderOnlyFromToggle={false}
      useRegularTable
    />
  );
};`;

// Mode 2: Drag hanya dari kolom handle (reorderOnlyFromToggle=true, wajib ada kolom row-reorder)
export const CODE_EXAMPLE_REGULAR_FROM_TOGGLE = `import { useCallback, useState } from 'react';
import { KnittoTable, type IHeader } from '@knittotextile/react-ui';
import { generateUserData, User } from '@/lib/variables/table-sample';

const headers: IHeader<User>[] = [
  { key: 'row-reorder', caption: '', width: 40, {
    key: 'row-reorder' as const,
    caption: '',
    width: 40,
    hideFilter: { sort: true, search: true, filterSelection: true, filterAdvance: true },
    hideHeaderAction: true,
    disableResizeColumn: true,
  }, },
  { key: 'id', caption: 'ID', width: 80 },
  { key: 'name', caption: 'Name', width: 200 },
  { key: 'email', caption: 'Email', width: 250 },
];

const RegularTableReorderFromToggle = () => {
  const [data, setData] = useState<User[]>(() => generateUserData(20));

  const handleReorderRows = useCallback((fromIndex: number, toIndex: number) => {
    setData((prev) => {
      const next = [...prev];
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      return next;
    });
  }, []);

  return (
    <KnittoTable
      data={data}
      headers={headers}
      rowKey="id"
      onReorderRows={handleReorderRows}
      reorderOnlyFromToggle={true}
      useRegularTable
    />
  );
};`;

export const CODE_EXAMPLE_REGULAR_TABLE = `${CODE_EXAMPLE_REGULAR_WHOLE_ROW}\n\n${CODE_EXAMPLE_REGULAR_FROM_TOGGLE}`;

// Mode 1: Drag dari seluruh row
export const CODE_EXAMPLE_VIRTUAL_WHOLE_ROW = `import { useCallback, useState } from 'react';
import { KnittoTable, type IHeader } from '@knittotextile/react-ui';
import { generateUserData, User } from '@/lib/variables/table-sample';

const headers: IHeader<User>[] = [
  { key: 'id', caption: 'ID', width: 80 },
  { key: 'name', caption: 'Name', width: 200 },
  { key: 'email', caption: 'Email', width: 250 },
];

const VirtualTableReorderWholeRow = () => {
  const [data, setData] = useState<User[]>(() => generateUserData(50));

  const handleReorderRows = useCallback((fromIndex: number, toIndex: number) => {
    setData((prev) => {
      const next = [...prev];
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      return next;
    });
  }, []);

  return (
    <KnittoTable
      data={data}
      headers={headers}
      rowKey="id"
      onReorderRows={handleReorderRows}
      reorderOnlyFromToggle={false}
    />
  );
};`;

// Mode 2: Drag hanya dari kolom handle
export const CODE_EXAMPLE_VIRTUAL_FROM_TOGGLE = `import { useCallback, useState } from 'react';
import { KnittoTable, type IHeader } from '@knittotextile/react-ui';
import { generateUserData, User } from '@/lib/variables/table-sample';

const headers: IHeader<User>[] = [
  { key: 'row-reorder', caption: '', width: 40, {
    key: 'row-reorder' as const,
    caption: '',
    width: 40,
    hideFilter: { sort: true, search: true, filterSelection: true, filterAdvance: true },
    hideHeaderAction: true,
    disableResizeColumn: true,
  }, },
  { key: 'id', caption: 'ID', width: 80 },
  { key: 'name', caption: 'Name', width: 200 },
  { key: 'email', caption: 'Email', width: 250 },
];

const VirtualTableReorderFromToggle = () => {
  const [data, setData] = useState<User[]>(() => generateUserData(50));

  const handleReorderRows = useCallback((fromIndex: number, toIndex: number) => {
    setData((prev) => {
      const next = [...prev];
      [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
      return next;
    });
  }, []);

  return (
    <KnittoTable
      data={data}
      headers={headers}
      rowKey="id"
      onReorderRows={handleReorderRows}
      reorderOnlyFromToggle={true}
    />
  );
};`;

export const CODE_EXAMPLE_VIRTUAL_TABLE = `${CODE_EXAMPLE_VIRTUAL_WHOLE_ROW}\n\n${CODE_EXAMPLE_VIRTUAL_FROM_TOGGLE}`;
