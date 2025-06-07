// components/SearchBox.jsx
export default function SearchBox({
  search,
  setSearch,
  onSearch,
  onReset,
  selectedCategory,
  setSelectedCategory,
  categories,
}) {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 p-4">
      {/* Category Select */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
        <label htmlFor="category" className="text-gray-600 font-medium">
          Category:
        </label>
        <div className="relative w-full md:w-auto">
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none w-full h-[40px] pl-4 pr-10 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for products"
        value={search}
        className="w-full md:w-[250px] h-[40px] border border-gray-400 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />

      {/* Search Button */}
      <button
        onClick={onSearch}
        className="w-full md:w-[100px] h-[40px] bg-[var(--color-primary)] text-white rounded-md"
      >
        Search
      </button>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full md:w-[100px] h-[40px] bg-[var(--color-primary)] text-white rounded-md"
      >
        Reset
      </button>
    </div>
  );
}
