import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield, Building2, FileText, MessageSquare, Lock, Users } from 'lucide-react';

export default function Index() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-bold text-foreground">NeuroBridge</span>
          </div>
          <Button asChild>
            <a href="/auth">Sign In</a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-up">
            Private collaboration for neurodiverse education
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
            A secure, invite-only platform connecting schools and tutoring centres to support
            learner transitions and case handovers with complete data privacy.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Button size="xl" variant="hero" asChild>
              <a href="/auth">Access Platform</a>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Invite-only access • Institution-to-institution collaboration
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border bg-background py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
              Built for secure collaboration
            </h2>
            <p className="mt-4 text-muted-foreground">
              Purpose-built tools for neurodiverse education professionals to work together
              effectively while maintaining strict data privacy.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Building2 className="h-6 w-6" />,
                title: 'Institution Profiles',
                description:
                  'Verified profiles showcasing specialisations, capacity, and support needs covered by each institution.',
              },
              {
                icon: <FileText className="h-6 w-6" />,
                title: 'Case Handover',
                description:
                  'Structured learner transition workflows with permission-based access and complete audit trails.',
              },
              {
                icon: <MessageSquare className="h-6 w-6" />,
                title: 'Secure Messaging',
                description:
                  'Institution-to-institution messaging with case linking for contextual communication.',
              },
              {
                icon: <Lock className="h-6 w-6" />,
                title: 'POPIA Compliant',
                description:
                  'Privacy-conscious data handling designed to meet South African data protection requirements.',
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: 'Role-Based Access',
                description:
                  'Granular permissions ensuring users only see what they need for their role.',
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: 'Audit Logging',
                description:
                  'Complete activity logs for sensitive actions supporting compliance and accountability.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-lg font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-2xl bg-primary p-8 text-center shadow-lg sm:p-12">
            <h2 className="font-serif text-2xl font-semibold text-primary-foreground sm:text-3xl">
              Ready to collaborate?
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              NeuroBridge is an invite-only platform. Contact your institution administrator to
              request access.
            </p>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <a href="/auth">Sign In</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-serif font-semibold text-foreground">NeuroBridge</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 NeuroBridge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
