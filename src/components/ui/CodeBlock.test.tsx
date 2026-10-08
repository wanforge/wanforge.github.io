import { beforeEach, describe, expect, it, vi } from 'vitest';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CodeBlock } from './CodeBlock';

// Mock shiki
vi.mock('shiki', () => ({
  createHighlighter: vi.fn().mockResolvedValue({
    codeToHtml: vi.fn().mockReturnValue('<pre class="shiki"><code>Highlighted Code</code></pre>'),
  }),
}));

// Mock clipboard
const mockClipboard = {
  writeText: vi.fn().mockResolvedValue(undefined),
};
Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true,
});

describe('CodeBlock', () => {
  const defaultProps = {
    code: 'const x = 1;',
    language: 'typescript',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default props', async () => {
    render(<CodeBlock {...defaultProps} />);

    // Should show loading state initially
    expect(screen.getByRole('button', { name: /copy code/i })).toBeInTheDocument();

    // Wait for highlighting to complete
    await waitFor(() => {
      expect(screen.queryByText('Highlighted Code')).toBeInTheDocument();
    });
  });

  it('shows filename when provided', async () => {
    render(<CodeBlock {...defaultProps} filename="test.ts" />);

    await waitFor(() => {
      expect(screen.getByText('test.ts')).toBeInTheDocument();
    });
  });

  it('shows language when filename is not provided', async () => {
    render(<CodeBlock {...defaultProps} language="javascript" />);

    await waitFor(() => {
      expect(screen.getByText('javascript')).toBeInTheDocument();
    });
  });

  it('copies code to clipboard when copy button is clicked', async () => {
    render(<CodeBlock {...defaultProps} />);

    // Wait for initial load to avoid act warnings during click
    await waitFor(() => {
      expect(screen.queryByText('Highlighted Code')).toBeInTheDocument();
    });

    const copyButton = screen.getByRole('button', { name: /copy code/i });
    fireEvent.click(copyButton);

    expect(mockClipboard.writeText).toHaveBeenCalledWith(defaultProps.code);

    // Should show success state
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });

    // Should revert back after timeout
    await waitFor(
      () => {
        expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it('hides copy button when allowCopy is false', async () => {
    render(<CodeBlock {...defaultProps} allowCopy={false} />);

    await waitFor(() => {
      expect(screen.queryByText('Highlighted Code')).toBeInTheDocument();
    });

    expect(screen.queryByRole('button', { name: /copy code/i })).not.toBeInTheDocument();
  });

  it('handles highlighting error gracefully', async () => {
    const { createHighlighter } = await import('shiki');
    vi.mocked(createHighlighter).mockRejectedValueOnce(new Error('Shiki error'));

    render(<CodeBlock {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByText(defaultProps.code)).toBeInTheDocument();
    });
  });
});
