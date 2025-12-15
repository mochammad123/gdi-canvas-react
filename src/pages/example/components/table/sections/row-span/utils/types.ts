export interface IEmployee {
  id: number;
  department: string;
  team: string;
  name: string;
  position: string;
  email: string;
  salary: number;
}

export interface ISalesReport {
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
