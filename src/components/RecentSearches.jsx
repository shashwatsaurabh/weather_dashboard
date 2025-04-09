function RecentSearches({ searches, onSearchClick }) {
    return (
      <div className="recent-searches">
        <h3>Recent Searches</h3>
        <div className="search-tags">
          {searches.map((city, index) => (
            <button 
              key={index} 
              className="search-tag"
              onClick={() => onSearchClick(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default RecentSearches;
  