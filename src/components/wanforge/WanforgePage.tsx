import React from 'react';
import {
  ArrowRight,
  Bot,
  Cloud,
  ExternalLink,
  Globe,
  MessageSquare,
  Shield,
  Terminal,
} from 'lucide-react';
import { type Locale, siteContent } from '@/data/wanforge';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

interface WanforgePageProps {
  locale: Locale;
}

const serviceIcons = [Globe, Cloud, Bot, Shield];

export function WanforgePage({ locale }: WanforgePageProps) {
  const content = siteContent[locale];
  const isId = locale === 'id';

  return (
    <div className="flex flex-col gap-12 lg:gap-20 pb-20">
      {/* Hero Section */}
      <Section padding="xl" className="pt-24 lg:pt-36">
        <Container size="default">
          <div className="max-w-4xl mx-auto text-center space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wide uppercase">
              <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Engineering &amp; Product Studio</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1]">
              {content.hero.title}
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {content.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href={content.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-primary-600 hover:bg-primary-500 active:bg-primary-700 rounded-xl shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>{content.primaryCta.label}</span>
              </a>

              <a
                href={content.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-text-primary bg-bg-secondary hover:bg-bg-tertiary border border-border-default rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              >
                <span>{content.secondaryCta.label}</span>
                <ExternalLink className="w-4 h-4 text-text-tertiary" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Section */}
      <Section id="services" padding="lg">
        <Container size="default">
          <div className="space-y-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary">
                {content.nav[0]}
              </h2>
              <p className="text-text-secondary mt-2 text-base">
                {isId
                  ? 'Fokus rekayasa perangkat lunak dan infrastruktur operasional kami.'
                  : 'Our core software engineering and operational infrastructure focus.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.services.map((service, index) => {
                const IconComponent = serviceIcons[index] ?? Globe;
                return (
                  <Card
                    key={service.title}
                    variant="outlined"
                    className="p-6 transition-all hover:border-primary-500/50 hover:shadow-sm"
                  >
                    <CardHeader className="p-0 space-y-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-600 dark:text-primary-400">
                        <IconComponent className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-xl font-bold text-text-primary">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-3">
                      <CardDescription className="text-sm text-text-secondary leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Capabilities Section */}
      <Section id="capabilities" padding="lg" background="muted">
        <Container size="default">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary">
              {content.nav[1]}
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              {content.capabilities}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-border-default bg-bg-primary space-y-2">
                <span className="text-sm font-semibold text-text-primary block">
                  {isId ? 'Sistem Klinis & ERP Koperasi' : 'Clinical & Cooperative ERP'}
                </span>
                <p className="text-xs text-text-secondary">
                  {isId
                    ? 'Rekam medis fisioterapi terintegrasi, bridging SIMRS, dan sistem manajemen koperasi multi-unit.'
                    : 'Integrated clinical record systems, hospital EMR bridging, and multi-unit cooperative management.'}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border-default bg-bg-primary space-y-2">
                <span className="text-sm font-semibold text-text-primary block">
                  {isId ? 'Portal Perusahaan & Compliance' : 'Corporate Portals & Compliance'}
                </span>
                <p className="text-xs text-text-secondary">
                  {isId
                    ? 'Website resmi perusahaan dengan verifikasi keabsahan hukum, sistem patroli terverifikasi, dan POS lokal.'
                    : 'Official corporate portals with verified legal compliance, checkpoint patrols, and offline-first POS.'}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border-default bg-bg-primary space-y-2">
                <span className="text-sm font-semibold text-text-primary block">
                  {isId ? 'DevOps & Server Deployment' : 'DevOps & Server Deployment'}
                </span>
                <p className="text-xs text-text-secondary">
                  {isId
                    ? 'Otomasi provisioning server Linux, pipeline CI/CD tanpa downtime, dan backup data terjadwal.'
                    : 'Automated Linux server provisioning, zero-downtime CI/CD pipelines, and scheduled backup engines.'}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border-default bg-bg-primary space-y-2">
                <span className="text-sm font-semibold text-text-primary block">
                  {isId ? 'AI Agents & MCP Ecosystem' : 'AI Agents & MCP Ecosystem'}
                </span>
                <p className="text-xs text-text-secondary">
                  {isId
                    ? 'Pengembangan custom Model Context Protocol servers dan agen otonom untuk percepatan rekayasa tim.'
                    : 'Custom Model Context Protocol servers and autonomous engineering agents built for production workflows.'}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section id="contact" padding="lg">
        <Container size="default">
          <div className="max-w-3xl rounded-2xl border border-border-default bg-bg-secondary p-8 sm:p-12 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary">
              {content.nav[2]}
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              {content.contact}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={content.primaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-primary-600 hover:bg-primary-500 rounded-xl shadow-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              >
                <span>{content.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={content.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-text-primary bg-bg-primary hover:bg-bg-tertiary border border-border-default rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              >
                <span>GitHub WanForge</span>
                <ExternalLink className="w-4 h-4 text-text-tertiary" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

export default WanforgePage;
