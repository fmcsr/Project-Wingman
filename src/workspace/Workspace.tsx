import type { User } from '../auth/session';
import { signOut } from '../auth/session';
import { BrandMark } from '../brand/BrandMark';
import { ThemeToggle } from '../landing/ThemeToggle';
import { findExample } from '../library';
import { Link, navigate, Redirect } from '../router';
import { ExamplePage } from './ExamplePage';
import { Library } from './Library';
import styles from './Workspace.module.css';

type WorkspaceProps = {
  user: User;
  /** Path segments after /app: the library tab and, optionally, an example id. */
  platform?: string;
  exampleId?: string;
};

/** The signed-in area: the library at /app/mobile and /app/web, and each example at /app/<platform>/<id>. */
export function Workspace({ user, platform, exampleId }: WorkspaceProps) {
  if (platform !== 'mobile' && platform !== 'web') return <Redirect to="/app/mobile" />;
  const example = exampleId ? findExample(platform, exampleId) : undefined;
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
            <span>Project Wingman</span>
          </Link>
          <div className={styles.actions}>
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
        {example ? <ExamplePage key={example.id} example={example} /> : <Library platform={platform} />}
      </main>
    </div>
  );
}
