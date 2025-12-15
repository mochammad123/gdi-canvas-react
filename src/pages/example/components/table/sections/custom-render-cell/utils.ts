import { Employee, generateEmployeeData } from '@/lib/variables/table-sample';
export const sampleData: Employee[] = generateEmployeeData(15);

export const CODE_EXAMPLE = `// Custom Cell Rendering Examples

// 1. Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' };
      case 'inactive':
        return { bg: 'bg-red-100', text: 'text-red-800', label: 'Inactive' };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Unknown' };
    }
  };

  const config = getStatusConfig(status);
  return (
    <span className={\`px-2 py-1 rounded-full text-xs font-medium \${config.bg} \${config.text}\`}>
      {config.label}
    </span>
  );
};

// 2. Progress Bar Component
const ProgressBar = ({ value }: { value: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className={\`h-2 rounded-full transition-all duration-300 \${
        value < 70 ? 'bg-red-500' : value < 85 ? 'bg-yellow-500' : 'bg-green-500'
      }\`}
      style={{ width: \`\${value}%\` }}
    />
    <span className="text-xs text-gray-600 mt-1 block">{value}%</span>
  </div>
);

// 3. Avatar with Initials
const AvatarCell = ({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600
        rounded-full flex items-center justify-center text-white text-sm font-medium">
        {initials}
      </div>
      <span className="font-medium">{name}</span>
    </div>
  );
};

// 4. Header Configuration with Custom Render
const headers: IHeader<Employee>[] = [
    { key: 'row-selection', caption: '', width: 50 },
    {
      key: 'name',
      caption: 'Employee',
      width: 200,
      renderCell: (employee) => <AvatarCell name={employee.name} />,
    },
    { key: 'position', caption: 'Position', width: 150 },
    {
      key: 'department',
      caption: 'Department',
      width: 120,
      renderCell: (employee) => <span className='font-medium text-blue-600'>{employee.department}</span>,
    },
    {
      key: 'salary',
      caption: 'Salary',
      width: 120,
      renderCell: (employee) => <SalaryCell salary={employee.salary} />,
    },
    {
      key: 'status',
      caption: 'Status',
      width: 100,
      renderCell: (employee) => <StatusBadge status={employee.status} />,
    },
    {
      key: 'performance',
      caption: 'Performance',
      width: 150,
      renderCell: (employee) => <ProgressBar value={employee.performance} />,
    },
    {
      key: 'skills',
      caption: 'Skills',
      width: 200,
      renderCell: (employee) => <SkillsTags skills={employee.skills} />,
    },
    {
      key: 'joinDate',
      caption: 'Join Date',
      width: 120,
      renderCell: (employee) => (
        <span className='text-sm text-gray-600'>{new Date(employee.joinDate).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'action',
      caption: 'Actions',
      width: 150,
      renderCell: (employee) => <ActionButtons employee={employee} />,
    },
  ];

// 5. Virtual Table with Custom Cells
<KnittoTable
  headers={headers}
  data={sampleData}
  rowKey='id'
  headerMode='double'
  rowHeight={70}
  headerHeight={40}
  filterHeight={32}
  classNameCell={(data, rowIndex, columnIndex) => {
      // Custom cell styling examples
      if (columnIndex === 4) return 'bg-blue-50'; // Department column
      if (data.status === 'inactive') return 'opacity-60';
      // Add some visual feedback for even/odd rows
      if (rowIndex % 2 === 0) return 'bg-gray-50';
    return '';
  }}
/>`;
