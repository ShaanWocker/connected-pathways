import { MessageThread } from '@/types';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Paperclip } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface MessageThreadCardProps {
  thread: MessageThread;
  onClick?: (id: string) => void;
}

export function MessageThreadCard({ thread, onClick }: MessageThreadCardProps) {
  const hasUnread = thread.unreadCount > 0;

  return (
    <button
      onClick={() => onClick?.(thread.id)}
      className={cn(
        'w-full rounded-lg border border-border bg-card p-4 text-left transition-all hover:shadow-md',
        hasUnread && 'border-primary/30 bg-primary/5'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              hasUnread ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            )}
          >
            <MessageSquare className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4
                className={cn(
                  'truncate text-sm',
                  hasUnread ? 'font-semibold text-foreground' : 'font-medium text-foreground'
                )}
              >
                {thread.participantNames.join(', ')}
              </h4>
              {hasUnread && (
                <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs">
                  {thread.unreadCount}
                </Badge>
              )}
            </div>
            <p className="mt-0.5 truncate text-sm font-medium text-muted-foreground">
              {thread.subject}
            </p>
            {thread.linkedCaseId && (
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Paperclip className="h-3 w-3" />
                Linked to case
              </div>
            )}
          </div>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">
          {formatDistanceToNow(thread.lastMessageAt, { addSuffix: true })}
        </span>
      </div>
    </button>
  );
}
