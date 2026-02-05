import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Lock, User, Building2, Shield, Globe } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <PageHeader title="Settings" description="Manage your account and preferences" />

      <div className="max-w-3xl space-y-8">
        {/* Profile Section */}
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-foreground">Profile</h2>
              <p className="text-sm text-muted-foreground">Your personal information</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={user?.email} disabled />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={user?.role.replace('_', ' ').toUpperCase()}
                disabled
                className="capitalize"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </section>

        {/* Security Section */}
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-foreground">Security</h2>
              <p className="text-sm text-muted-foreground">Manage your password and security settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button>Update Password</Button>
          </div>

          <Separator className="my-6" />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch />
          </div>
        </section>

        {/* Notifications Section */}
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-foreground">Notifications</h2>
              <p className="text-sm text-muted-foreground">Manage how you receive notifications</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Email Notifications',
                description: 'Receive email updates for important activities',
              },
              {
                title: 'Case Updates',
                description: 'Get notified when cases are updated or require action',
              },
              {
                title: 'New Messages',
                description: 'Receive alerts for new messages from institutions',
              },
              {
                title: 'Weekly Digest',
                description: 'Receive a weekly summary of platform activity',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </section>

        {/* Institution Section (for admins) */}
        {user?.institutionId && (
          <section className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-semibold text-foreground">Institution</h2>
                <p className="text-sm text-muted-foreground">Manage your institution's profile</p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Edit Institution Profile
            </Button>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
