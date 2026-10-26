import type { User } from '../auth/session';
import { signOut } from '../auth/session';
import { BrandMark } from '../brand/BrandMark';
import { ThemeToggle } from '../landing/ThemeToggle';
import { Link, navigate, useDocumentTitle } from '../router';
import styles from './Workspace.module.css';

const MODULES = [
  { title: 'Library', text: 'Every example project and 300+ elements, each explained in plain language.' },
  { title: 'Glossary', text: "The terms you've looked up, saved with their real CSS values." },
  { title: 'Prompt builder', text: 'Turn a rough idea into a brief your AI coding tools understand.' },
];

/** The signed-in area at /app. A placeholder for now: the real workspace gets built on top of this page. */
export function Workspace({ user }: { user: User }) {
  useDocumentTitle('Workspace · Project Wingman');

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

      <main className={`container ${styles.main}`}>
        {import.meta.env.DEV && user.provider === 'dev' && (
          // TODO(before launch): remove with the dev account
          <p className={styles.devBanner}>
            <span>Dev only</span>
            Signed in with the dev account. Remove it before launch.
          </p>
        )}
        <p className={styles.kicker}>[ Workspace ]</p>
        <h1 className={styles.title}>Welcome, {user.name}.</h1>
        <p className={styles.lead}>
          Your workspace is being built. Your library, glossary and prompt builder will live here.
        </p>
        <ul className={styles.modules} role="list">
          {MODULES.map((module, index) => (
            <li key={module.title} className={styles.module}>
              <div className={styles.moduleTop}>
                <span className={styles.index}>[{String(index + 1).padStart(2, '0')}]</span>
                <span className={styles.soon}>Soon</span>
              </div>
              <div>
                <h2 className={styles.moduleTitle}>{module.title}</h2>
                <p className={styles.moduleText}>{module.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
