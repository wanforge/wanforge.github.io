/**
 * Layout Components Export
 *
 * Centralized exports for all layout components.
 *
 * @module components/layout
 */

export {
  RootLayout,
  MainContent,
  VisuallyHidden,
  type RootLayoutProps,
  type MainContentProps,
  type VisuallyHiddenProps,
  type SkipToContentProps,
} from './RootLayout';
export { default as RootLayoutDefault } from './RootLayout';

export { Header, MinimalHeader, type HeaderProps, type MinimalHeaderProps } from './Header';
export { default as HeaderDefault } from './Header';

export { Footer, MinimalFooter, type FooterProps, type MinimalFooterProps } from './Footer';
export { default as FooterDefault } from './Footer';
