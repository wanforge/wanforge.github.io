export type Locale = 'id' | 'en';

export const siteContent = {
  id: {
    nav: ['Layanan', 'Kapabilitas', 'Kontak'],
    primaryCta: { label: 'Mulai diskusi', href: 'https://wa.me/62816658056' },
    secondaryCta: { label: 'GitHub', href: 'https://github.com/wanforge' },
    hero: {
      title: 'Sistem digital yang siap bekerja.',
      description:
        'WANFORGE merancang produk web, aplikasi, infrastruktur, otomasi, dan sistem terintegrasi untuk kebutuhan operasional yang nyata.',
    },
    services: [
      {
        title: 'Web & Aplikasi',
        description: 'Platform web, dashboard operasional, dan aplikasi yang mudah dipakai.',
      },
      {
        title: 'Cloud & DevOps',
        description: 'Deployment yang dapat diulang, server terkelola, dan alur rilis yang rapi.',
      },
      {
        title: 'AI & Otomasi',
        description:
          'Sistem AI, MCP tooling, integrasi API, dan workflow untuk mengurangi kerja berulang.',
      },
      {
        title: 'IoT & Security',
        description: 'Integrasi perangkat, telemetry, dan asesmen keamanan yang berizin.',
      },
    ],
    capabilities: 'Dari kebutuhan operasional hingga sistem yang dapat dijalankan tim.',
    contact:
      'Kirim tujuan proyek, batasan, dan perkiraan jadwal. Kami balas dengan langkah teknis yang jelas.',
    footer: 'WANFORGE — Engineering & Product Studio.',
  },
  en: {
    nav: ['Services', 'Capabilities', 'Contact'],
    primaryCta: { label: 'Start a conversation', href: 'https://wa.me/62816658056' },
    secondaryCta: { label: 'GitHub', href: 'https://github.com/wanforge' },
    hero: {
      title: 'Digital systems ready to work.',
      description:
        'WANFORGE builds web products, applications, infrastructure, automation, and integrated systems for real operational needs.',
    },
    services: [
      {
        title: 'Web & Applications',
        description:
          'Web platforms, operational dashboards, and applications people can use.',
      },
      {
        title: 'Cloud & DevOps',
        description:
          'Repeatable deployment, managed servers, and disciplined release workflows.',
      },
      {
        title: 'AI & Automation',
        description:
          'AI systems, MCP tooling, API integrations, and workflows that remove repetitive work.',
      },
      {
        title: 'IoT & Security',
        description: 'Device integration, telemetry, and authorized security assessments.',
      },
    ],
    capabilities: 'From operational requirements to systems teams can run.',
    contact:
      'Send project goals, constraints, and expected timeline. We will reply with clear technical next steps.',
    footer: 'WANFORGE — Engineering & Product Studio.',
  },
} as const;

export interface WanforgeFaqItem {
  question: string;
  answer: string;
}

export const wanforgeFaqs: Record<Locale, WanforgeFaqItem[]> = {
  id: [
    {
      question: 'Apa spesialisasi layanan rekayasa WANFORGE?',
      answer:
        'WANFORGE berfokus pada pengembangan sistem web operasional (portal resmi perusahaan, SIMRS klinis, koperasi ERP), deployment server Linux & DevOps, serta ekosistem AI tools (MCP servers dan alur kerja otomatis).',
    },
    {
      question: 'Bagaimana model kolaborasi dan kerja sama yang disediakan?',
      answer:
        'Kami melayani proyek baru dari tahap analisis arsitektur hingga deployment produksi, audit & perbaikan sistem berjalan, serta perjanjian pemeliharaan operasional (SLA) jangka panjang.',
    },
    {
      question: 'Apakah sistem yang dibangun aman dan menjamin privasi data?',
      answer:
        'Ya, seluruh sistem dirancang dengan prinsip least-privilege, perlindungan data terenkripsi, validasi input ketat, serta standar kepatuhan regulasi institusi dan perusahaan.',
    },
    {
      question: 'Bagaimana cara memulai konsultasi kebutuhan sistem?',
      answer:
        'Anda dapat menghubungi kami langsung melalui tombol WhatsApp atau email dengan melampirkan tujuan proyek, batasan operasional, dan perkiraan jadwal.',
    },
  ],
  en: [
    {
      question: 'What does WANFORGE specialize in?',
      answer:
        'WANFORGE specializes in operational web systems (corporate compliance portals, clinical EMRs, cooperative ERPs), Linux server DevOps, and AI tooling ecosystems (custom MCP servers and automation workflows).',
    },
    {
      question: 'What collaboration and engagement models are available?',
      answer:
        'We handle greenfield projects from architectural discovery to production release, audits of existing infrastructure, and long-term operational maintenance SLAs.',
    },
    {
      question: 'How do you ensure security and data confidentiality?',
      answer:
        'Every system implements least-privilege access controls, encrypted transport and storage, rigorous input sanitization, and enterprise security compliance.',
    },
    {
      question: 'How can we initiate a technical consultation?',
      answer:
        'Reach out directly via WhatsApp or email with your system goals, constraints, and target timeline. We will respond with actionable technical next steps.',
    },
  ],
};
