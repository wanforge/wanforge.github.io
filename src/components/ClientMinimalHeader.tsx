import { type Theme, ThemeProvider } from './ThemeProvider';
import { MinimalHeader } from './layout/Header';
import type { MinimalHeaderProps } from './layout/Header';

interface ClientMinimalHeaderProps extends MinimalHeaderProps {
  defaultTheme?: Theme;
}

/**
 * ClientMinimalHeader component - Wraps MinimalHeader with ThemeProvider for proper client-side hydration
 */
export function ClientMinimalHeader({
  defaultTheme = 'system',
  ...headerProps
}: ClientMinimalHeaderProps) {
  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <MinimalHeader {...headerProps} />
    </ThemeProvider>
  );
}

export default ClientMinimalHeader;
