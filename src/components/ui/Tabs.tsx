import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/utils/cn';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  baseId: string;
  hasPanels: boolean;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

const useTabs = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The value of the tab that should be active by default */
  defaultValue?: string;
  /** The controlled value of the active tab */
  value?: string;
  /** Callback fired when the active tab changes */
  onValueChange?: (value: string) => void;
  /** The orientation of the tabs */
  orientation?: 'horizontal' | 'vertical';
  /** Whether the tabs have associated content panels */
  hasPanels?: boolean;
  /** Children should contain TabsList and TabsContent */
  children: React.ReactNode;
}

/**
 * Tabs Component
 *
 * A set of layered sections of content, known as tab panels, that are displayed one at a time.
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue,
      value,
      onValueChange,
      orientation = 'horizontal',
      hasPanels = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const baseId = React.useId();

    const activeTab = value !== undefined ? value : internalValue;

    const setActiveTab = React.useCallback(
      (newValue: string) => {
        if (value === undefined) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [value, onValueChange],
    );

    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab, orientation, baseId, hasPanels }}>
        <div
          ref={ref}
          className={cn('flex', orientation === 'horizontal' ? 'flex-col' : 'flex-row', className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * TabsList Component
 *
 * Contains the triggers that are used to activate tab panels.
 */
export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation, setActiveTab } = useTabs();
    const listRef = React.useRef<HTMLDivElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      const triggers = Array.from(
        listRef.current?.querySelectorAll('[role="tab"]:not([disabled])') || [],
      ) as HTMLElement[];

      const index = triggers.findIndex((t) => t.getAttribute('aria-selected') === 'true');

      let nextIndex = -1;

      if (orientation === 'horizontal') {
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % triggers.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + triggers.length) % triggers.length;
      } else {
        if (event.key === 'ArrowDown') nextIndex = (index + 1) % triggers.length;
        if (event.key === 'ArrowUp') nextIndex = (index - 1 + triggers.length) % triggers.length;
      }

      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = triggers.length - 1;

      if (nextIndex !== -1) {
        event.preventDefault();
        const nextValue = triggers[nextIndex]?.getAttribute('data-value');
        if (nextValue) {
          setActiveTab(nextValue);
          triggers[nextIndex]?.focus();
        }
      }
    };

    return (
      <div
        ref={(node) => {
          listRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex h-10 items-center justify-center rounded-lg bg-bg-secondary p-1 text-text-muted overflow-x-auto scrollbar-hide touch-pan-x',
          orientation === 'vertical' && 'h-auto flex-col items-stretch overflow-x-visible',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The value associated with this tab */
  value: string;
  /** Children should be the tab label */
  children: React.ReactNode;
}

/**
 * TabsTrigger Component
 *
 * The button that activates a tab panel.
 */
export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, children, ...props }, ref) => {
    const { activeTab, setActiveTab, baseId, hasPanels } = useTabs();
    const isActive = activeTab === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={hasPanels ? `${baseId}-content-${value}` : undefined}
        id={`${baseId}-trigger-${value}`}
        data-value={value}
        tabIndex={isActive ? 0 : -1}
        onClick={() => setActiveTab(value)}
        className={cn(
          'relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50',
          isActive ? 'text-text-primary' : 'hover:text-text-primary',
          className,
        )}
        {...props}
      >
        {isActive && (
          <motion.div
            layoutId={`${baseId}-active-indicator`}
            className="absolute inset-0 rounded-md bg-bg-primary shadow-sm"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </button>
    );
  },
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The value associated with this content area */
  value: string;
  /** Children should be the content of the tab */
  children: React.ReactNode;
}

/**
 * TabsContent Component
 *
 * Contains the content associated with a tab.
 */
export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, style, ...props }, ref) => {
    const { activeTab, baseId } = useTabs();
    const isActive = activeTab === value;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${baseId}-content-${value}`}
        aria-labelledby={`${baseId}-trigger-${value}`}
        tabIndex={isActive ? 0 : -1}
        className={cn(
          'mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
          !isActive && 'hidden',
          className,
        )}
        style={style}
        {...props}
      >
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
TabsContent.displayName = 'TabsContent';

export default Tabs;
