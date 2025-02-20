'use client';

export default function SearchBar() {
  return (
    <div className="w-full sm:w-96">
      <input
        type="search"
        placeholder="Search employees by name or email..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
