import { EmployeeData, generateLargeEmployeeData } from '@/lib/variables/table-sample';

export const generateDataset = (count: number): EmployeeData[] => {
  const data = generateLargeEmployeeData(count);

  return data;
};
