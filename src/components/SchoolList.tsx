import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSchools, School } from '@/hooks/useSchools';
import { Search, MapPin, ExternalLink } from 'lucide-react';

export function SchoolList() {
  const { schools, loading, error } = useSchools();
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="animate-pulse">Loading schools...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-red-500">Error loading schools: {error.message}</div>
        </CardContent>
      </Card>
    );
  }

  // Get unique cities for filter
  const cities = [...new Set(schools.map(school => school.city))].sort();

  // Filter schools based on search term and city filter
  const filteredSchools = schools.filter(school => {
    const matchesSearch = searchTerm === '' || 
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (school.description && school.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCity = cityFilter === '' || school.city === cityFilter;
    
    return matchesSearch && matchesCity;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search schools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md md:w-48"
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      
      {filteredSchools.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-gray-500">No schools found matching your criteria.</div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <SchoolCard key={school.id} school={school} />
          ))}
        </div>
      )}
    </div>
  );
}

function SchoolCard({ school }: { school: School }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{school.name}</CardTitle>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          {school.city}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-gray-600 mb-4 flex-1">
          {school.description || 'No description available.'}
        </p>
        
        {school.programs && school.programs.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Programs:</h4>
            <div className="flex flex-wrap gap-1">
              {school.programs.slice(0, 3).map((program, index) => (
                <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {program}
                </span>
              ))}
              {school.programs.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                  +{school.programs.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {school.website && (
          <Button variant="outline" size="sm" asChild className="mt-auto">
            <a href={school.website} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Website
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}