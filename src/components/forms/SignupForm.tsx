'use client';

import * as React from 'react';
import { Lock, Mail, User } from 'lucide-react';
import { ChromeIcon, GithubIcon } from '@/components/icons/BrandIcons';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { DemoLink, DemoLinkButton } from '../ui/DemoLink';
import { toast } from '../ui/Toast';
import { ROUTES } from '../../config/paths';

/**
 * Signup Form State Interface
 */
interface FormState {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

/**
 * Signup Form Errors Interface
 */
interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  acceptTerms?: string;
}

/**
 * SignupForm Component
 *
 * A mockup signup form with validation, social logins, and demo feedback.
 */
export const SignupForm: React.FC = () => {
  const [formData, setFormData] = React.useState<FormState>({
    name: '',
    email: '',
    password: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  /**
   * Validate form data
   */
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle input change
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing/clicking
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please fix the errors in the form.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, we would redirect here.
      // In this mockup, we show a demo toast.
      toast.success('Account created successfully! Redirecting to dashboard...');

      // Reset form after a delay to simulate redirection
      setTimeout(() => {
        setIsSubmitting(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          acceptTerms: false,
        });
      }, 500);
    } catch {
      toast.error('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-2xl border border-border-default bg-bg-primary p-6 shadow-xl sm:p-10">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-text-primary">
          Create an account
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          Already have an account?{' '}
          <a
            href={ROUTES.LOGIN}
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            Sign in
          </a>
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <DemoLinkButton
          href="https://github.com/signup"
          variant="outline"
          className="flex w-full items-center justify-center gap-2"
          forceDemo
          data-testid="github-auth"
        >
          <GithubIcon className="h-5 w-5" />
          <span className="text-sm font-medium">GitHub</span>
        </DemoLinkButton>
        <DemoLinkButton
          href="https://accounts.google.com/signup"
          variant="outline"
          className="flex w-full items-center justify-center gap-2"
          forceDemo
          data-testid="google-auth"
        >
          <ChromeIcon className="h-5 w-5" />
          <span className="text-sm font-medium">Google</span>
        </DemoLinkButton>
      </div>

      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border-default"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-bg-primary px-2 text-text-muted">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate data-testid="signup-form">
        <div className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
            fullWidth
            floatingLabel
            leftIcon={<User className="h-4 w-4 text-text-muted" />}
            data-testid="signup-name"
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            fullWidth
            floatingLabel
            leftIcon={<Mail className="h-4 w-4 text-text-muted" />}
            data-testid="signup-email"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
            fullWidth
            floatingLabel
            leftIcon={<Lock className="h-4 w-4 text-text-muted" />}
            data-testid="signup-password"
          />

          <div className="space-y-1">
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="accept-terms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-border-default text-primary-600 focus:ring-primary-500"
                  data-testid="signup-terms"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="accept-terms" className="text-text-muted">
                  I agree to the{' '}
                  <DemoLink
                    href={ROUTES.TERMS}
                    className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                    forceDemo
                  >
                    Terms of Service
                  </DemoLink>{' '}
                  and{' '}
                  <DemoLink
                    href={ROUTES.PRIVACY}
                    className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                    forceDemo
                  >
                    Privacy Policy
                  </DemoLink>
                </label>
              </div>
            </div>
            {errors.acceptTerms && (
              <p
                className="text-xs font-medium text-error-600 dark:text-error-400"
                data-testid="input-error"
              >
                {errors.acceptTerms}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          loading={isSubmitting}
          data-testid="signup-submit"
        >
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
