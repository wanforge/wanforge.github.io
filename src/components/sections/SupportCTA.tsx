import React from 'react';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import { ROUTES } from '@/config/paths';

export const SupportCTA: React.FC = () => {
  return (
    <Section padding="lg">
      <Container>
        <div className="bg-primary-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Still need help?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Our support team is here to help you with any questions or issues you might have. We
              usually respond in less than 2 hours.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a
                href={ROUTES.CONTACT}
                className="flex flex-col items-center p-6 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
              >
                <MessageSquare className="h-8 w-8 mb-4" />
                <span className="font-bold">Live Chat</span>
                <span className="text-sm">Available 24/7</span>
              </a>

              <a
                href={`mailto:support@modernsaas.dev`}
                className="flex flex-col items-center p-6 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
              >
                <Mail className="h-8 w-8 mb-4" />
                <span className="font-bold">Email Us</span>
                <span className="text-sm">support@modernsaas.dev</span>
              </a>

              <a
                href="tel:+15551234567"
                className="flex flex-col items-center p-6 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
              >
                <Phone className="h-8 w-8 mb-4" />
                <span className="font-bold">Call Us</span>
                <span className="text-sm">+1 (555) 123-4567</span>
              </a>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl"></div>
        </div>
      </Container>
    </Section>
  );
};
