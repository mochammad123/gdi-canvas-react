export const CODE_EXAMPLE_VIRTUALIZED = `import { KnittoTable } from '@knittotextile/react-ui';

const headers = [
  { key: 'id', caption: 'ID', width: 80, freeze: 'left' },
  { key: 'name', caption: 'Name', width: 180, freeze: 'left' },
  { key: 'email', caption: 'Email', width: 200 },
  { key: 'phone', caption: 'Phone', width: 150 },
  { key: 'company', caption: 'Company', width: 200 },
  { key: 'jobTitle', caption: 'Job Title', width: 180 },
  { key: 'department', caption: 'Department', width: 150 },
  { key: 'city', caption: 'City', width: 120 },
  { key: 'country', caption: 'Country', width: 120 },
  { key: 'joinDate', caption: 'Join Date', width: 120 },
  { key: 'experience', caption: 'Experience', width: 100 },
  { key: 'salary', caption: 'Salary', width: 120, freeze: 'right' },
  { key: 'status', caption: 'Status', width: 100, freeze: 'right' },
];

function MyTable() {
  return (
    <KnittoTable
      data={data}
      headers={headers}
      rowKey="id"
      enableColumnVirtualization={true} // Enable column virtualization (default)
    />
  );
}`;

export const CODE_EXAMPLE_NON_VIRTUALIZED = `import { KnittoTable } from '@knittotextile/react-ui';

const headers = [
  { key: 'id', caption: 'ID', width: 80, freeze: 'left' },
  { key: 'name', caption: 'Name', width: 180, freeze: 'left' },
  { key: 'email', caption: 'Email', width: 200 },
  { key: 'phone', caption: 'Phone', width: 150 },
  { key: 'company', caption: 'Company', width: 200 },
  { key: 'jobTitle', caption: 'Job Title', width: 180 },
  { key: 'department', caption: 'Department', width: 150 },
  { key: 'city', caption: 'City', width: 120 },
  { key: 'country', caption: 'Country', width: 120 },
  { key: 'joinDate', caption: 'Join Date', width: 120 },
  { key: 'experience', caption: 'Experience', width: 100 },
  { key: 'salary', caption: 'Salary', width: 120, freeze: 'right' },
  { key: 'status', caption: 'Status', width: 100, freeze: 'right' },
];

function MyTable() {
  return (
    <KnittoTable
      data={data}
      headers={headers}
      rowKey="id"
      enableColumnVirtualization={false} // Disable column virtualization
    />
  );
}`;

export const CODE_EXAMPLE_COMBINED = `import { KnittoTable } from '@knittotextile/react-ui';

// Example with both modes side by side
function ComparisonTable() {
  return (
    <div className="space-y-8">
      {/* Virtualized Columns */}
      <div>
        <h3>With Column Virtualization</h3>
        <KnittoTable
          data={data}
          headers={headers}
          rowKey="id"
          enableColumnVirtualization={true}
        />
      </div>
      
      {/* Non-Virtualized Columns */}
      <div>
        <h3>Without Column Virtualization</h3>
        <KnittoTable
          data={data}
          headers={headers}
          rowKey="id"
          enableColumnVirtualization={false}
        />
      </div>
    </div>
  );
}`;
