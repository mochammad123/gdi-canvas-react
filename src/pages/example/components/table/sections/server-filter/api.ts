import type { CombinedData, FilterParams, Post, User } from './types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

export const fetchCombinedData = async (filterParams?: FilterParams): Promise<CombinedData[]> => {
  const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);

  // Combine data
  let combinedData: CombinedData[] = users.map((user) => {
    const userPosts = posts.filter((post) => post.userId === user.id);
    return {
      ...user,
      postCount: userPosts.length,
      posts: userPosts.slice(0, 3),
    };
  });

  // Apply search filter
  if (filterParams?.search) {
    Object.entries(filterParams.search).forEach(([key, value]) => {
      if (value) {
        combinedData = combinedData.filter((item) => {
          const itemValue = item[key as keyof CombinedData];
          const stringValue = typeof itemValue === 'object' && itemValue !== null ? JSON.stringify(itemValue) : String(itemValue || '');
          return stringValue.toLowerCase().includes(value.toLowerCase());
        });
      }
    });
  }

  // Apply selection filter
  if (filterParams?.selection) {
    Object.entries(filterParams.selection).forEach(([key, values]) => {
      if (values.length > 0) {
        combinedData = combinedData.filter((item) => {
          const itemValue = item[key as keyof CombinedData];
          const stringValue = typeof itemValue === 'object' && itemValue !== null ? JSON.stringify(itemValue) : String(itemValue);
          return values.includes(stringValue);
        });
      }
    });
  }

  // Apply advance filter
  if (filterParams?.advance) {
    Object.entries(filterParams.advance).forEach(([key, filter]) => {
      if (filter.value) {
        combinedData = combinedData.filter((item) => {
          const itemValue = item[key as keyof CombinedData];
          const stringValue = typeof itemValue === 'object' && itemValue !== null ? JSON.stringify(itemValue) : String(itemValue || '');
          const itemValueLower = stringValue.toLowerCase();
          const filterValue = filter.value.toLowerCase();

          switch (filter.config_name) {
            case 'equal':
              return itemValueLower === filterValue;
            case 'notEqual':
              return itemValueLower !== filterValue;
            case 'startsWith':
              return itemValueLower.startsWith(filterValue);
            case 'endsWith':
              return itemValueLower.endsWith(filterValue);
            case 'contains':
              return itemValueLower.includes(filterValue);
            case 'notContains':
              return !itemValueLower.includes(filterValue);
            default:
              return true;
          }
        });
      }
    });
  }

  // Apply sorting
  if (filterParams?.sort?.key && filterParams.sort.order !== 'unset') {
    combinedData.sort((a, b) => {
      const sortKey = filterParams.sort!.key as keyof CombinedData;
      let aVal = a[sortKey];
      let bVal = b[sortKey];

      // Convert objects to strings for comparison
      if (typeof aVal === 'object' && aVal !== null) {
        aVal = JSON.stringify(aVal) as unknown as string;
      }
      if (typeof bVal === 'object' && bVal !== null) {
        bVal = JSON.stringify(bVal) as unknown as string;
      }

      if (aVal == null || bVal == null) return 0;
      if (aVal < bVal) return filterParams.sort!.order === 'asc' ? -1 : 1;
      if (aVal > bVal) return filterParams.sort!.order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return combinedData;
};
