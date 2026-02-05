import { Institution } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, MapPin, Users, Mail, ExternalLink } from 'lucide-react';

interface InstitutionCardProps {
  institution: Institution;
  onView?: (id: string) => void;
  onMessage?: (id: string) => void;
}

export function InstitutionCard({
  institution,
  onView,
  onMessage,
}: InstitutionCardProps) {
  const statusVariant = {
    pending: 'pending',
    verified: 'verified',
    suspended: 'suspended',
  } as const;

  return (
    <div className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-card-foreground">
              {institution.name}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {institution.location.city}, {institution.location.province}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={institution.type === 'school' ? 'school' : 'tutor'}>
            {institution.type === 'school' ? 'School' : 'Tutor Centre'}
          </Badge>
          <Badge variant={statusVariant[institution.verificationStatus]}>
            {institution.verificationStatus}
          </Badge>
        </div>
      </div>

      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
        {institution.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {institution.specialisations.slice(0, 3).map((spec) => (
          <Badge key={spec} variant="secondary" className="text-xs">
            {spec}
          </Badge>
        ))}
        {institution.specialisations.length > 3 && (
          <Badge variant="secondary" className="text-xs">
            +{institution.specialisations.length - 3} more
          </Badge>
        )}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>Capacity: {institution.capacity}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>Ages: {institution.ageRange.min}-{institution.ageRange.max}</span>
        </div>
      </div>

      <div className="flex gap-2 border-t border-border pt-4">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onView?.(institution.id)}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View Profile
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex-1"
          onClick={() => onMessage?.(institution.id)}
        >
          <Mail className="mr-2 h-4 w-4" />
          Message
        </Button>
      </div>
    </div>
  );
}
