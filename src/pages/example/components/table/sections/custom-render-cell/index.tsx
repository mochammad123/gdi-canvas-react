import { memo, useMemo, useState } from 'react';
import ContentSection from '../../components/content-section';
import CodeBlock from '../../components/code-block';
import { sampleData, CODE_EXAMPLE } from './utils';
import { Employee } from '@/lib/variables/table-sample';
import { IHeader, KnittoTable } from '@knittotextile/react-ui';

const StatusBadge = ({ status }: { status: string }) => {
  const map = {
    active: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-200', label: 'Active' },
    inactive: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-200', label: 'Inactive' },
    pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-200', label: 'Pending' },
  } as const;
  const cfg = map[status as keyof typeof map] ?? {
    bg: 'bg-gray-100 dark:bg-black-60',
    text: 'text-gray-800 dark:text-greyish-semi-white',
    label: 'Unknown',
  };
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>;
};

const ProgressBar = ({ value }: { value: number }) => (
  <div className="w-full">
    <div className="w-full bg-gray-200 dark:bg-black-60 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${value < 70 ? 'bg-red-500' : value < 85 ? 'bg-yellow-500' : 'bg-green-500'}`}
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="text-xs text-gray-600 dark:text-black-40 mt-1 block">{value}%</span>
  </div>
);

const AvatarCell = ({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
        {initials}
      </div>
      <span className="font-medium">{name}</span>
    </div>
  );
};

const SkillsTags = ({ skills }: { skills: string[] }) => (
  <div className="flex flex-wrap gap-1">
    {skills.map((s) => (
      <span key={s} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 rounded text-xs">
        {s}
      </span>
    ))}
  </div>
);

const SalaryCell = ({ salary }: { salary: number }) => (
  <span
    className={salary >= 90000 ? 'text-green-700 dark:text-green-400 font-semibold' : 'text-gray-800 dark:text-greyish-semi-white'}
  >{`$${salary.toLocaleString()}`}</span>
);

function CustomRenderCell({ id }: { id: string }) {
  const [showCode, setShowCode] = useState(false);
  const data = useMemo(() => sampleData, []);

  const headers = useMemo<IHeader<Employee>[]>(
    () => [
      { key: 'row-selection', caption: '', width: 50, hideFilter: { search: true, filterSelection: true, filterAdvance: true } },
      { key: 'name', caption: 'Employee', width: 220, renderCell: (e) => <AvatarCell name={e.name} /> },
      { key: 'position', caption: 'Position', width: 150 },
      { key: 'department', caption: 'Department', width: 140, renderCell: (e) => <span className="font-medium text-blue-600">{e.department}</span> },
      { key: 'salary', caption: 'Salary', width: 120, renderCell: (e) => <SalaryCell salary={e.salary} /> },
      { key: 'status', caption: 'Status', width: 110, renderCell: (e) => <StatusBadge status={e.status} /> },
      { key: 'performance', caption: 'Performance', width: 170, renderCell: (e) => <ProgressBar value={e.performance} /> },
      { key: 'skills', caption: 'Skills', width: 220, renderCell: (e) => <SkillsTags skills={e.skills} /> },
      {
        key: 'joinDate',
        caption: 'Join Date',
        width: 140,
        renderCell: (e) => <span className="text-sm text-gray-600 dark:text-black-40">{new Date(e.joinDate).toLocaleDateString()}</span>,
      },
      {
        key: 'action',
        caption: 'Actions',
        width: 150,
        renderCell: () => (
          <div className="flex gap-2">
            <button className="px-2 py-0.5 text-xs rounded bg-blue-600 text-white">View</button>
            <button className="px-2 py-0.5 text-xs rounded bg-gray-200 dark:bg-black-60 dark:text-greyish-semi-white">Edit</button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <ContentSection id={id} title="Custom Render Cell" showCode={showCode} setShowCode={setShowCode} className="mb-10">
      <div className="h-96 mb-2.5 mt-2.5">
        <KnittoTable
          headers={headers}
          data={data}
          rowKey="id"
          headerMode="double"
          rowHeight={70}
          headerHeight={40}
          filterHeight={32}
          classNameCell={(row, rowIndex, columnIndex) => {
            if (columnIndex === 4) return 'bg-blue-50 dark:bg-knitto-blue-60/20';
            if ((row as Employee).status === 'inactive') return 'opacity-60';
            if (rowIndex % 2 === 0) return 'bg-gray-50 dark:bg-black-60';
            return '';
          }}
        />
      </div>

      {showCode && <CodeBlock code={CODE_EXAMPLE} title="Custom Render Cell Example" />}
    </ContentSection>
  );
}

export default memo(CustomRenderCell);
