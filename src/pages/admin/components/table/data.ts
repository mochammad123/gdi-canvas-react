export interface IDummyData {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  createdAt: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  jobTitle: string;
  salary: number;
  lastLogin: string;
}

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'];
const countries = ['USA', 'Canada', 'UK', 'Germany', 'Australia'];
const jobTitles = ['Software Engineer', 'Designer', 'Project Manager', 'Data Analyst', 'HR Manager'];

export const dummyData: IDummyData[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  age: Math.floor(Math.random() * 50) + 18,
  isActive: Math.random() > 0.5,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  phone: `+1 555-01${index.toString().padStart(2, '0')}`,
  address: `Street ${index + 1}, Block ${Math.floor(Math.random() * 20) + 1}`,
  city: cities[Math.floor(Math.random() * cities.length)],
  country: countries[Math.floor(Math.random() * countries.length)],
  jobTitle: jobTitles[Math.floor(Math.random() * jobTitles.length)],
  salary: Math.floor(Math.random() * 5000) + 3000,
  lastLogin: new Date(Date.now() - Math.floor(Math.random() * 500000000)).toISOString(),
}));
