import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Accordion Context
 */
interface AccordionContextValue {
  activeItems: string[];
  toggleItem: (id: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

const useAccordion = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion provider');
  }
  return context;
};

/**
 * Item Context
 */
interface AccordionItemContextValue {
  value: string;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | undefined>(undefined);

const useAccordionItem = () => {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error('AccordionItem components must be used within an AccordionItem');
  }
  return context;
};

/**
 * Accordion Root Component
 *
 * Manages the state of which items are expanded.
 */
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Mode of operation: 'single' (one item open at a time) or 'multiple' */
  type?: 'single' | 'multiple';
  /** Default open item IDs */
  defaultValue?: string | string[];
  /** Controlled value of open item IDs */
  value?: string | string[];
  /** Callback when open items change */
  onValueChange?: (value: string[]) => void;
  /** Children should be AccordionItem components */
  children: React.ReactNode;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = 'single', defaultValue, value, onValueChange, className, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string[]>(() => {
      if (defaultValue) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      return [];
    });

    const activeItems =
      value !== undefined ? (Array.isArray(value) ? value : [value]) : internalValue;

    const toggleItem = React.useCallback(
      (id: string) => {
        let newValue: string[];

        if (type === 'single') {
          newValue = activeItems.includes(id) ? [] : [id];
        } else {
          newValue = activeItems.includes(id)
            ? activeItems.filter((item) => item !== id)
            : [...activeItems, id];
        }

        if (value === undefined) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [type, activeItems, value, onValueChange],
    );

    return (
      <AccordionContext.Provider value={{ activeItems, toggleItem, type }}>
        <div ref={ref} className={cn('w-full space-y-2', className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);

Accordion.displayName = 'Accordion';

/**
 * Accordion Item Component
 *
 * A single collapsible item within an Accordion.
 */
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique identifier for the item */
  value: string;
  /** Children should be AccordionTrigger and AccordionContent */
  children: React.ReactNode;
}

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const { activeItems } = useAccordion();
    const isOpen = activeItems.includes(value);

    return (
      <AccordionItemContext.Provider value={{ value }}>
        <div
          ref={ref}
          className={cn(
            'border border-border-default rounded-lg overflow-hidden transition-all duration-200',
            isOpen ? 'bg-bg-primary shadow-sm' : 'bg-bg-primary hover:bg-bg-secondary',
            className,
          )}
          data-state={isOpen ? 'open' : 'closed'}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);

AccordionItem.displayName = 'AccordionItem';

/**
 * Accordion Trigger Component
 *
 * The button that toggles the expansion of its parent AccordionItem.
 */
export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Additional classes for the chevron icon */
  iconClassName?: string;
}

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, iconClassName, ...props }, ref) => {
    const { activeItems, toggleItem } = useAccordion();
    const { value } = useAccordionItem();
    const isOpen = activeItems.includes(value);

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => toggleItem(value)}
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'closed'}
        className={cn(
          'flex w-full items-center justify-between py-4 px-5 text-left font-medium transition-all hover:bg-bg-secondary/50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
          'text-text-primary',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-200 text-text-secondary',
            isOpen && 'rotate-180',
            iconClassName,
          )}
        />
      </button>
    );
  },
);

AccordionTrigger.displayName = 'AccordionTrigger';

/**
 * Accordion Content Component
 *
 * The expandable content area of an AccordionItem.
 */
export type AccordionContentProps = React.HTMLAttributes<HTMLDivElement>;

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { activeItems } = useAccordion();
    const { value } = useAccordionItem();
    const isOpen = activeItems.includes(value);

    return (
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              ref={ref}
              className={cn('px-5 pb-4 pt-0 text-text-secondary leading-relaxed', className)}
              {...props}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

AccordionContent.displayName = 'AccordionContent';

export default Accordion;
