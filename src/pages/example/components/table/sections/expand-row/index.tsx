import { memo, useMemo, useState } from 'react';
import ContentSection from '../../components/content-section';
import CodeBlock from '../../components/code-block';
import ToggleShowCode from '@/components/toggle-show-code';
import { CODE_EXAMPLES } from './constants';
import { Company, Department, Employee, generateCompanyData, generateEmployeeData, Team } from '@/lib/variables/table-sample';
import { IHeader, KnittoTable } from '@/components/ui/knitto-table';
import { getCompanyHeaders, getCustomEmployeeHeaders, getDepartmentHeaders, getEmployeeHeaders, getTeamHeaders } from './data';

function ExpanRow({ id }: { id: string }) {
  const [showCodeBasic, setShowCodeBasic] = useState(false);
  const [showCodeNested, setShowCodeNested] = useState(false);
  const [showCodeCustom, setShowCodeCustom] = useState(false);

  // Basic expand
  const employeeData = useMemo(() => generateEmployeeData(20), []);
  const employeeHeaders = useMemo<IHeader<Employee>[]>(() => getEmployeeHeaders(), []);

  // Nested expand
  const companyData = useMemo(() => generateCompanyData(), []);
  const companyHeaders = useMemo<IHeader<Company>[]>(() => getCompanyHeaders(), []);
  const departmentHeaders = useMemo<IHeader<Department>[]>(() => getDepartmentHeaders(), []);
  const teamHeaders = useMemo<IHeader<Team>[]>(() => getTeamHeaders(), []);

  // Custom toggle
  const customToggleHeaders = useMemo<IHeader<Employee>[]>(() => getCustomEmployeeHeaders(), []);

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

  const renderDepartmentTeams = (dept: Department) => (
    <div className="p-3 bg-blue-50 border-l-4 border-blue-400 w-full">
      <div className="font-medium text-sm mb-2">{dept.name} Teams</div>
      <div className="h-48">
        <KnittoTable headers={teamHeaders} data={dept.teams} rowKey="name" headerMode="single" rowHeight={24} headerHeight={28} filterHeight={0} />
      </div>
    </div>
  );

  const renderCompanyDepartments = (company: Company) => (
    <div className="p-4 bg-green-50 border-l-4 border-green-500">
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
    <ContentSection id={id} title="Expand Row" className="mb-10">
      {/* 1. Basic Expand Row */}
      <div className="flex justify-between items-center mb-1.5">
        <span className="global-report-title">1. Basic Expand Row</span>
        <ToggleShowCode show={showCodeBasic} setShow={setShowCodeBasic} />
      </div>
      <div className="h-80 mb-3">
        <KnittoTable
          headers={employeeHeaders}
          data={employeeData}
          rowKey="id"
          headerMode="double"
          rowHeight={32}
          headerHeight={40}
          filterHeight={32}
          onRenderExpandedContent={renderEmployeeExpanded}
        />
      </div>
      {showCodeBasic && <CodeBlock code={CODE_EXAMPLES.basicExpand} title="Basic Expand Row Example" />}

      {/* 2. Nested Table Expand Row */}
      <div className="flex justify-between items-center mb-1.5 mt-4">
        <span className="global-report-title">2. Nested Table Expand Row</span>
        <ToggleShowCode show={showCodeNested} setShow={setShowCodeNested} />
      </div>
      <div className="h-96 mb-3">
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
      </div>
      {showCodeNested && <CodeBlock code={CODE_EXAMPLES.nestedTable} title="Nested Table Expand Row Example" />}

      {/* 3. Custom Expand Toggle */}
      <div className="flex justify-between items-center mb-1.5 mt-4">
        <span className="global-report-title">3. Custom Expand Toggle</span>
        <ToggleShowCode show={showCodeCustom} setShow={setShowCodeCustom} />
      </div>
      <div className="h-72 mb-3">
        <KnittoTable
          headers={customToggleHeaders}
          data={employeeData}
          rowKey="id"
          onRenderExpandedContent={renderEmployeeExpanded}
          headerMode="double"
          rowHeight={32}
          headerHeight={40}
          filterHeight={32}
        />
      </div>
      {showCodeCustom && <CodeBlock code={CODE_EXAMPLES.customToggle} title="Custom Expand Toggle Example" />}
    </ContentSection>
  );
}

export default memo(ExpanRow);
