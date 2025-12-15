export const CODE_EXAMPLE_BASIC = `import { KnittoTable } from '@/components/ui/knitto-table';

const headers = [
  { key: 'id', caption: 'ID', width: 80 },
  { key: 'name', caption: 'Product Name', width: 200 },
  { key: 'category', caption: 'Category', width: 150 },
  { key: 'price', caption: 'Price', width: 120 },
  { key: 'description', caption: 'Description', width: 300 },
  { key: 'status', caption: 'Status', width: 120 },
];

function MyTable() {
  return (
    <KnittoTable
      data={data}
      headers={headers}
      rowKey="id"
      enableColumnVirtualization={false} // Must be false for dynamic row height
      useDynamicRowHeight={true} // Enable dynamic row height
    />
  );
}`;

export const CODE_EXAMPLE_WITH_CUSTOM_CELL = `import { KnittoTable } from '@/components/ui/knitto-table';

const headers = [
  { key: 'id', caption: 'ID', width: 80 },
  { key: 'name', caption: 'Product Name', width: 200 },
  { 
    key: 'description', 
    caption: 'Description', 
    width: 300,
    renderCell: (item) => (
      <div className="py-2">
        <p className="whitespace-normal break-words">{item.description}</p>
      </div>
    )
  },
  {
    key: 'features',
    caption: 'Features',
    width: 250,
    renderCell: (item) => (
      <div className="py-2">
        <ul className="list-disc list-inside">
          {item.features.map((feature, idx) => (
            <li key={idx} className="text-sm">{feature}</li>
          ))}
        </ul>
      </div>
    )
  },
  { key: 'status', caption: 'Status', width: 120 },
];

function MyTable() {
  return (
    <KnittoTable
      data={data}
      headers={headers}
      rowKey="id"
      enableColumnVirtualization={false}
      useDynamicRowHeight={true}
    />
  );
}`;

export const CODE_EXAMPLE_WITH_FREEZE = `import { KnittoTable } from '@/components/ui/knitto-table';

const headers = [
  { key: 'id', caption: 'ID', width: 80, freeze: 'left' },
  { key: 'name', caption: 'Product Name', width: 200, freeze: 'left' },
  { 
    key: 'description', 
    caption: 'Description', 
    width: 300,
    renderCell: (item) => (
      <div className="py-2 whitespace-normal">{item.description}</div>
    )
  },
  { key: 'category', caption: 'Category', width: 150 },
  { key: 'price', caption: 'Price', width: 120 },
  { key: 'status', caption: 'Status', width: 120, freeze: 'right' },
];

function MyTable() {
  return (
    <KnittoTable
      data={data}
      headers={headers}
      rowKey="id"
      enableColumnVirtualization={false}
      useDynamicRowHeight={true}
    />
  );
}`;
