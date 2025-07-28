import './Transactions.css';
import { CiSearch } from 'react-icons/ci';

function SearchInputContainer() {
  return (
    <div className="search-input-container">
      <input
        className={'search-input-Transactions'}
        type="search"
        placeholder="Search-Transaction"
      />
      <CiSearch className="search-icon" />
    </div>
  );
}

function Sortby() {
  return (
    <div>
      <label>Sort by</label>
      <select name="sort-by" id="sort-by">
        <option value="Latest"> latest (most recent)</option>
      </select>
    </div>
  );
}
export default function Transactions() {
  return (
    <div>
      <div className="headSection">
        <SearchInputContainer />
        <div className="filter-section">
          <Sortby />
        </div>
      </div>
    </div>
  );
}
