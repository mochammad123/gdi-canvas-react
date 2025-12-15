export const CODE_EXAMPLE_BASIC_ROWSPAN = `import { KnittoTable, type IHeader } from '@knitto/virtual-table';
import { generateEmployeeData } from './lib/constants';

// Define employee data type
interface IEmployee {
  id: number;
  department: string;
  team: string;
  name: string;
  position: string;
  email: string;
  salary: number;
}

// Generate sample data (must be pre-sorted for rowspan)
const generateEmployeeData = (): IEmployee[] => {
  return generateEmployeeData(20);
};

const BasicRowspanExample = () => {
  const data = generateEmployeeData();

  // Define table headers with enableRowSpan
  const headers: IHeader<IEmployee>[] = [
    { 
      key: 'department', 
      caption: 'Department', 
      width: 150, 
      enableRowSpan: true  // Enable rowspan for duplicate values
    },
    { 
      key: 'team', 
      caption: 'Team', 
      width: 120, 
      enableRowSpan: true  // Enable rowspan for duplicate values
    },
    { key: 'name', caption: 'Name', width: 200 },
    { key: 'position', caption: 'Position', width: 180 },
    { key: 'email', caption: 'Email', width: 250 },
    { 
      key: 'salary', 
      caption: 'Salary', 
      width: 120, 
      renderCell: (item) => \`$\${item.salary.toLocaleString()}\`
    },
  ];

  return (
    <div className='h-80'>
      <KnittoTable 
        useRegularTable  // Required for rowspan functionality
        data={data} 
        headers={headers} 
        rowKey='id' 
      />
    </div>
  );
};`;

export const CODE_EXAMPLE_ADVANCED_ROWSPAN = `import { KnittoTable, type IHeader } from '@knitto/virtual-table';

// Define sales report data type
interface ISalesReport {
  id: number;
  region: string;
  country: string;
  salesRep: string;
  product: string;
  q1Sales: number;
  q2Sales: number;
  q3Sales: number;
  q4Sales: number;
  totalSales: number;
}

// Pre-sorted data for proper rowspan merging
const salesData: ISalesReport[] = [
  // North America region (rowSpan = 6)
  //   - USA country (rowSpan = 4)
  //     - John Doe salesRep (rowSpan = 2)
  { id: 1, region: 'North America', country: 'USA', salesRep: 'John Doe', product: 'Laptop', q1Sales: 25000, q2Sales: 30000, q3Sales: 28000, q4Sales: 32000, totalSales: 115000 },
  { id: 2, region: 'North America', country: 'USA', salesRep: 'John Doe', product: 'Desktop', q1Sales: 18000, q2Sales: 22000, q3Sales: 20000, q4Sales: 25000, totalSales: 85000 },
  //     - Jane Smith salesRep (rowSpan = 2)
  { id: 3, region: 'North America', country: 'USA', salesRep: 'Jane Smith', product: 'Laptop', q1Sales: 22000, q2Sales: 26000, q3Sales: 24000, q4Sales: 28000, totalSales: 100000 },
  { id: 4, region: 'North America', country: 'USA', salesRep: 'Jane Smith', product: 'Tablet', q1Sales: 12000, q2Sales: 15000, q3Sales: 14000, q4Sales: 16000, totalSales: 57000 },
  //   - Canada country (rowSpan = 2)
  //     - Mike Johnson salesRep (rowSpan = 2)
  { id: 5, region: 'North America', country: 'Canada', salesRep: 'Mike Johnson', product: 'Laptop', q1Sales: 15000, q2Sales: 18000, q3Sales: 16000, q4Sales: 20000, totalSales: 69000 },
  { id: 6, region: 'North America', country: 'Canada', salesRep: 'Mike Johnson', product: 'Desktop', q1Sales: 12000, q2Sales: 15000, q3Sales: 14000, q4Sales: 17000, totalSales: 58000 },
  // Europe region (rowSpan = 4)
  //   - UK country (rowSpan = 2)
  //     - Sarah Wilson salesRep (rowSpan = 2)
  { id: 7, region: 'Europe', country: 'UK', salesRep: 'Sarah Wilson', product: 'Laptop', q1Sales: 20000, q2Sales: 24000, q3Sales: 22000, q4Sales: 26000, totalSales: 92000 },
  { id: 8, region: 'Europe', country: 'UK', salesRep: 'Sarah Wilson', product: 'Desktop', q1Sales: 14000, q2Sales: 17000, q3Sales: 16000, q4Sales: 19000, totalSales: 66000 },
  //   - Germany country (rowSpan = 2)
  //     - Klaus Mueller salesRep (rowSpan = 2)
  { id: 9, region: 'Europe', country: 'Germany', salesRep: 'Klaus Mueller', product: 'Laptop', q1Sales: 23000, q2Sales: 27000, q3Sales: 25000, q4Sales: 29000, totalSales: 104000 },
  { id: 10, region: 'Europe', country: 'Germany', salesRep: 'Klaus Mueller', product: 'Tablet', q1Sales: 9000, q2Sales: 12000, q3Sales: 11000, q4Sales: 13000, totalSales: 45000 },
];

const AdvancedRowspanExample = () => {
  // Define headers with rowspan + colspan + freeze
  const headers: IHeader<ISalesReport>[] = [
    { 
      key: 'region', 
      caption: 'Region', 
      width: 150, 
      enableRowSpan: true,  // Enable rowspan
      freeze: 'left'        // Freeze column
    },
    { 
      key: 'country', 
      caption: 'Country', 
      width: 120, 
      enableRowSpan: true   // Enable rowspan
    },
    { 
      key: 'salesRep', 
      caption: 'Sales Rep', 
      width: 150, 
      enableRowSpan: true   // Enable rowspan
    },
    { key: 'product', caption: 'Product', width: 120 },
    {
      key: 'group-header-sales',
      caption: 'Quarterly Sales',
      children: [  // Colspan grouping
        { key: 'q1Sales', caption: 'Q1', width: 100, renderCell: (item) => \`$\${item.q1Sales.toLocaleString()}\` },
        { key: 'q2Sales', caption: 'Q2', width: 100, renderCell: (item) => \`$\${item.q2Sales.toLocaleString()}\` },
        { key: 'q3Sales', caption: 'Q3', width: 100, renderCell: (item) => \`$\${item.q3Sales.toLocaleString()}\` },
        { key: 'q4Sales', caption: 'Q4', width: 100, renderCell: (item) => \`$\${item.q4Sales.toLocaleString()}\` },
      ],
    },
    { 
      key: 'totalSales', 
      caption: 'Total Sales', 
      width: 120, 
      freeze: 'right',      // Freeze column
      renderCell: (item) => \`$\${item.totalSales.toLocaleString()}\`
    },
  ];

  return (
    <div className='h-80'>
      <KnittoTable 
        useRegularTable  // Required for rowspan functionality
        data={salesData} 
        headers={headers} 
        rowKey='id' 
      />
    </div>
  );
};`;

export const CODE_EXAMPLE_ONCLICK = `import { KnittoTable, type IHeader } from '@knitto/virtual-table';
import { generateBasicRowspanData } from './data-generator';
import { basicRowspanHeaders } from './table-headers';

const OnclickExample = () => {
  const data = generateBasicRowspanData();

  return (
    <div className="h-80">
      <KnittoTable
        rowKey="id"
        isLoading={false}
        headers={basicRowspanHeaders}
        data={data}
        useRegularTable
        onClickRow={(item, rowIndex, columnIndex, groupOfItems) => {
          console.log('=== CLICK ROW DEBUG ===');
          console.log('Item:', item);
          console.log('Row Index:', rowIndex);
          console.log('Column Index:', columnIndex);
          console.log('Group of Items:', groupOfItems);
          console.log('========================');
        }}
      />
    </div>
  );
};

export default OnclickExample;`;
