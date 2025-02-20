'use client';

export default function Filters() {
  return (
    <div className="flex gap-2">
      <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
        <option value="">All Departments</option>
        <option value="engineering">Engineering</option>
        <option value="marketing">Marketing</option>
        <option value="sales">Sales</option>
      </select>
      <select className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}
