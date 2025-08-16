import { initialState } from '../Marts/InitialStates';

export type Transaction = {
  id: string | number;
  name: string;
  category: string;
  date: string;
  amount: number;
  avatar?: string;
  [k: string]: any;
};

/**
 * fetchTransactions simulates a backend endpoint:
 * - accepts page, limit, search, category, sortBy
 * - filters and sorts the whole dataset first
 * - then slices to return the requested page and total count
 */
export function fetchTransactions(
  page = 1,
  limit = 10,
  search = '',
  category = 'all',
  sortBy = 'latest' // accepts 'latest' | 'recent' | 'oldest' | 'a-z' | 'z-a' | 'high' | 'low'
): Promise<{ data: Transaction[]; total: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const allArr: Transaction[] = Array.isArray(initialState.transactions)
        ? initialState.transactions
        : Object.values(initialState.transactions);

      const searchLower = (search || '').trim().toLowerCase();

      // 1) filter
      const filtered = allArr.filter((tx) => {
        const matchesSearch =
          !searchLower ||
          (tx.name && tx.name.toString().toLowerCase().includes(searchLower)) ||
          (tx.category &&
            tx.category.toString().toLowerCase().includes(searchLower));

        const matchesCategory = category === 'all' || tx.category === category;
        return matchesSearch && matchesCategory;
      });

      // 2) sort
      filtered.sort((a: any, b: any) => {
        switch (sortBy) {
          case 'latest':
          case 'recent':
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          case 'oldest':
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          case 'a-z':
            return a.name.localeCompare(b.name);
          case 'z-a':
            return b.name.localeCompare(a.name);
          case 'high':
            return b.amount - a.amount;
          case 'low':
            return a.amount - b.amount;
          default:
            return 0;
        }
      });

      const total = filtered.length;

      // 3) paginate (slice)
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginated = filtered.slice(start, end);

      // debug: uncomment if you want console logs
      console.log('FakeApi fetch', {
        page,
        limit,
        search,
        category,
        sortBy,
        total,
        start,
        end,
      });

      resolve({ data: paginated, total });
    }, 300); // simulate network latency
  });
}
