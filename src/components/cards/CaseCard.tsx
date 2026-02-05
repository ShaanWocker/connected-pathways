import { LearnerCase } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface CaseCardProps {
  learnerCase: LearnerCase;
  institutionNames?: { current: string; target?: string };
  onView?: (id: string) => void;
}

const statusConfig = {
  draft: { variant: 'secondary' as const, label: 'Draft' },
  pending_transfer: { variant: 'warning' as const, label: 'Pending Transfer' },
  in_review: { variant: 'info' as const, label: 'In Review' },
  transferred: { variant: 'success' as const, label: 'Transferred' },
  closed: { variant: 'secondary' as const, label: 'Closed' },
};

export function CaseCard({ learnerCase, institutionNames, onView }: CaseCardProps) {
  const status = statusConfig[learnerCase.status];

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-card-foreground">
              Case #{learnerCase.referenceNumber}
            </h3>
            <p className="text-sm text-muted-foreground">
              Learner: {learnerCase.learnerInitials} • Age {learnerCase.ageAtReferral}
            </p>
          </div>
        </div>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>

      {institutionNames && (
        <div className="mb-4 flex items-center gap-2 text-sm">
          <span className="font-medium text-foreground">
            {institutionNames.current}
          </span>
          {institutionNames.target && (
            <>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">
                {institutionNames.target}
              </span>
            </>
          )}
        </div>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {learnerCase.supportNeeds.slice(0, 4).map((need) => (
          <Badge key={need} variant="outline" className="text-xs">
            {need}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Updated {format(learnerCase.updatedAt, 'dd MMM yyyy')}
        </div>
        <Button variant="outline" size="sm" onClick={() => onView?.(learnerCase.id)}>
          View Details
        </Button>
      </div>
    </div>
  );
}
