import EmployeeTableView from '@/components/EmployeeTableView';
import Filters from '@/components/Filters';
import SearchBar from '@/components/SearchBar';

export default function TablePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <SearchBar />
        <Filters />
      </div>
      <EmployeeTableView />
    </div>
  );
}
