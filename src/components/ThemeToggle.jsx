function ThemeToggle({ darkMode, toggleTheme }) {
    return (
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          // Moon icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.75 15.26a9 9 0 0 1-12.99-11.4 0.75 0.75 0 0 0-1.18-0.85A10.5 10.5 0 1 0 22.6 16.45a0.75 0.75 0 0 0-0.85-1.19z"/>
          </svg>
        ) : (
          // Sun icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFA500" viewBox="0 0 24 24">
            <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1zm10 10a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm15.07 7.07a1 1 0 0 1-1.41 0l-0.71-0.71a1 1 0 0 1 1.41-1.41l0.71 0.71a1 1 0 0 1 0 1.41zM6.05 6.05a1 1 0 0 1-1.41 0L3.93 5.34a1 1 0 1 1 1.41-1.41l0.71 0.71a1 1 0 0 1 0 1.41zm12.02 0a1 1 0 0 1 0-1.41l0.71-0.71a1 1 0 1 1 1.41 1.41l-0.71 0.71a1 1 0 0 1-1.41 0zM4.93 18.36a1 1 0 0 1 0-1.41l0.71-0.71a1 1 0 1 1 1.41 1.41l-0.71 0.71a1 1 0 0 1-1.41 0z"/>
          </svg>
        )}
      </button>
    );
  }
  
  export default ThemeToggle;
  