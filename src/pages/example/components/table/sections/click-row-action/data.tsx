import { IHeader } from '@/components/ui/knitto-table';
import { generateProductData, Product } from '@/lib/variables/table-sample';

export type ContextMenuPosition = {
  x: number;
  y: number;
};

export const getProductHeaders = (): IHeader<Product>[] => [
  { key: 'name', caption: 'Product Name', width: 200 },
  { key: 'category', caption: 'Category', width: 150 },
  { key: 'price', caption: 'Price', width: 100 },
  { key: 'stock', caption: 'Stock', width: 80 },
  {
    key: 'status',
    caption: 'Status',
    width: 170,
    renderCell: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'In Stock' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : item.status === 'Limited' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' : item.status === 'Pre-order' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}
      >
        {item.status}
      </span>
    ),
  },
  { key: 'lastUpdated', caption: 'Last Updated', width: 120 },
];

export const generateSampleData = (): Product[] => {
  return generateProductData(20);
};

export const CODE_EXAMPLE = `import { KnittoTable, type IHeader } from '@knitto/knitto-table';
import { generateProductData, Product } from '@/lib/variables/table-sample';

const ProductTable = () => {
  const [data] = useState<Product[]>(generateProductData(20));

  // Click handlers
  const handleClickRow = (item: Product, rowIndex: number, columnIndex: number) => {
    console.log('Row clicked:', item);
    console.log('Position:', rowIndex, columnIndex);
    // Handle single click - e.g., select row, show details
  };

  const handleDoubleClickRow = (item: Product, rowIndex: number, columnIndex: number) => {
    console.log('Row double-clicked:', item);
    // Handle double click - e.g., open edit modal, navigate to detail page
    openEditModal(item);
  };

  const handleRightClickRow = (item: Product, position: { x: number; y: number }) => {
    console.log('Row right-clicked:', item);
    console.log('Mouse position:', position);
    // Handle right click - e.g., show context menu
    showContextMenu(item, position);
  };

  const headers: IHeader<Product>[] = [
    { key: 'name', caption: 'Product Name', width: 200 },
    { key: 'category', caption: 'Category', width: 150 },
    { key: 'price', caption: 'Price', width: 100 },
    { key: 'stock', caption: 'Stock', width: 80 },
    { key: 'status', caption: 'Status', width: 120 },
  ];

  return (
    <KnittoTable
      headers={headers}
      data={data}
      rowKey="id"
      headerMode="double"
      rowHeight={32}
      headerHeight={40}
      filterHeight={32}
      onClickRow={handleClickRow}
      onDoubleClickRow={handleDoubleClickRow}
      onRightClickRow={handleRightClickRow}
    />
  );
};`;
