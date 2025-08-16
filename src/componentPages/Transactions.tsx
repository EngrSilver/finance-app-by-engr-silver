import React, { useEffect, useState, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Transactions.css';
import { CiSearch } from 'react-icons/ci';
import { TiArrowSortedDown } from 'react-icons/ti';
import { FaFilter } from 'react-icons/fa6';
import { BsFillFilterSquareFill } from 'react-icons/bs';
import { fetchTransactions } from './FakeApi'; //
import { useWindowWidth } from '../Home';

type SelectOption = { value: string; label: string };

type SelectProps = {
  label?: string;
  name: string;
  icon?: ReactNode;
  options: SelectOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setSelected?: React.Dispatch<React.SetStateAction<string>>;
  selected?: string;
};

const sortbyoptions: SelectOption[] = [
  { value: 'latest', label: 'latest (most recent)' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'a - z' },
  { value: 'z-a', label: 'z - a' },
  { value: 'high', label: 'Highest (Transaction Amount)' },
  { value: 'low', label: 'lowest' },
];

const categoryoptions: SelectOption[] = [
  { value: 'all', label: 'all Transaction' },
  { value: 'General', label: 'general' },
  { value: 'DiningOut', label: 'dinning Out' },
  { value: 'Groceries', label: 'groceries' },
  { value: 'Entertainment', label: 'entertainment' },
  { value: 'Transportation', label: 'transportation' },
  { value: 'Lifestyle', label: 'lifestyle' },
  { value: 'PersonalCare', label: 'personal Care' },
  { value: 'Education', label: 'education' },
  { value: 'Bills', label: 'bills' },
  { value: 'Shopping', label: 'shopping' },
];

function SearchInputContainer({
  searchvalue,
  setSearchvalue,
}: {
  searchvalue: string;
  setSearchvalue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handlesearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchvalue(e.target.value);
  };
  return (
    <div className="search-input-container">
      <input
        className={'search-input-Transactions'}
        type="search"
        value={searchvalue}
        onChange={handlesearchValue}
        placeholder="Search-Transaction"
      />
      <CiSearch className="search-icon" />
    </div>
  );
}

function Sortbylabel({ sortby }: { sortby: string }) {
  return (
    <label className="sort-by-label" htmlFor="sort-by">
      {sortby}
    </label>
  );
}

const style: React.CSSProperties = {
  position: 'absolute',
  right: '20px',
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  color: '#555',
  fontSize: '14px',
};

function Sortby({ name, options, icon, setSelected, selected }: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected?.(e.target.value);
  };

  const truncate = (label: string) =>
    label.length > 10 ? label.slice(0, 10) + '...' : label;

  const selectedLabel =
    options.find((opt) => opt.value === selected)?.label || options[0].label;

  return (
    <div className="sort-by-container">
      <div className="sort-label-wrapper">
        <Sortbylabel sortby={name} />
        <div
          style={{
            position: 'absolute',
            right: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#000',
            pointerEvents: 'none',
            fontSize: '0.5rem',
          }}>
          {truncate(selectedLabel)}
        </div>
      </div>
      <select
        onChange={handleChange}
        value={selected}
        name={name}
        id={name}
        className="sort-by-select"
        style={{
          appearance: 'none',
          color: 'transparent',
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          cursor: 'pointer',
        }}>
        {options.map((opt) => (
          <option value={opt.value} key={opt.value} style={{ color: 'black' }}>
            {opt.label}
          </option>
        ))}
      </select>
      {<TiArrowSortedDown style={style} />}
      <div className="sort-icon">{icon}</div>
    </div>
  );
}

export function PageHeader({ value }: { value: string }) {
  return (
    <>
      <h2 className="page-header">{value}</h2>
    </>
  );
}

function SubHeader({
  sender,
  category,
  date,
  amount,
  icon,
}: {
  sender: string;
  category: string;
  date: string;
  amount: number | string;
  icon?: string;
}) {
  return (
    <div className="sub-header">
      <div className="alignment">
        <div>{icon && <img className="avatar" src={icon} alt="avatar" />}</div>
        <p className="transaction-Recipient tag">{sender}</p>
      </div>
      <p className="transaction-category tag">{category}</p>
      <p className="transaction-date tag">{date}</p>
      <p
        className="transaction-amount tag"
        style={{ color: Number(amount) > 0 ? 'green' : 'black' }}>
        {Number(amount) > 0 ? `+${amount}` : amount}
      </p>
    </div>
  );
}

export default function Transactions() {
  // URL params
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = parseInt(searchParams.get('limit') || '10', 10);
  const urlSearch = searchParams.get('search') || '';
  const urlSort = searchParams.get('sortby') || 'latest';
  const urlCategory = searchParams.get('category') || 'all';

  // component state
  const [transactions, setTransactions] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  // local UI state (inputs) initialized from URL params
  const [searchvalue, setSearchvalue] = useState<string>(urlSearch);
  const [debouncedValue, setDebouncedValue] = useState<string>(urlSearch);
  const [selected, setSelected] = useState<string>(urlSort); // sortby
  const [category, setCategory] = useState<string>(urlCategory); // category

  // debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedValue(searchvalue), 500);
    return () => clearTimeout(t);
  }, [searchvalue]);

  // whenever debounced search, selected, or category change, update URL (reset page -> 1)
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', '1');
    params.set('limit', String(itemsPerPage));

    if (debouncedValue.trim()) params.set('search', debouncedValue.trim());
    if (selected && selected !== 'latest') params.set('sortby', selected);
    if (category && category !== 'all') params.set('category', category);
    console.log(params.toString());
    setSearchParams(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, selected, category, itemsPerPage]);

  // fetch from fake backend whenever any relevant URL param changes
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    fetchTransactions(
      currentPage,
      itemsPerPage,
      urlSearch,
      urlCategory,
      urlSort
    )
      .then((res) => {
        if (cancelled) return;
        setTransactions(res.data);
        setTotal(res.total);
      })
      .catch((err) => {
        console.error('fetchTransactions error', err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [currentPage, itemsPerPage, urlSearch, urlCategory, urlSort]);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    params.set('limit', String(itemsPerPage));
    setSearchParams(params);
  };

  const changeLimit = (limit: number) => {
    // when limit changes, reset to page 1
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    params.set('limit', String(limit));
    // preserve search/sort/category already in URL if present
    setSearchParams(params);
  };

  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));
  const width = useWindowWidth();
  const isMobile = width > 500;
  return (
    <div className="transaction-page">
      <div className="headSection">
        <PageHeader value="Transactions" />
        <div className="filter-section">
          <SearchInputContainer
            searchvalue={searchvalue}
            setSearchvalue={setSearchvalue}
          />
          <div className="for-layout">
            <Sortby
              name="sortby"
              options={sortbyoptions}
              icon={<FaFilter />}
              selected={selected}
              setSelected={setSelected}
            />
            <Sortby
              name="category"
              options={categoryoptions}
              icon={<BsFillFilterSquareFill />}
              selected={category}
              setSelected={setCategory}
            />
          </div>
        </div>
      </div>

      <div className="items-center justify-between w-[100%]">
        <div className="transaction-bodySection">
          <SubHeader
            sender="Recipient / Sender"
            category="Category"
            date="Transaction Date"
            amount="Amount"
          />

          <div className="flex flex-col w-full ">
            {isLoading ? (
              <p>Loading...</p>
            ) : transactions.length === 0 ? (
              <p>No transactions</p>
            ) : (
              transactions.map((tx) => (
                <SubHeader
                  key={tx.id}
                  sender={tx.name}
                  category={tx.category}
                  date={tx.date}
                  amount={tx.amount}
                  icon={tx.avatar}
                />
              ))
            )}
          </div>

          {/* pagination controls */}
          <div
            style={{
              marginTop: 12,
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <button
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
              className="pagination-control-pn">
              Prev
            </button>

            {/* <span className="current-page-total-page">
              Page {currentPage} of {totalPages}
            </span> */}

            {/* quick numeric buttons (optional) */}
            <div className="flex justify-center items-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  style={{
                    fontWeight: i + 1 === currentPage ? 'bold' : 'normal',
                    marginLeft: 6,
                  }}
                  onClick={() => changePage(i + 1)}
                  className="pagination-control-pn bg-darker ">
                  {i + 1}
                </button>
              ))}
              <div
                style={{ marginLeft: 'auto' }}
                className="flex justify-center items-center">
                <label className="current-page-total-page">
                  {isMobile && <p className="space">Items per page</p>}
                  <select
                    value={itemsPerPage}
                    onChange={(e) => changeLimit(Number(e.target.value))}
                    className="pagination-control-pn space">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </label>
              </div>
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => changePage(currentPage + 1)}
              className="pagination-control-pn">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
