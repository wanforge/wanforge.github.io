/**
 * Handles redirect parameter on initial page load
 * Call this in your root layout or app entry point to support SPA routing on GitHub Pages.
 */
export const handleRedirect = (): void => {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');

  if (redirect) {
    // Remove the redirect parameter from URL
    params.delete('redirect');
    const newSearch = params.toString();
    const newUrl =
      window.location.pathname + (newSearch ? `?${newSearch}` : '') + window.location.hash;

    // Replace current history entry without the redirect param
    window.history.replaceState({}, '', newUrl);

    // Navigate to the intended route
    // In Astro with ClientRouter, we can use the history API or Astro's navigate
    // Since we've already replaced the state, we might need to trigger a navigation
    // if the content doesn't match the new URL.

    // For GitHub Pages SPA hack, we usually want to navigate to the 'redirect' path
    // if it's different from the current path.
    if (redirect !== window.location.pathname) {
      // We use window.location.replace to ensure a clean load of the target page
      // since we are currently on index.html but want to be on the redirected page.
      window.location.replace(redirect + (newSearch ? `?${newSearch}` : '') + window.location.hash);
    }
  }
};
