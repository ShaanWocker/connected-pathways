import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatsCard } from '@/components/cards/StatsCard';
import { CaseCard } from '@/components/cards/CaseCard';
import { MessageThreadCard } from '@/components/cards/MessageThreadCard';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Users,
  FileText,
  MessageSquare,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { LearnerCase, MessageThread } from '@/types';

// Mock data
const mockRecentCases: LearnerCase[] = [
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
];

const mockThreads: MessageThread[] = [
  {
    id: '1',
    participantInstitutionIds: ['inst-1', 'inst-2'],
    participantNames: ['Bright Horizons Tutoring'],
    subject: 'Re: Transition support for JM',
    linkedCaseId: '1',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 2,
    createdAt: new Date('2025-01-10'),
  },
  {
    id: '2',
    participantInstitutionIds: ['inst-1', 'inst-3'],
    participantNames: ['Sunshine Learning Centre'],
    subject: 'Partnership inquiry - Special needs programs',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    unreadCount: 0,
    createdAt: new Date('2025-01-08'),
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  const roleLabels = {
    super_admin: 'Platform Overview',
    school_admin: 'School Dashboard',
    tutor_centre_admin: 'Centre Dashboard',
  };

  const getStatsForRole = () => {
    if (user?.role === 'super_admin') {
      return [
        {
          title: 'Total Institutions',
          value: 24,
          icon: <Building2 className="h-6 w-6" />,
          trend: { value: 12, isPositive: true },
        },
        {
          title: 'Active Users',
          value: 156,
          icon: <Users className="h-6 w-6" />,
          trend: { value: 8, isPositive: true },
        },
        {
          title: 'Total Cases',
          value: 342,
          icon: <FileText className="h-6 w-6" />,
          description: '28 pending transfer',
        },
        {
          title: 'Messages This Month',
          value: 1247,
          icon: <MessageSquare className="h-6 w-6" />,
          trend: { value: 15, isPositive: true },
        },
      ];
    }

    return [
      {
        title: 'Active Cases',
        value: 18,
        icon: <FileText className="h-6 w-6" />,
        description: '3 pending transfer',
      },
      {
        title: 'Cases Completed',
        value: 45,
        icon: <CheckCircle2 className="h-6 w-6" />,
        trend: { value: 23, isPositive: true },
      },
      {
        title: 'Pending Reviews',
        value: 5,
        icon: <Clock className="h-6 w-6" />,
        description: 'Awaiting response',
      },
      {
        title: 'Partner Institutions',
        value: 12,
        icon: <Building2 className="h-6 w-6" />,
        trend: { value: 2, isPositive: true },
      },
    ];
  };

  return (
    <DashboardLayout>
      <PageHeader
        title={roleLabels[user?.role || 'school_admin']}
        description={`Welcome back, ${user?.name}`}
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Case
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {getStatsForRole().map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Cases */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-foreground">Recent Cases</h2>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>
          <div className="space-y-4">
            {mockRecentCases.map((learnerCase) => (
              <CaseCard
                key={learnerCase.id}
                learnerCase={learnerCase}
                institutionNames={{
                  current: 'Oakwood Academy',
                  target:
                    learnerCase.targetInstitutionId
                      ? 'Bright Horizons Tutoring'
                      : undefined,
                }}
              />
            ))}
          </div>
        </div>

        {/* Messages */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-foreground">Messages</h2>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>
          <div className="space-y-2">
            {mockThreads.map((thread) => (
              <MessageThreadCard key={thread.id} thread={thread} />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 rounded-xl border border-border bg-card p-4">
            <h3 className="mb-3 font-medium text-foreground">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Start new case
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                New message
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                View reports
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
