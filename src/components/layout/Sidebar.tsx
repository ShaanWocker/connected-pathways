import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Building2,
  Search,
  FileText,
  MessageSquare,
  Settings,
  Shield,
  LogOut,
  Users,
  ClipboardList,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: 'Institutions',
    href: '/institutions',
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    label: 'Discovery',
    href: '/discovery',
    icon: <Search className="h-5 w-5" />,
  },
  {
    label: 'Learner Cases',
    href: '/cases',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    label: 'User Management',
    href: '/users',
    icon: <Users className="h-5 w-5" />,
    roles: ['super_admin'],
  },
  {
    label: 'Audit Logs',
    href: '/audit',
    icon: <ClipboardList className="h-5 w-5" />,
    roles: ['super_admin'],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  );

  const displayName = user?.name ?? user?.email ?? 'User';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('');
  const roleLabel = user?.role?.replace('_', ' ') ?? 'Pending';

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <Shield className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-semibold text-sidebar-foreground">
              NeuroBridge
            </h1>
            <p className="text-xs text-sidebar-foreground/60">Collaboration Platform</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t border-sidebar-border p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-primary">
              {initials}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                {displayName}
              </p>
              <p className="truncate text-xs text-sidebar-foreground/60">
                {roleLabel}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </aside>
  );
}
