import React from 'react';

function Search({
  searchQuery,
  onChange,
}: {
  searchQuery: string;
  onChange: (q: string) => void;
}) {
  return (
    <input
      className="text-white bg-transparent text-xl italic outline-0 pl-5 pr-2 py-2 my-5 w-full transition-colors placeholder:opacity-40 text-center"
      placeholder="Search"
      type="text"
      value={searchQuery}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default Search;
