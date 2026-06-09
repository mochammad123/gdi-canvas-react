import { IHeader } from '@/components/ui/knitto-table';
import { Company, Department, Employee, Team } from '@/lib/variables/table-sample';

export const getEmployeeHeaders = (): IHeader<Employee>[] => [
  { key: 'expand', caption: '', width: 50 },
  { key: 'name', caption: 'Name', width: 200 },
  { key: 'email', caption: 'Email', width: 250 },
  { key: 'department', caption: 'Department', width: 150 },
  { key: 'position', caption: 'Position', width: 180 },
  {
    key: 'salary',
    caption: 'Salary',
    width: 120,
    renderCell: (item) => `$${item.salary.toLocaleString()}`,
  },
  { key: 'startDate', caption: 'Start Date', width: 120 },
];

export const getCustomEmployeeHeaders = (): IHeader<Employee>[] => [
  {
    key: 'expand',
    caption: '',
    width: 100,
    renderExpandToggle: (_item, isExpanded) => (
      <div className="flex justify-center items-center w-full h-full">
        <button
          data-action="expand"
          className={`px-1 py-1 rounded text-xs font-medium transition-colors ${isExpanded ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800' : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'}`}
          type="button"
          aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
        >
          {isExpanded ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
    ),
  },
  { key: 'name', caption: 'Name', width: 200 },
  { key: 'email', caption: 'Email', width: 250 },
  { key: 'department', caption: 'Department', width: 150 },
  { key: 'position', caption: 'Position', width: 180 },
  {
    key: 'salary',
    caption: 'Salary',
    width: 120,
    renderCell: (item) => `$${item.salary.toLocaleString()}`,
  },
];

export const getCompanyHeaders = (): IHeader<Company>[] => [
  { key: 'expand', caption: '', width: 50 },
  { key: 'name', caption: 'Company', width: 200 },
  { key: 'industry', caption: 'Industry', width: 150 },
  {
    key: 'revenue',
    caption: 'Revenue',
    width: 150,
    renderCell: (item) => `$${(item.revenue / 1000000).toFixed(1)}M`,
  },
  { key: 'employees', caption: 'Employees', width: 120 },
  { key: 'founded', caption: 'Founded', width: 100 },
  { key: 'ceo', caption: 'CEO', width: 180 },
  { key: 'headquarters', caption: 'Headquarters', width: 150 },
];

export const getDepartmentHeaders = (): IHeader<Department>[] => [
  { key: 'expand', caption: '', width: 50 },
  { key: 'name', caption: 'Department', width: 200 },
  { key: 'manager', caption: 'Manager', width: 200 },
  { key: 'employees', caption: 'Employees', width: 120, renderCell: (item) => item.employees.toString() },
  {
    key: 'budget',
    caption: 'Budget',
    width: 150,
    renderCell: (item) => `$${item.budget.toLocaleString()}`,
  },
];

export const getTeamHeaders = (): IHeader<Team>[] => [
  { key: 'name', caption: 'Team Name', width: 200 },
  { key: 'lead', caption: 'Team Lead', width: 180 },
  { key: 'members', caption: 'Members', width: 100, renderCell: (item) => item.members.toString() },
  { key: 'projects', caption: 'Projects', width: 100, renderCell: (item) => item.projects.toString() },
  {
    key: 'status',
    caption: 'Status',
    width: 120,
    renderCell: (item) => (
      <span
        className={`px-2 py-1 rounded text-xs ${item.status === 'Active' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : item.status === 'Inactive' ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200' : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'}`}
      >
        {item.status}
      </span>
    ),
  },
];
