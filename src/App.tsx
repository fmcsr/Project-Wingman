import { SignInPage } from './auth/SignInPage';
import { SignUpPage } from './auth/SignUpPage';
import { useUser } from './auth/session';
import { LandingPage } from './landing/LandingPage';
import { Redirect, usePath, useScrollOnNavigate } from './router';
import { Workspace } from './workspace/Workspace';

/** Pages: the landing page, sign-in and sign-up, and the signed-in workspace at /app. */
export function App() {
  const path = usePath();
  const user = useUser();
  useScrollOnNavigate(path);

  switch (path) {
    case '/sign-in':
      return user ? <Redirect to="/app" /> : <SignInPage />;
    case '/sign-up':
      return user ? <Redirect to="/app" /> : <SignUpPage />;
    case '/app':
      return user ? <Workspace user={user} /> : <Redirect to="/sign-in" />;
    default:
      return <LandingPage />;
  }
}
