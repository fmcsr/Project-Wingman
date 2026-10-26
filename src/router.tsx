import { useEffect, useRef, useSyncExternalStore } from 'react';
import type { AnchorHTMLAttributes, MouseEvent } from 'react';

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener('popstate', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('popstate', callback);
  };
}

/** The current path; updates on in-app navigation and on the browser's back and forward buttons. */
export function usePath() {
  return useSyncExternalStore(subscribe, () => window.location.pathname, () => '/');
}

/** Moves to another page of the app without reloading. `replace` swaps the history entry (used by redirects). */
export function navigate(to: string, { replace = false } = {}) {
  const { pathname, search, hash } = window.location;
  if (to === pathname + search + hash) return;
  window.history[replace ? 'replaceState' : 'pushState'](null, '', to);
  listeners.forEach((listener) => listener());
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * A link that navigates inside the app for paths like `/sign-in`. In-page anchors (`#pricing`), external links
 * and modified clicks (new tab, download) keep the browser's default behavior.
 */
export function Link({ href, onClick, ...props }: LinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !href.startsWith('/') || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target) return;
    event.preventDefault();
    navigate(href);
  };
  return <a href={href} onClick={handleClick} {...props} />;
}

/** Sends the visitor elsewhere right away, replacing the current history entry (e.g. a signed-out visit to /app). */
export function Redirect({ to }: { to: string }) {
  useEffect(() => navigate(to, { replace: true }), [to]);
  return null;
}

/** Sets the tab title while a page is shown. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

/** After moving to another page, starts at the top, or at the `#section` in the link. The first load is left to the browser. */
export function useScrollOnNavigate(path: string) {
  const lastPath = useRef(path);

  useEffect(() => {
    if (lastPath.current === path) return;
    lastPath.current = path;
    const target = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [path]);
}
