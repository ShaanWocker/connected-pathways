import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { CaseCard } from '@/components/cards/CaseCard';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, FileText, ArrowUpDown } from 'lucide-react';
import { LearnerCase, CaseStatus } from '@/types';

// Mock data
const mockCases: LearnerCase[] = [
  {
    id: '1',
    referenceNumber: 'NB-2025-001',
    learnerInitials: 'JM',
    dateOfBirth: new Date('2012-05-15'),
    ageAtReferral: 12,
    currentInstitutionId: 'inst-1',
    targetInstitutionId: 'inst-2',
    status: 'pending_transfer',
    supportNeeds: ['ADHD Support', 'Reading Intervention', 'Social Skills'],
    caseNotes: [],
    history: [],
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-02-01'),
  },
  {
    id: '2',
    referenceNumber: 'NB-2025-002',
    learnerInitials: 'SK',
    dateOfBirth: new Date('2010-11-20'),
    ageAtReferral: 14,
    currentInstitutionId: 'inst-1',
    status: 'in_review',
    supportNeeds: ['ASD Accommodation', 'Sensory Support', 'Executive Function'],
    caseNotes: [],
    history: [],
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-28'),
  },
  {
    id: '3',
    referenceNumber: 'NB-2025-003',
    learnerInitials: 'AB',
    dateOfBirth: new Date('2014-03-08'),
    ageAtReferral: 10,
    currentInstitutionId: 'inst-1',
    status: 'draft',
    supportNeeds: ['Dyslexia Intervention', 'Writing Support'],
    caseNotes: [],
    history: [],
    createdAt: new Date('2025-01-20'),
    updatedAt: new Date('2025-01-20'),
  },
  {
    id: '4',
    referenceNumber: 'NB-2024-089',
    learnerInitials: 'TW',
    dateOfBirth: new Date('2011-07-22'),
    ageAtReferral: 13,
    currentInstitutionId: 'inst-1',
    targetInstitutionId: 'inst-3',
    status: 'transferred',
    supportNeeds: ['Speech Therapy', 'Social Skills', 'Anxiety Management'],
    caseNotes: [],
    history: [],
    createdAt: new Date('2024-10-05'),
    updatedAt: new Date('2024-12-15'),
  },
  {
    id: '5',
    referenceNumber: 'NB-2024-076',
    learnerInitials: 'LR',
    dateOfBirth: new Date('2009-12-01'),
    ageAtReferral: 15,
    currentInstitutionId: 'inst-1',
    targetInstitutionId: 'inst-4',
    status: 'closed',
    supportNeeds: ['Vocational Prep', 'Life Skills', 'Transition Support'],
    caseNotes: [],
    history: [],
    createdAt: new Date('2024-08-20'),
    updatedAt: new Date('2024-11-30'),
  },
];

const institutionNames: Record<string, string> = {
  'inst-1': 'Oakwood Academy',
  'inst-2': 'Bright Horizons Tutoring',
  'inst-3': 'Sunshine Learning Centre',
  'inst-4': 'Pathway School',
};

type TabValue = 'all' | CaseStatus;

const statusTabs: { value: TabValue; label: string; count: number }[] = [
  { value: 'all', label: 'All Cases', count: mockCases.length },
  { value: 'draft', label: 'Drafts', count: mockCases.filter((c) => c.status === 'draft').length },
  {
    value: 'pending_transfer',
    label: 'Pending',
    count: mockCases.filter((c) => c.status === 'pending_transfer').length,
  },
  {
    value: 'in_review',
    label: 'In Review',
    count: mockCases.filter((c) => c.status === 'in_review').length,
  },
  {
    value: 'transferred',
    label: 'Transferred',
    count: mockCases.filter((c) => c.status === 'transferred').length,
  },
  { value: 'closed', label: 'Closed', count: mockCases.filter((c) => c.status === 'closed').length },
];

export default function LearnerCases() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const [sortBy, setSortBy] = useState<string>('updated');

  const filteredCases = mockCases
    .filter((c) => {
      const matchesSearch =
        c.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.learnerInitials.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.supportNeeds.some((need) => need.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTab = activeTab === 'all' || c.status === activeTab;
      return matchesSearch && matchesTab;
    })
    .sort((a, b) => {
      if (sortBy === 'updated') {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      }
      if (sortBy === 'created') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return a.referenceNumber.localeCompare(b.referenceNumber);
    });

  return (
    <DashboardLayout>
      <PageHeader
        title="Learner Cases"
        description="Manage learner transitions and case handovers"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        }
      />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)} className="mb-6">
        <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
          {statusTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-full border border-transparent bg-secondary px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {tab.label}
              <Badge
                variant="secondary"
                className="ml-2 h-5 min-w-5 bg-background/50 px-1.5 text-xs"
              >
                {tab.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Search and Sort */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by reference, initials, or support needs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated">Last Updated</SelectItem>
            <SelectItem value="created">Date Created</SelectItem>
            <SelectItem value="reference">Reference Number</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filteredCases.map((learnerCase) => (
          <CaseCard
            key={learnerCase.id}
            learnerCase={learnerCase}
            institutionNames={{
              current: institutionNames[learnerCase.currentInstitutionId],
              target: learnerCase.targetInstitutionId
                ? institutionNames[learnerCase.targetInstitutionId]
                : undefined,
            }}
          />
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16">
          <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="font-serif text-lg font-semibold text-foreground">No cases found</h3>
          <p className="mt-1 text-muted-foreground">
            {searchQuery ? 'Try adjusting your search' : 'Create your first case to get started'}
          </p>
          <Button className="mt-4">
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
}
