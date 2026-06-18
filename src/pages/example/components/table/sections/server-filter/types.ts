export type TSortOrder = 'asc' | 'desc' | 'unset';

export type TFilterAdvanceConfig = 'none' | 'equal' | 'notEqual' | 'startsWith' | 'endsWith' | 'contains' | 'notContains';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type CombinedData = User & {
  posts?: Post[];
  postCount: number;
};

export type FilterParams = {
  search?: Record<string, string>;
  sort?: { key: string; order: TSortOrder };
  selection?: Record<string, string[]>;
  advance?: Record<string, { config_name: TFilterAdvanceConfig; value: string }>;
};

export type ServerFilters = {
  search: Record<string, string>;
  sort: { key: string | null; order: TSortOrder };
  selection: Record<string, string[]>;
  advance: Record<string, { config_name: TFilterAdvanceConfig; value: string }>;
};
