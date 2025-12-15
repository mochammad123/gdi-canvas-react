import { memo, useMemo, useState } from 'react';
import ContentSection from '../../components/content-section';
import CodeBlock from '../../components/code-block';
import { sampleData, CODE_EXAMPLE } from './utils';
import { Employee } from '@/lib/variables/table-sample';
import { IHeader, KnittoTable } from '@/components/ui/knitto-table';

const StatusBadge = ({ status }: { status: string }) => {
  const map = {
    active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
    inactive: { bg: 'bg-red-100', text: 'text-red-800', label: 'Inactive' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
  } as const;
  const cfg = map[status as keyof typeof map] ?? { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Unknown' };
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>;
};

const ProgressBar = ({ value }: { value: number }) => (
  <div className="w-full">
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${value < 70 ? 'bg-red-500' : value < 85 ? 'bg-yellow-500' : 'bg-green-500'}`}
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="text-xs text-gray-600 mt-1 block">{value}%</span>
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
      <span key={s} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
        {s}
      </span>
    ))}
  </div>
);

const SalaryCell = ({ salary }: { salary: number }) => (
  <span className={salary >= 90000 ? 'text-green-700 font-semibold' : 'text-gray-800'}>{`$${salary.toLocaleString()}`}</span>
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
        renderCell: (e) => <span className="text-sm text-gray-600">{new Date(e.joinDate).toLocaleDateString()}</span>,
      },
      {
        key: 'action',
        caption: 'Actions',
        width: 150,
        renderCell: () => (
          <div className="flex gap-2">
            <button className="px-2 py-0.5 text-xs rounded bg-blue-600 text-white">View</button>
            <button className="px-2 py-0.5 text-xs rounded bg-gray-200">Edit</button>
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
            if (columnIndex === 4) return 'bg-blue-50';
            if ((row as Employee).status === 'inactive') return 'opacity-60';
            if (rowIndex % 2 === 0) return 'bg-gray-50';
            return '';
          }}
        />
      </div>

      {showCode && <CodeBlock code={CODE_EXAMPLE} title="Custom Render Cell Example" />}
    </ContentSection>
  );
}

export default memo(CustomRenderCell);
