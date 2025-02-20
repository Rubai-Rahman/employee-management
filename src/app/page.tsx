import EmployeeCardView from '@/components/employee/EmployeeCardView';
import Filters from '@/components/shared/Filters';
import SearchBar from '@/components/shared/SearchBar';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <SearchBar />
        <Filters />
      </div>
      <EmployeeCardView />
    </div>
  );
}
