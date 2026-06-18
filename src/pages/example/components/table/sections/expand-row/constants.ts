export const CODE_EXAMPLES = {
  basicExpand: `import { memo, useMemo } from 'react';
import { KnittoTable, type IHeader } from '@knittotextile/react-ui';
import { Employee, generateEmployeeData } from '@/lib/variables/table-sample';

const EmployeeTable = () => {
  const employeeData = useMemo(() => generateEmployeeData(20), []);
  
  const headers: IHeader<Employee>[] = [
    { key: 'expand', caption: '', width: 50 },
    { key: 'name', caption: 'Name', width: 200 },
    { key: 'email', caption: 'Email', width: 250 },
    { key: 'department', caption: 'Department', width: 150 },
    { key: 'position', caption: 'Position', width: 180 },
    { 
      key: 'salary', 
      caption: 'Salary', 
      width: 120, 
      renderCell: (item) => \`$\${item.salary.toLocaleString()}\` 
    },
    { key: 'startDate', caption: 'Start Date', width: 120 },
  ];

  const renderEmployeeExpanded = (emp: Employee) => (
    <div className="p-3 bg-gray-50 border-l-4 border-blue-500">
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <div className="font-medium mb-1">Personal</div>
          <div>Phone: {emp.phone}</div>
          <div>Address: {emp.address}</div>
          <div>City: {emp.city}</div>
          <div>Country: {emp.country}</div>
        </div>
        <div>
          <div className="font-medium mb-1">Employment</div>
          <div>Dept: {emp.department}</div>
          <div>Position: {emp.position}</div>
          <div>Start: {emp.joinDate}</div>
          <div>Skills: {emp.skills.slice(0, 5).join(', ')}</div>
        </div>
      </div>
    </div>
  );

  return (
    <KnittoTable
      headers={headers}
      data={employeeData}
      rowKey="id"
      headerMode="double"
      rowHeight={32}
      headerHeight={40}
      filterHeight={32}
      onRenderExpandedContent={renderEmployeeExpanded}
    />
  );
};

export default memo(EmployeeTable);`,

  nestedTable: `import { memo, useMemo } from 'react';
import { KnittoTable, type IHeader } from '@knittotextile/react-ui';
import { Company, Department, Team, generateCompanyData } from '@/lib/variables/table-sample';

const CompanyTable = () => {
  const companyData = useMemo(() => generateCompanyData(), []);
  
  const companyHeaders: IHeader<Company>[] = [
    { key: 'expand', caption: '', width: 50 },
    { key: 'companyName', caption: 'Company', width: 200 },
    { key: 'industry', caption: 'Industry', width: 150 },
    {
      key: 'revenue',
      caption: 'Revenue',
      width: 150,
      renderCell: (item) => \`$\${(item.revenue / 1000000).toFixed(1)}M\`,
    },
    { key: 'employees', caption: 'Employees', width: 120 },
    { key: 'founded', caption: 'Founded', width: 100 },
    { key: 'ceo', caption: 'CEO', width: 180 },
    { key: 'headquarters', caption: 'Headquarters', width: 150 },
  ];

  const departmentHeaders: IHeader<Department>[] = [
    { key: 'expand', caption: '', width: 50 },
    { key: 'name', caption: 'Department', width: 200 },
    { key: 'manager', caption: 'Manager', width: 200 },
    { key: 'employees', caption: 'Employees', width: 120, renderCell: (item) => item.employees.toString() },
    {
      key: 'budget',
      caption: 'Budget',
      width: 150,
      renderCell: (item) => \`$\${item.budget.toLocaleString()}\`,
    },
  ];

  const teamHeaders: IHeader<Team>[] = [
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
          className={\`px-2 py-1 rounded text-xs \${
            item.status === 'Active'
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : item.status === 'Inactive'
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
          }\`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  const renderDepartmentTeams = (dept: Department) => (
    <div className="p-3 bg-blue-50 border-l-4 border-blue-400">
      <div className="font-medium text-sm mb-2">{dept.name} Teams</div>
      <div className="h-48">
        <KnittoTable headers={teamHeaders} data={dept.teams} rowKey="name" headerMode="single" rowHeight={24} headerHeight={28} filterHeight={0} />
      </div>
    </div>
  );

  const renderCompanyDepartments = (company: Company) => (
    <div className="p-4 bg-gray-50 border-l-4 border-green-500">
      <div className="font-semibold text-sm mb-2">Company Departments</div>
      <div className="h-64">
        <KnittoTable
          headers={departmentHeaders}
          data={company.departments}
          rowKey="name"
          onRenderExpandedContent={renderDepartmentTeams}
          headerMode="double"
          rowHeight={28}
          headerHeight={32}
          filterHeight={28}
        />
      </div>
    </div>
  );

  return (
    <KnittoTable
      headers={companyHeaders}
      data={companyData}
      rowKey="id"
      onRenderExpandedContent={renderCompanyDepartments}
      headerMode="double"
      rowHeight={32}
      headerHeight={40}
      filterHeight={32}
    />
  );
};

export default memo(CompanyTable);`,

  customToggle: `import { memo, useMemo } from 'react';
import { KnittoTable, type IHeader } from '@knittotextile/react-ui';
import { Employee, generateEmployeeData } from '@/lib/variables/table-sample';

const CustomExpandTable = () => {
  const employeeData = useMemo(() => generateEmployeeData(20), []);
  
  const headers: IHeader<Employee>[] = [
    {
      key: 'expand',
      caption: '',
      width: 100,
      renderExpandToggle: (_item, isExpanded) => (
        <div className="flex justify-center items-center w-full h-full">
          <button
            data-action="expand"
            className={\`px-1 py-1 rounded text-xs font-medium transition-colors \${
              isExpanded
                ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800'
                : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
            }\`}
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
      renderCell: (item) => \`$\${item.salary.toLocaleString()}\`,
    },
  ];

  const renderEmployeeExpanded = (emp: Employee) => (
    <div className="p-3 bg-gray-50 border-l-4 border-blue-500">
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <div className="font-medium mb-1">Personal</div>
          <div>Phone: {emp.phone}</div>
          <div>Address: {emp.address}</div>
          <div>City: {emp.city}</div>
          <div>Country: {emp.country}</div>
        </div>
        <div>
          <div className="font-medium mb-1">Employment</div>
          <div>Dept: {emp.department}</div>
          <div>Position: {emp.position}</div>
          <div>Start: {emp.joinDate}</div>
          <div>Skills: {emp.skills.slice(0, 5).join(', ')}</div>
        </div>
      </div>
    </div>
  );

  return (
    <KnittoTable
      headers={headers}
      data={employeeData}
      rowKey="id"
      onRenderExpandedContent={renderEmployeeExpanded}
      headerMode="double"
      rowHeight={32}
      headerHeight={40}
      filterHeight={32}
    />
  );
};

export default memo(CustomExpandTable);`,
};
