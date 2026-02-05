import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { InstitutionCard } from '@/components/cards/InstitutionCard';
import { StatsCard } from '@/components/cards/StatsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import {
  Search,
  Plus,
  Building2,
  CheckCircle,
  Clock,
  XCircle,
  MoreHorizontal,
} from 'lucide-react';
import { Institution, VerificationStatus } from '@/types';
import { useState } from 'react';

// Mock data
const mockInstitutions: Institution[] = [
  {
    id: 'inst-1',
    name: 'Oakwood Academy',
    type: 'school',
    description: 'A specialised school focusing on learners with ADHD, dyslexia, and autism spectrum conditions.',
    specialisations: ['ADHD Support', 'Dyslexia Intervention', 'ASD Accommodation'],
    supportNeeds: ['ADHD', 'Dyslexia', 'ASD'],
    ageRange: { min: 6, max: 18 },
    capacity: 150,
    location: { city: 'Cape Town', province: 'Western Cape', country: 'South Africa' },
    contactEmail: 'admin@oakwood.edu',
    verificationStatus: 'verified',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2025-01-20'),
  },
  {
    id: 'inst-2',
    name: 'Bright Horizons Tutoring',
    type: 'tutor_centre',
    description: 'One-on-one tutoring centre specialising in executive function coaching.',
    specialisations: ['Executive Function', 'Academic Support', 'Study Skills'],
    supportNeeds: ['ADHD', 'Executive Function'],
    ageRange: { min: 8, max: 21 },
    capacity: 45,
    location: { city: 'Johannesburg', province: 'Gauteng', country: 'South Africa' },
    contactEmail: 'info@brighthorizons.edu',
    verificationStatus: 'verified',
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2025-01-18'),
  },
  {
    id: 'inst-3',
    name: 'Sunshine Learning Centre',
    type: 'tutor_centre',
    description: 'Therapy-integrated learning centre offering speech therapy and occupational therapy.',
    specialisations: ['Speech Therapy', 'OT Integration', 'Social Skills Groups'],
    supportNeeds: ['Speech Delay', 'Motor Skills', 'ASD'],
    ageRange: { min: 3, max: 12 },
    capacity: 30,
    location: { city: 'Durban', province: 'KwaZulu-Natal', country: 'South Africa' },
    contactEmail: 'hello@sunshinelearning.edu',
    verificationStatus: 'pending',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2025-01-25'),
  },
  {
    id: 'inst-4',
    name: 'New Horizons Special School',
    type: 'school',
    description: 'Recently registered special education school awaiting verification.',
    specialisations: ['Life Skills', 'Vocational Training'],
    supportNeeds: ['Intellectual Disability', 'ASD'],
    ageRange: { min: 5, max: 21 },
    capacity: 100,
    location: { city: 'Pretoria', province: 'Gauteng', country: 'South Africa' },
    contactEmail: 'admin@newhorizons.edu',
    verificationStatus: 'pending',
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15'),
  },
];

type TabValue = 'all' | VerificationStatus;

export default function Institutions() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabValue>('all');

  const isSuperAdmin = user?.role === 'super_admin';

  const counts = {
    all: mockInstitutions.length,
    verified: mockInstitutions.filter((i) => i.verificationStatus === 'verified').length,
    pending: mockInstitutions.filter((i) => i.verificationStatus === 'pending').length,
    suspended: mockInstitutions.filter((i) => i.verificationStatus === 'suspended').length,
  };

  const filteredInstitutions = mockInstitutions.filter((inst) => {
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.location.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || inst.verificationStatus === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <DashboardLayout>
      <PageHeader
        title="Institutions"
        description={isSuperAdmin ? 'Manage and verify platform institutions' : 'View your institution profile'}
        actions={
          isSuperAdmin && (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Invite Institution
            </Button>
          )
        }
      />

      {/* Stats for Super Admin */}
      {isSuperAdmin && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Institutions"
            value={counts.all}
            icon={<Building2 className="h-6 w-6" />}
          />
          <StatsCard
            title="Verified"
            value={counts.verified}
            icon={<CheckCircle className="h-6 w-6" />}
          />
          <StatsCard
            title="Pending Verification"
            value={counts.pending}
            icon={<Clock className="h-6 w-6" />}
          />
          <StatsCard
            title="Suspended"
            value={counts.suspended}
            icon={<XCircle className="h-6 w-6" />}
          />
        </div>
      )}

      {/* Tabs and Search */}
      {isSuperAdmin && (
        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList className="h-auto bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="rounded-full border border-transparent bg-secondary px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  All
                  <Badge variant="secondary" className="ml-2 bg-background/50">
                    {counts.all}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="rounded-full border border-transparent bg-secondary px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Pending
                  <Badge variant="secondary" className="ml-2 bg-background/50">
                    {counts.pending}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger
                  value="verified"
                  className="rounded-full border border-transparent bg-secondary px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Verified
                  <Badge variant="secondary" className="ml-2 bg-background/50">
                    {counts.verified}
                  </Badge>
                </TabsTrigger>
              </TabsList>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search institutions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </Tabs>
        </div>
      )}

      {/* Institution Grid */}
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
        </div>
      )}
    </DashboardLayout>
  );
}
