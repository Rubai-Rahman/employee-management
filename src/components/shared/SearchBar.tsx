import { Input } from '../ui/input';

interface SearchBarProps {
  onSearch: (value: string) => void;
  value: string; // Add value to make the input controlled
}

export default function SearchBar({ onSearch, value }: SearchBarProps) {
  return (
    <div className="w-full rounded-md sm:w-96">
      <Input
        type="search"
        className="bg-secondary text-secondary-foreground"
        placeholder="Search employees by name or email..."
        value={value} // Control the input value here
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
