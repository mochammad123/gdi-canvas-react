export const CODE_EXAMPLES = {
  main: `import { useState, useEffect, useCallback } from 'react';
  import { VirtualTable, type IHeader } from '@knitto/virtual-table';
  import type { TSortOrder, TFilterAdvanceConfig } from '@knitto/virtual-table/lib/types';
  
  // Types for our API data
  type User = {
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
    };
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
  };
  
  type CombinedData = User & {
    postCount: number;
  };
  
  const ServerFilterTable = () => {
    const [data, setData] = useState<CombinedData[]>([]);
    const [loading, setLoading] = useState(false);
    
    // Server filter states
    const [filters, setFilters] = useState({
      search: {} as Record<string, string>,
      sort: { key: null as string | null, order: 'unset' as TSortOrder },
      selection: {} as Record<string, string[]>,
      advance: {} as Record<string, { config_name: TFilterAdvanceConfig; value: string }>,
    });
  
    // Fetch data from API with server-side filtering
    const fetchData = useCallback(async (filterParams?: {
      search?: Record<string, string>;
      sort?: { key: string; order: TSortOrder };
      selection?: Record<string, string[]>;
      advance?: Record<string, { config_name: TFilterAdvanceConfig; value: string }>;
    }) => {
      setLoading(true);
      try {
        // Fetch users from API
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const users: User[] = await usersResponse.json();
  
        // Fetch posts to get post counts
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await postsResponse.json();
  
        // Combine data
        const combinedData: CombinedData[] = users.map(user => ({
          ...user,
          postCount: posts.filter(post => post.userId === user.id).length,
        }));
  
        // Apply server-side filtering
        let filteredData = combinedData;
  
        // Apply search filter
        if (filterParams?.search) {
          Object.entries(filterParams.search).forEach(([key, value]) => {
            if (value) {
              filteredData = filteredData.filter(item => {
                const itemValue = item[key as keyof CombinedData];
                const stringValue = typeof itemValue === 'object' && itemValue !== null
                  ? JSON.stringify(itemValue)
                  : String(itemValue || '');
                return stringValue.toLowerCase().includes(value.toLowerCase());
              });
            }
          });
        }
  
        // Apply selection filter
        if (filterParams?.selection) {
          Object.entries(filterParams.selection).forEach(([key, values]) => {
            if (values.length > 0) {
              filteredData = filteredData.filter(item => {
                const itemValue = item[key as keyof CombinedData];
                const stringValue = typeof itemValue === 'object' && itemValue !== null
                  ? JSON.stringify(itemValue)
                  : String(itemValue);
                return values.includes(stringValue);
              });
            }
          });
        }
  
        // Apply advance filter
        if (filterParams?.advance) {
          Object.entries(filterParams.advance).forEach(([key, filter]) => {
            if (filter.value) {
              filteredData = filteredData.filter(item => {
                const itemValue = item[key as keyof CombinedData];
                const stringValue = typeof itemValue === 'object' && itemValue !== null
                  ? JSON.stringify(itemValue)
                  : String(itemValue || '');
                const itemValueLower = stringValue.toLowerCase();
                const filterValue = filter.value.toLowerCase();
                
                switch (filter.config_name) {
                  case 'equal': return itemValueLower === filterValue;
                  case 'notEqual': return itemValueLower !== filterValue;
                  case 'startsWith': return itemValueLower.startsWith(filterValue);
                  case 'endsWith': return itemValueLower.endsWith(filterValue);
                  case 'contains': return itemValueLower.includes(filterValue);
                  case 'notContains': return !itemValueLower.includes(filterValue);
                  default: return true;
                }
              });
            }
          });
        }
  
        // Apply sorting
        if (filterParams?.sort?.key && filterParams.sort.order !== 'unset') {
          filteredData.sort((a, b) => {
            const sortKey = filterParams.sort!.key as keyof CombinedData;
            let aVal = a[sortKey];
            let bVal = b[sortKey];
            
            // Convert objects to strings for comparison
            if (typeof aVal === 'object' && aVal !== null) {
              aVal = JSON.stringify(aVal) as any;
            }
            if (typeof bVal === 'object' && bVal !== null) {
              bVal = JSON.stringify(bVal) as any;
            }
            
            if (aVal == null || bVal == null) return 0;
            if (aVal < bVal) return filterParams.sort!.order === 'asc' ? -1 : 1;
            if (aVal > bVal) return filterParams.sort!.order === 'asc' ? 1 : -1;
            return 0;
          });
        }
  
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }, []);
  
    // Initial data fetch
    useEffect(() => {
      fetchData();
    }, [fetchData]);
  
    // Define table headers with filter options
    const headers: IHeader<CombinedData>[] = [
      { key: 'id', caption: 'ID', width: 80 },
      { 
        key: 'name', 
        caption: 'Name', 
        width: 180,
        filterSelectionOptions: ['Leanne Graham', 'Ervin Howell', 'Clementine Bauch']
      },
      { key: 'username', caption: 'Username', width: 120 },
      { key: 'email', caption: 'Email', width: 200 },
      { key: 'phone', caption: 'Phone', width: 150 },
      { key: 'website', caption: 'Website', width: 120 },
      { 
        key: 'address.city', 
        caption: 'City', 
        width: 120,
        filterSelectionOptions: ['Gwenborough', 'Wisokyburgh', 'McKenziehaven']
      },
      { 
        key: 'company.name', 
        caption: 'Company', 
        width: 150,
        filterSelectionOptions: ['Romaguera-Crona', 'Deckow-Crist', 'Romaguera-Jacobson']
      },
      { 
        key: 'postCount', 
        caption: 'Posts', 
        width: 80,
        renderCell: (item) => (
          <span className="font-semibold text-blue-600">{item.postCount}</span>
        )
      },
    ];
  
    // Handle filter changes
    const handleFilterChange = useCallback((filterType: 'sort' | 'search' | 'selection' | 'advance', data: unknown) => {
      const newFilters = { ...filters };
      
      if (filterType === 'sort') {
        newFilters.sort = data as { key: string | null; order: TSortOrder };
      } else if (filterType === 'search') {
        newFilters.search = data as Record<string, string>;
      } else if (filterType === 'selection') {
        newFilters.selection = data as Record<string, string[]>;
      } else if (filterType === 'advance') {
        newFilters.advance = data as Record<string, { config_name: TFilterAdvanceConfig; value: string }>;
      }
      
      setFilters(newFilters);
      
      // Only fetch with valid sort key
      const fetchParams = {
        ...newFilters,
        sort: newFilters.sort.key ? { key: newFilters.sort.key, order: newFilters.sort.order } : undefined
      };
      
      fetchData(fetchParams);
    }, [filters, fetchData]);
  
    return (
      <VirtualTable
        headers={headers}
        data={data}
        rowKey="id"
        headerMode="double"
        rowHeight={32}
        headerHeight={40}
        filterHeight={32}
        isLoading={loading}
        useServerFilter={{
          sort: true,
          search: true,
          selection: true,
          advance: true,
        }}
        onChangeFilter={{
          sort: (key, sortBy) => handleFilterChange('sort', { key, order: sortBy }),
          search: (searchData) => handleFilterChange('search', searchData),
          selection: (selectionData) => handleFilterChange('selection', selectionData),
          advance: (advanceData) => handleFilterChange('advance', advanceData),
        }}
      />
    );
  };
  
  export default ServerFilterTable;`,

  enableServerFilter: `useServerFilter={{
    sort: true,        // Enable server-side sorting
    search: true,      // Enable server-side search
    selection: true,   // Enable server-side selection filter
    advance: true,     // Enable server-side advance filter
  }}`,

  handleFilterChanges: `onChangeFilter={{
    sort: (key, sortBy) => {
      // Handle sorting - make API call with sort parameters
      fetchData({ sort: { key, order: sortBy } });
    },
    search: (searchData) => {
      // Handle search - make API call with search parameters
      fetchData({ search: searchData });
    },
    selection: (selectionData) => {
      // Handle selection filter - make API call with filter parameters
      fetchData({ selection: selectionData });
    },
    advance: (advanceData) => {
      // Handle advance filter - make API call with complex filter parameters
      fetchData({ advance: advanceData });
    },
  }}`,

  serverSideProcessing: `// Example API endpoint logic
  app.get('/api/users', (req, res) => {
    const { search, sort, selection, advance } = req.query;
    
    let query = db.users.find();
    
    // Apply search filters
    if (search) {
      Object.entries(search).forEach(([field, value]) => {
        query = query.where(field).contains(value);
      });
    }
    
    // Apply selection filters
    if (selection) {
      Object.entries(selection).forEach(([field, values]) => {
        query = query.where(field).in(values);
      });
    }
    
    // Apply sorting
    if (sort) {
      query = query.orderBy(sort.key, sort.order);
    }
    
    const results = query.exec();
    res.json(results);
  });`,
};
