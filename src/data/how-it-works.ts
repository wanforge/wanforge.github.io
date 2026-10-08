import type { IconName } from './features';

export interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: IconName;
}

export const howItWorksSteps: Step[] = [
  {
    id: 'step-1',
    number: '01',
    title: 'Connect Your Stack',
    description:
      'Integrate with your favorite tools in minutes. Our one-click setup gets you up and running without any complex configuration.',
    icon: 'Plug',
  },
  {
    id: 'step-2',
    number: '02',
    title: 'AI-Powered Analysis',
    description:
      'Our intelligent algorithms process your data in real-time, identifying patterns and opportunities that others miss.',
    icon: 'Sparkles',
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Automate Workflows',
    description:
      'Transform insights into action. Set up custom automation rules that handle the repetitive tasks, so you can focus on growth.',
    icon: 'Workflow',
  },
  {
    id: 'step-4',
    number: '04',
    title: 'Monitor & Scale',
    description:
      'Track your progress with beautiful dashboards. As your team grows, our platform scales with you automatically.',
    icon: 'Rocket',
  },
];
