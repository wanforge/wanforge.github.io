import React, { useEffect, useState } from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Check, Copy } from 'lucide-react';
import { createHighlighter } from 'shiki';

/**
 * Utility for merging tailwind classes
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CodeBlockProps {
  /**
   * The code to display
   */
  code: string;
  /**
   * The language of the code (e.g., 'typescript', 'javascript', 'css', 'html')
   * @default 'typescript'
   */
  language?: string;
  /**
   * The title or filename to display
   */
  filename?: string;
  /**
   * Whether to show line numbers
   * @default false
   */
  showLineNumbers?: boolean;
  /**
   * Additional classes for the container
   */
  className?: string;
  /**
   * Whether to allow copying the code
   * @default true
   */
  allowCopy?: boolean;
}

/**
 * A highly customizable Code Block component with syntax highlighting,
 * copy to clipboard, and language/filename indicators.
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = false,
  className,
  allowCopy = true,
}) => {
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function highlight() {
      setIsLoading(true);
      try {
        const highlighter = await createHighlighter({
          themes: ['github-light', 'github-dark'],
          langs: [
            language,
            'typescript',
            'javascript',
            'tsx',
            'jsx',
            'json',
            'css',
            'html',
            'bash',
            'markdown',
          ],
        });

        if (isMounted) {
          const html = highlighter.codeToHtml(code, {
            lang: language,
            themes: {
              light: 'github-light',
              dark: 'github-dark',
            },
          });
          setHighlightedCode(html);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error highlighting code:', error);
        if (isMounted) {
          setHighlightedCode(`<pre><code>${code}</code></pre>`);
          setIsLoading(false);
        }
      }
    }

    highlight();

    return () => {
      isMounted = false;
    };
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div
      className={cn(
        'group relative my-6 w-full overflow-hidden rounded-lg border border-border-default bg-bg-secondary font-mono text-sm shadow-sm',
        className,
      )}
    >
      {/* Header */}
      {(filename || language || allowCopy) && (
        <div className="flex items-center justify-between border-b border-border-default bg-bg-muted px-4 py-2">
          <div className="flex items-center space-x-2">
            {filename ? (
              <span className="text-xs font-medium text-text-muted">{filename}</span>
            ) : (
              <span className="text-xs font-medium uppercase text-text-muted">{language}</span>
            )}
          </div>
          {allowCopy && (
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-1 rounded-md p-1.5 text-text-muted transition-colors hover:bg-bg-tertiary hover:text-text-primary focus:outline-hidden focus:ring-2 focus:ring-primary-500"
              aria-label={copied ? 'Copied' : 'Copy code'}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-success-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          )}
        </div>
      )}

      {/* Code Area */}
      <div className="relative overflow-x-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border-default">
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 w-3/4 rounded-sm bg-bg-tertiary"></div>
            <div className="h-4 w-1/2 rounded-sm bg-bg-tertiary"></div>
            <div className="h-4 w-2/3 rounded-sm bg-bg-tertiary"></div>
          </div>
        ) : (
          <div
            className={cn('shiki-container', showLineNumbers && 'line-numbers')}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        )}
      </div>

      {/* Styled lines (CSS-only for now, but shiki generates them) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .shiki-container pre {
          background-color: transparent !important;
          margin: 0;
          padding: 0;
        }
        .shiki-container code {
          counter-reset: line;
        }
        .shiki-container.line-numbers .line::before {
          counter-increment: line;
          content: counter(line);
          display: inline-block;
          width: 2rem;
          margin-right: 1.5rem;
          text-align: right;
          color: var(--color-text-muted);
          opacity: 0.5;
          user-select: none;
        }
        [data-theme='light'] .shiki,
        [data-theme='light'] .shiki span {
          color: var(--shiki-light) !important;
          background-color: var(--shiki-light-bg) !important;
        }
        [data-theme='dark'] .shiki,
        [data-theme='dark'] .shiki span {
          color: var(--shiki-dark) !important;
          background-color: var(--shiki-dark-bg) !important;
        }
      `,
        }}
      />
    </div>
  );
};

export default CodeBlock;
