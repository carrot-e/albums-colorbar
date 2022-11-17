import React from 'react';

function Search({
  searchQuery,
  onChange,
}: {
  searchQuery: string;
  onChange: (q: string) => void;
}) {
  return (
    <div className="">
      <input
        className="rounded-md text-white bg-black bg-opacity-20 focus:bg-opacity-50 outline-0 pl-5 pr-2 py-2 w-full transition-colors placeholder:opacity-40"
        placeholder="Search title or artist"
        type="text"
        value={searchQuery}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default Search;
