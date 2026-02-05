// User Roles
export type UserRole = 'super_admin' | 'school_admin' | 'tutor_centre_admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  institutionId?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

// Institution Types
export type InstitutionType = 'school' | 'tutor_centre';
export type VerificationStatus = 'pending' | 'verified' | 'suspended';

export interface Institution {
  id: string;
  name: string;
  type: InstitutionType;
  description: string;
  specialisations: string[];
  supportNeeds: string[];
  ageRange: { min: number; max: number };
  capacity: number;
  location: {
    city: string;
    province: string;
    country: string;
  };
  contactEmail: string;
  contactPhone?: string;
  verificationStatus: VerificationStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Learner Case
export type CaseStatus = 'draft' | 'pending_transfer' | 'in_review' | 'transferred' | 'closed';

export interface LearnerCase {
  id: string;
  referenceNumber: string;
  learnerInitials: string;
  dateOfBirth: Date;
  ageAtReferral: number;
  currentInstitutionId: string;
  targetInstitutionId?: string;
  status: CaseStatus;
  supportNeeds: string[];
  caseNotes: CaseNote[];
  history: CaseHistoryEntry[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseNote {
  id: string;
  caseId: string;
  authorId: string;
  authorName: string;
  content: string;
  isConfidential: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseHistoryEntry {
  id: string;
  caseId: string;
  institutionId: string;
  institutionName: string;
  action: string;
  performedBy: string;
  timestamp: Date;
}

// Messaging
export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  senderInstitutionId: string;
  content: string;
  linkedCaseId?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface MessageThread {
  id: string;
  participantInstitutionIds: string[];
  participantNames: string[];
  subject: string;
  linkedCaseId?: string;
  lastMessageAt: Date;
  unreadCount: number;
  createdAt: Date;
}

// Audit Log
export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resourceType: string;
  resourceId: string;
  details: Record<string, unknown>;
  ipAddress?: string;
  timestamp: Date;
}

// Search & Filtering
export interface InstitutionSearchFilters {
  query?: string;
  type?: InstitutionType;
  supportNeeds?: string[];
  province?: string;
  ageRangeMin?: number;
  ageRangeMax?: number;
  verificationStatus?: VerificationStatus;
}
