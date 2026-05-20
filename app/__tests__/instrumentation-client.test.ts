import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('instrumentation-client', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('does not throw when performance.mark is unavailable', async () => {
    vi.stubGlobal('performance', {} as Performance);

    await expect(import('../../instrumentation-client')).resolves.toBeDefined();
  });

  it('marks app init once when module executes', async () => {
    const markSpy = vi.fn();
    vi.stubGlobal('performance', {
      ...(globalThis.performance ?? {}),
      mark: markSpy,
    } as Performance);

    await import('../../instrumentation-client');

    expect(markSpy).toHaveBeenCalledTimes(1);
    expect(markSpy).toHaveBeenCalledWith('lapierre:app-init');
  });
});
