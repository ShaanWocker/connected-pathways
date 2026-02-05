import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { MessageThreadCard } from '@/components/cards/MessageThreadCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  Plus,
  Send,
  Paperclip,
  ArrowLeft,
  MessageSquare,
  X,
} from 'lucide-react';
import { MessageThread, Message } from '@/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock data
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
  {
    id: '3',
    participantInstitutionIds: ['inst-1', 'inst-4'],
    participantNames: ['Pathway School'],
    subject: 'Vocational program collaboration',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    unreadCount: 0,
    createdAt: new Date('2025-01-05'),
  },
  {
    id: '4',
    participantInstitutionIds: ['inst-1', 'inst-2'],
    participantNames: ['Bright Horizons Tutoring'],
    subject: 'Executive function coaching availability',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    unreadCount: 0,
    createdAt: new Date('2024-12-20'),
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    threadId: '1',
    senderId: 'user-2',
    senderName: 'Dr. Emily Chen',
    senderInstitutionId: 'inst-2',
    content:
      'Thank you for reaching out about JM\'s transition. We have reviewed the case notes and believe we can provide the support needed. When would be a good time for a video call to discuss further?',
    linkedCaseId: '1',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '2',
    threadId: '1',
    senderId: 'user-2',
    senderName: 'Dr. Emily Chen',
    senderInstitutionId: 'inst-2',
    content:
      'Also, I noticed the case mentions reading intervention needs. We have a specialist available on Tuesdays and Thursdays who could work with JM.',
    linkedCaseId: '1',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 25),
  },
  {
    id: '3',
    threadId: '1',
    senderId: 'user-1',
    senderName: 'James Peterson',
    senderInstitutionId: 'inst-1',
    content:
      'That sounds perfect. JM\'s parents have expressed a preference for afternoon sessions. Would 3pm on Tuesdays work for an initial assessment?',
    linkedCaseId: '1',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '4',
    threadId: '1',
    senderId: 'user-1',
    senderName: 'James Peterson',
    senderInstitutionId: 'inst-1',
    content:
      'I\'ve attached the latest IEP and assessment reports for your review. Please let me know if you need any additional documentation.',
    linkedCaseId: '1',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

export default function Messages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const filteredThreads = mockThreads.filter(
    (thread) =>
      thread.participantNames.some((name) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || thread.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedThread = mockThreads.find((t) => t.id === selectedThreadId);
  const threadMessages = mockMessages.filter((m) => m.threadId === selectedThreadId);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send the message
    setNewMessage('');
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-6rem)] flex-col">
        <PageHeader
          title="Messages"
          description="Secure communication with partner institutions"
          actions={
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          }
        />

        <div className="flex flex-1 gap-6 overflow-hidden">
          {/* Thread List */}
          <div
            className={cn(
              'flex w-full flex-col rounded-xl border border-border bg-card lg:w-96',
              selectedThreadId && 'hidden lg:flex'
            )}
          >
            <div className="border-b border-border p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-1 p-2">
                {filteredThreads.map((thread) => (
                  <MessageThreadCard
                    key={thread.id}
                    thread={thread}
                    onClick={setSelectedThreadId}
                  />
                ))}
                {filteredThreads.length === 0 && (
                  <div className="py-8 text-center text-muted-foreground">
                    No messages found
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Message View */}
          <div
            className={cn(
              'flex flex-1 flex-col rounded-xl border border-border bg-card',
              !selectedThreadId && 'hidden lg:flex'
            )}
          >
            {selectedThread ? (
              <>
                {/* Thread Header */}
                <div className="flex items-center gap-4 border-b border-border p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setSelectedThreadId(null)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">
                      {selectedThread.participantNames.join(', ')}
                    </h3>
                    <p className="text-sm text-muted-foreground">{selectedThread.subject}</p>
                  </div>
                  {selectedThread.linkedCaseId && (
                    <Badge variant="outline" className="gap-1">
                      <Paperclip className="h-3 w-3" />
                      Case #NB-2025-001
                    </Badge>
                  )}
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {threadMessages
                      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                      .map((message) => {
                        const isOwn = message.senderInstitutionId === 'inst-1';
                        return (
                          <div
                            key={message.id}
                            className={cn('flex', isOwn && 'justify-end')}
                          >
                            <div
                              className={cn(
                                'max-w-[80%] rounded-2xl px-4 py-3',
                                isOwn
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-foreground'
                              )}
                            >
                              {!isOwn && (
                                <p className="mb-1 text-xs font-medium opacity-70">
                                  {message.senderName}
                                </p>
                              )}
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={cn(
                                  'mt-1 text-xs',
                                  isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                )}
                              >
                                {format(message.createdAt, 'HH:mm')}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </ScrollArea>

                {/* Compose */}
                <div className="border-t border-border p-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[44px] resize-none"
                      rows={1}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
                <MessageSquare className="mb-4 h-12 w-12" />
                <p>Select a conversation to view messages</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
