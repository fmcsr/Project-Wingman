import { lazy, Suspense } from 'react';
import { SignInPage } from './auth/SignInPage';
import { SignUpPage } from './auth/SignUpPage';
import { useUser } from './auth/session';
import { LandingPage } from './landing/LandingPage';
import { Redirect, usePath, useScrollOnNavigate } from './router';

// The signed-in area carries the whole library, so it loads separately and the landing page stays light
const Workspace = lazy(() => import('./workspace/Workspace').then((module) => ({ default: module.Workspace })));

/** Pages: the landing page, sign-in and sign-up, and the signed-in library and brief under /app. */
export function App() {
  const path = usePath();
  const user = useUser();
  useScrollOnNavigate(path);
  const [section, platform, exampleId] = path.split('/').filter(Boolean);

  if (section === 'app') {
    if (!user) return <Redirect to="/sign-in" />;
    return (
      <Suspense fallback={null}>
        <Workspace user={user} platform={platform} exampleId={exampleId} />
      </Suspense>
    );
  }

  switch (path) {
    case '/sign-in':
      return user ? <Redirect to="/app" /> : <SignInPage />;
    case '/sign-up':
      return user ? <Redirect to="/app" /> : <SignUpPage />;
    default:
      return <LandingPage />;
  }
}
