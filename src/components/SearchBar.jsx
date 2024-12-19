

function SearchBar({ searchQuery, onSearchChange, onSearch }) {
    return (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search todos"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          <button onClick={onSearch} className="search-button">
            Search
          </button>
        </div>
      );
}

export default SearchBar