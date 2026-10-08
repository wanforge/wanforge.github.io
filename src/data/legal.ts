/**
 * Legal Data
 *
 * Centralized data for Terms of Service and Privacy Policy pages.
 */

export interface LegalSection {
  id: string;
  title: string;
  content: string;
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const termsData: LegalDocument = {
  title: 'Terms of Service',
  lastUpdated: 'February 10, 2026',
  sections: [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      content: `By accessing or using the ModernSaaS platform, website, or services (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service. These Terms constitute a legally binding agreement between you and ModernSaaS Inc.`,
    },
    {
      id: 'usage',
      title: '2. Use of Service',
      content: `ModernSaaS grants you a limited, non-exclusive, non-transferable, revocable license to use the Service for your internal business purposes, subject to these Terms. You agree not to: (a) modify, disassemble, decompile, or reverse engineer the Service; (b) use the Service for any unlawful purpose; (c) interfere with or disrupt the integrity or performance of the Service; or (d) attempt to gain unauthorized access to the Service or its related systems.`,
    },
    {
      id: 'accounts',
      title: '3. User Accounts',
      content: `To access certain features of the Service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify ModernSaaS immediately of any unauthorized use of your account.`,
    },
    {
      id: 'intellectual-property',
      title: '4. Intellectual Property',
      content: `The Service and its original content, features, and functionality are and will remain the exclusive property of ModernSaaS and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ModernSaaS. Any feedback, comments, or suggestions you may provide regarding the Service is entirely voluntary and we will be free to use such feedback as we see fit and without any obligation to you.`,
    },
    {
      id: 'termination',
      title: '5. Termination',
      content: `We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.`,
    },
    {
      id: 'liability',
      title: '6. Limitation of Liability',
      content: `In no event shall ModernSaaS, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the Service; (b) any conduct or content of any third party on the Service; (c) any content obtained from the Service; and (d) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.`,
    },
    {
      id: 'governing-law',
      title: '7. Governing Law',
      content: `These Terms shall be governed and construed in accordance with the laws of Delaware, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.`,
    },
    {
      id: 'changes',
      title: '8. Changes to Terms',
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.`,
    },
  ],
};

export const privacyData: LegalDocument = {
  title: 'Privacy Policy',
  lastUpdated: 'February 10, 2026',
  sections: [
    {
      id: 'collection',
      title: '1. Information We Collect',
      content: `We collect information that you provide directly to us when you create an account, use the Service, or communicate with us. This may include your name, email address, company name, and payment information. We also automatically collect certain information when you use the Service, such as your IP address, browser type, and usage data.`,
    },
    {
      id: 'usage',
      title: '2. How We Use Information',
      content: `We use the information we collect to provide, maintain, and improve the Service, to process transactions, to communicate with you, and to protect ModernSaaS and our users. We may also use information to personalize your experience and to provide you with information about our products and services.`,
    },
    {
      id: 'sharing',
      title: '3. Information Sharing',
      content: `We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with service providers who perform services on our behalf, in response to a request for information if we believe disclosure is in accordance with any applicable law, or with your consent.`,
    },
    {
      id: 'security',
      title: '4. Data Security',
      content: `We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. However, no security system is impenetrable and we cannot guarantee the security of our data.`,
    },
    {
      id: 'cookies',
      title: '5. Cookies',
      content: `We use cookies and similar technologies to provide and support the Service and each of the uses outlined in this policy. You can control the use of cookies at the individual browser level, but if you choose to disable cookies, it may limit your use of certain features or functions on the Service.`,
    },
    {
      id: 'choices',
      title: '6. Your Choices',
      content: `You may update, correct, or delete information about you at any time by logging into your account or contacting us. You may also opt out of receiving promotional communications from us by following the instructions in those communications.`,
    },
    {
      id: 'changes',
      title: '7. Changes to Policy',
      content: `We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.`,
    },
  ],
};
