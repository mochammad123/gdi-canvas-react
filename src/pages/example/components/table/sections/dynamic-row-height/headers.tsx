import { IHeader } from '@/components/ui/knitto-table';
import { Product } from '@/lib/variables/table-sample';

export const getBasicHeaders = (): IHeader<Product>[] => [
  { key: 'id', caption: 'ID', width: 80, freeze: 'left' },
  { key: 'name', caption: 'Product Name', width: 200, freeze: 'left' },
  { key: 'category', caption: 'Category', width: 150 },
  { key: 'price', caption: 'Price', width: 120 },
  {
    key: 'description',
    caption: 'Description',
    width: 350,
    renderCell: (item) => (
      <div className="py-2">
        <p className="whitespace-normal break-words text-sm">{item.description}</p>
      </div>
    ),
  },
  { key: 'stock', caption: 'Stock', width: 100 },
  { key: 'status', caption: 'Status', width: 120, freeze: 'right' },
];

export const getAdvancedHeaders = (): IHeader<Product>[] => [
  { key: 'id', caption: 'ID', width: 80, freeze: 'left' },
  { key: 'name', caption: 'Product Name', width: 200, freeze: 'left' },
  {
    key: 'description',
    caption: 'Description',
    width: 300,
    renderCell: (item) => (
      <div className="py-2">
        <p className="whitespace-normal break-words text-sm leading-relaxed">{item.description}</p>
      </div>
    ),
  },
  {
    key: 'features',
    caption: 'Features',
    width: 280,
    renderCell: (item) => (
      <div className="py-2">
        <ul className="list-disc list-inside space-y-1">
          {item.features.map((feature, idx) => (
            <li key={idx} className="text-xs">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  { key: 'category', caption: 'Category', width: 150 },
  { key: 'price', caption: 'Price', width: 120 },
  { key: 'stock', caption: 'Stock', width: 100 },
  { key: 'manufacturer', caption: 'Manufacturer', width: 180 },
  { key: 'status', caption: 'Status', width: 120, freeze: 'right' },
];
