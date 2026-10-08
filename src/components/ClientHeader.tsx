import { type Theme, ThemeProvider } from './ThemeProvider';
import { Header } from './layout/Header';
import type { HeaderProps } from './layout/Header';

interface ClientHeaderProps extends HeaderProps {
  defaultTheme?: Theme;
}

/**
 * ClientHeader component - Wraps Header with ThemeProvider for proper client-side hydration
 *
 * This component ensures the ThemeProvider context is available to Header and its children
 * (like ThemeToggle) during client-side hydration.
 */
export function ClientHeader({ defaultTheme = 'system', ...headerProps }: ClientHeaderProps) {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <Header {...headerProps} />
    </ThemeProvider>
  );
}

export default ClientHeader;
