import * as React from 'react';
import { CheckCircle2, Mail } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { cn } from '../../utils/cn';

/**
 * NewsletterForm Props Interface
 */
export interface NewsletterFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /** Optional title for the form */
  title?: string;
  /** Optional description text */
  description?: string;
  /** Success message shown after successful subscription */
  successMessage?: string;
  /** Placeholder for the email input */
  placeholder?: string;
  /** Label for the submit button */
  buttonText?: string;
  /** Whether the form should take up full width of its container */
  fullWidth?: boolean;
  /** Callback triggered on successful submission */
  onSuccess?: (email: string) => void;
}

/**
 * NewsletterForm Component
 *
 * A reusable, accessible email capture form with validation,
 * loading states, and success feedback.
 *
 * @example
 * ```tsx
 * <NewsletterForm
 *   title="Join our newsletter"
 *   description="Get the latest updates directly in your inbox."
 *   onSuccess={(email) => console.log('Subscribed:', email)}
 * />
 * ```
 */
export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  title,
  description,
  successMessage = 'Thanks for subscribing! Please check your email to confirm.',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  fullWidth = true,
  onSuccess,
  className,
  ...props
}) => {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState<string | undefined>();
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validateEmail = (val: string) => {
    if (!val) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Please enter a valid email address';
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      setStatus('error');
      return;
    }

    setError(undefined);
    setStatus('loading');

    // Mock API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      if (onSuccess) onSuccess(email);
      setEmail('');
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300',
          fullWidth ? 'w-full' : 'w-auto',
          className,
        )}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success-100 dark:bg-success-900/30">
          <CheckCircle2 className="h-6 w-6 text-success-600 dark:text-success-400" />
        </div>
        {title && <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>}
        <p className="text-text-muted max-w-sm">{successMessage}</p>
        <Button variant="ghost" size="sm" className="mt-4" onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(fullWidth ? 'w-full' : 'w-auto', className)}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>}
          {description && <p className="text-text-muted">{description}</p>}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-start"
        noValidate
        data-testid="newsletter-form"
        {...props}
      >
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(undefined);
          }}
          error={error}
          disabled={status === 'loading'}
          className="sm:min-w-[280px]"
          containerClassName="flex-1"
          autoComplete="email"
          leftIcon={<Mail className="h-4 w-4 text-text-muted" />}
        />
        <Button
          type="submit"
          loading={status === 'loading'}
          className="sm:mt-0"
          fullWidth={false}
          size="md"
          data-testid="newsletter-submit"
        >
          {buttonText}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterForm;
