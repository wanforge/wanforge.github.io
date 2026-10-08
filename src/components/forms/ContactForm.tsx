'use client';

import * as React from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { toast } from '../ui/Toast';
import { Link } from '../ui';
import { ROUTES } from '../../config/paths';

/**
 * Contact Form State Interface
 */
interface FormState {
  name: string;
  email: string;
  company: string;
  inquiryType: string;
  message: string;
}

/**
 * Contact Form Errors Interface
 */
interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  inquiryType?: string;
  message?: string;
}

/**
 * Inquiry Type Options
 */
const INQUIRY_TYPES = [
  { label: 'Select an inquiry type', value: '' },
  { label: 'General Inquiry', value: 'general' },
  { label: 'Sales & Pricing', value: 'sales' },
  { label: 'Technical Support', value: 'support' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Press & Media', value: 'press' },
];

/**
 * ContactForm Component
 *
 * A production-quality contact form with validation, loading states,
 * and demo success feedback. Supports both light and dark modes.
 */
export const ContactForm: React.FC = () => {
  const [formData, setFormData] = React.useState<FormState>({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    message: '',
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  /**
   * Validate form data
   */
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle input change
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
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

      setIsSuccess(true);
      toast.success('Message sent successfully! We will get back to you soon.');

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        inquiryType: '',
        message: '',
      });
    } catch {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-border-default bg-bg-secondary p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-100 text-success-600 dark:bg-success-900/30 dark:text-success-400">
          <Send className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold text-text-primary">Thank you!</h3>
        <p className="max-w-md text-text-muted">
          Your message has been sent successfully. We appreciate you reaching out and will get back
          to you within 24 hours.
        </p>
        <Button variant="outline" onClick={() => setIsSuccess(false)} className="mt-4">
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-border-default bg-bg-primary p-6 shadow-sm sm:p-8"
      noValidate
      data-testid="contact-form"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Full Name"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          fullWidth
          floatingLabel
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          fullWidth
          floatingLabel
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Company (Optional)"
          name="company"
          placeholder="Acme Inc."
          value={formData.company}
          onChange={handleChange}
          error={errors.company}
          fullWidth
          floatingLabel
        />
        <Select
          label="Inquiry Type"
          name="inquiryType"
          options={INQUIRY_TYPES}
          value={formData.inquiryType}
          onChange={handleChange}
          error={errors.inquiryType}
          required
          fullWidth
          floatingLabel
        />
      </div>

      <Textarea
        label="Message"
        name="message"
        placeholder="How can we help you?"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        required
        fullWidth
        rows={5}
        showCharacterCount
        maxLength={1000}
        floatingLabel
      />

      <Button
        type="submit"
        className="w-full sm:w-auto"
        size="lg"
        loading={isSubmitting}
        leftIcon={!isSubmitting && <Send className="h-4 w-4" />}
        data-testid="contact-submit"
      >
        Send Message
      </Button>

      <p className="text-center text-xs text-text-muted sm:text-left">
        By submitting this form, you agree to our{' '}
        <Link
          href={ROUTES.PRIVACY}
          className="text-primary-600 hover:underline dark:text-primary-400"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
};

export default ContactForm;
