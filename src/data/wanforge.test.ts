import { describe, expect, it } from 'vitest';
import { siteContent } from './wanforge';

describe('siteContent', () => {
  it('has equivalent Indonesian and English service sets', () => {
    expect(siteContent.id.services).toHaveLength(4);
    expect(siteContent.en.services).toHaveLength(4);
    expect(siteContent.id.primaryCta.href).toBe('https://wa.me/62816658056');
    expect(siteContent.en.secondaryCta.href).toBe('https://github.com/wanforge');
  });
});
