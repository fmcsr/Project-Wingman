import type { User } from '../auth/session';
import { signOut } from '../auth/session';
import { BrandMark } from '../brand/BrandMark';
import { BriefPage } from '../brief/BriefPage';
import { useBriefItems } from '../brief/briefStore';
import { ThemeToggle } from '../landing/ThemeToggle';
import { findExample } from '../library';
import { Link, navigate, Redirect } from '../router';
import { ExamplePage } from './ExamplePage';
import { Library } from './Library';
import styles from './Workspace.module.css';

type WorkspaceProps = {
  user: User;
  /** Path segments after /app: the library tab (or `brief`) and, optionally, an example id. */
  platform?: string;
  exampleId?: string;
};

/**
 * The signed-in area: the library at /app/mobile and /app/web, each example at /app/<platform>/<id>, and the
 * brief at /app/brief.
 */
export function Workspace({ user, platform, exampleId }: WorkspaceProps) {
  const briefCount = useBriefItems().length;
  if (platform !== 'mobile' && platform !== 'web' && platform !== 'brief') return <Redirect to="/app/mobile" />;
  const example = platform !== 'brief' && exampleId ? findExample(platform, exampleId) : undefined;
  if (exampleId && !example) return <Redirect to={`/app/${platform}`} />;

  const leave = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link className={styles.brand} href="/" aria-label="Project Wingman, home">
            <BrandMark />
            <span className={styles.brandName}>Project Wingman</span>
          </Link>
          <div className={styles.actions}>
            <Link
              href="/app/brief"
              className={styles.briefLink}
              aria-current={platform === 'brief' ? 'page' : undefined}
            >
              Brief
              {briefCount > 0 && (
                <span className={styles.briefCount}>
                  {briefCount}
                  <span className="sr-only"> {briefCount === 1 ? 'element' : 'elements'}</span>
                </span>
              )}
            </Link>
            <ThemeToggle />
            <span className={styles.user}>
              <span className={styles.avatar} aria-hidden="true">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <span className={styles.userName}>{user.name}</span>
            </span>
            <button type="button" className={styles.signOut} onClick={leave}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main>
        {import.meta.env.DEV && user.provider === 'dev' && (
          // TODO(before launch): remove with the dev account
          <div className="container">
            <p className={styles.devBanner}>
              <span>Dev only</span>
              Signed in with the dev account. Remove it before launch.
            </p>
          </div>
        )}
        {platform === 'brief' ? (
          <BriefPage />
        ) : example ? (
          <ExamplePage key={example.id} example={example} />
        ) : (
          <Library platform={platform} />
        )}
      </main>
    </div>
  );
}
