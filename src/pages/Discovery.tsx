import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { InstitutionCard } from '@/components/cards/InstitutionCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, X, Building2 } from 'lucide-react';
import { Institution } from '@/types';

// Mock data
const mockInstitutions: Institution[] = [
  {
    id: 'inst-1',
    name: 'Oakwood Academy',
    type: 'school',
    description:
      'A specialised school focusing on learners with ADHD, dyslexia, and autism spectrum conditions. We provide individualised education plans and small class sizes.',
    specialisations: ['ADHD Support', 'Dyslexia Intervention', 'ASD Accommodation', 'Sensory Integration'],
    supportNeeds: ['ADHD', 'Dyslexia', 'ASD', 'Anxiety'],
    ageRange: { min: 6, max: 18 },
    capacity: 150,
    location: {
      city: 'Cape Town',
      province: 'Western Cape',
      country: 'South Africa',
    },
    contactEmail: 'admin@oakwood.edu',
    verificationStatus: 'verified',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2025-01-20'),
  },
  {
    id: 'inst-2',
    name: 'Bright Horizons Tutoring',
    type: 'tutor_centre',
    description:
      'One-on-one tutoring centre specialising in executive function coaching and academic support for neurodiverse learners.',
    specialisations: ['Executive Function', 'Academic Support', 'Study Skills', 'Math Intervention'],
    supportNeeds: ['ADHD', 'Executive Function', 'Learning Difficulties'],
    ageRange: { min: 8, max: 21 },
    capacity: 45,
    location: {
      city: 'Johannesburg',
      province: 'Gauteng',
      country: 'South Africa',
    },
    contactEmail: 'info@brighthorizons.edu',
    verificationStatus: 'verified',
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2025-01-18'),
  },
  {
    id: 'inst-3',
    name: 'Sunshine Learning Centre',
    type: 'tutor_centre',
    description:
      'Therapy-integrated learning centre offering speech therapy, occupational therapy, and educational support.',
    specialisations: ['Speech Therapy', 'OT Integration', 'Social Skills Groups', 'Sensory Support'],
    supportNeeds: ['Speech Delay', 'Motor Skills', 'ASD', 'Sensory Processing'],
    ageRange: { min: 3, max: 12 },
    capacity: 30,
    location: {
      city: 'Durban',
      province: 'KwaZulu-Natal',
      country: 'South Africa',
    },
    contactEmail: 'hello@sunshinelearning.edu',
    verificationStatus: 'pending',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2025-01-25'),
  },
  {
    id: 'inst-4',
    name: 'Pathway School for Special Education',
    type: 'school',
    description:
      'Full-service special education school with therapeutic support, life skills training, and vocational preparation.',
    specialisations: ['Life Skills', 'Vocational Training', 'Therapeutic Support', 'Transition Planning'],
    supportNeeds: ['Intellectual Disability', 'ASD', 'Multiple Disabilities'],
    ageRange: { min: 5, max: 21 },
    capacity: 200,
    location: {
      city: 'Pretoria',
      province: 'Gauteng',
      country: 'South Africa',
    },
    contactEmail: 'admissions@pathwayschool.edu',
    verificationStatus: 'verified',
    createdAt: new Date('2022-08-01'),
    updatedAt: new Date('2025-01-22'),
  },
];

const provinces = [
  'Western Cape',
  'Gauteng',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Free State',
  'Mpumalanga',
  'North West',
  'Limpopo',
  'Northern Cape',
];

const supportNeedsOptions = [
  'ADHD',
  'ASD',
  'Dyslexia',
  'Dyscalculia',
  'Anxiety',
  'Executive Function',
  'Speech Delay',
  'Motor Skills',
  'Sensory Processing',
  'Intellectual Disability',
];

export default function Discovery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [provinceFilter, setProvinceFilter] = useState<string>('all');
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  const filteredInstitutions = mockInstitutions.filter((inst) => {
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || inst.type === typeFilter;
    const matchesProvince =
      provinceFilter === 'all' || inst.location.province === provinceFilter;
    const matchesNeeds =
      selectedNeeds.length === 0 ||
      selectedNeeds.some((need) => inst.supportNeeds.includes(need));
    return matchesSearch && matchesType && matchesProvince && matchesNeeds;
  });

  const toggleNeed = (need: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setProvinceFilter('all');
    setSelectedNeeds([]);
  };

  const hasActiveFilters =
    searchQuery || typeFilter !== 'all' || provinceFilter !== 'all' || selectedNeeds.length > 0;

  return (
    <DashboardLayout>
      <PageHeader
        title="Discovery"
        description="Find and connect with institutions that match your learners' needs"
      />

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search institutions by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Building2 className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Institution type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="school">Schools</SelectItem>
              <SelectItem value="tutor_centre">Tutor Centres</SelectItem>
            </SelectContent>
          </Select>
          <Select value={provinceFilter} onValueChange={setProvinceFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Province" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Provinces</SelectItem>
              {provinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Support Needs Filter */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Support Needs:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {supportNeedsOptions.map((need) => (
              <button
                key={need}
                onClick={() => toggleNeed(need)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  selectedNeeds.includes(need)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {need}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="mr-1 h-4 w-4" />
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredInstitutions.length} of {mockInstitutions.length} institutions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredInstitutions.map((institution) => (
          <InstitutionCard key={institution.id} institution={institution} />
        ))}
      </div>

      {filteredInstitutions.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
          <Building2 className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="font-serif text-lg font-semibold text-foreground">No institutions found</h3>
          <p className="mt-1 text-muted-foreground">Try adjusting your search or filters</p>
          <Button variant="outline" className="mt-4" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
}
