
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SchoolSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const SchoolSearch = ({ searchTerm, onSearchChange }: SchoolSearchProps) => {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search schools by name, city, or programs..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-4 py-2 w-full"
      />
    </div>
  );
};
