import { useEffect, useRef, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import styles from './DocsSite.module.css';

type NavSection = {
  heading: string;
  links?: string[];
  /** Collapsible groups: only an open group lists its pages. */
  groups?: { label: string; pages?: string[] }[];
};

const NAV: NavSection[] = [
  { heading: 'Get started', links: ['Introduction', 'Quickstart', 'Forge CLI'] },
  {
    heading: 'Build',
    groups: [
      { label: 'Storage', pages: ['Buckets', 'Upload button', 'Signed URLs', 'Image transforms'] },
      { label: 'Functions' },
      { label: 'Databases' },
      { label: 'Deployments' },
    ],
  },
  { heading: 'Reference', links: ['REST API', 'CLI commands', 'Changelog'] },
];

const CURRENT_PAGE = 'Upload button';
const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn'];
/** The article's sections, in order; the table of contents lists the same ones. */
const SECTIONS = ['Installation', 'Usage', 'Props', 'Upload limits'];

type TokenKind = 'kw' | 'str' | 'fn' | 'attr';
/** One line of code as [kind, text] pieces; kind '' is plain text. */
type CodeLine = (readonly [TokenKind | '', string])[];

const CODE: CodeLine[] = [
  [['kw', 'import'], ['', ' { '], ['fn', 'UploadButton'], ['', ' } '], ['kw', 'from'], ['', ' '], ['str', "'@forge/react'"], ['', ';']],
  [],
  [['kw', 'export'], ['', ' '], ['kw', 'function'], ['', ' '], ['fn', 'AvatarForm'], ['', '() {']],
  [['', '  '], ['kw', 'return'], ['', ' (']],
  [['', '    <'], ['fn', 'UploadButton']],
  [['', '      '], ['attr', 'endpoint'], ['', '='], ['str', '"avatars"']],
  [['', '      '], ['attr', 'maxFileSize'], ['', '='], ['str', '"4MB"']],
  [['', '      '], ['attr', 'onUploadComplete'], ['', '={saveAvatar}']],
  [['', '    />']],
  [['', '  );']],
  [['', '}']],
];

/** 1-based, like the line numbers: the line the paragraph above the snippet talks about. */
const HIGHLIGHTED_LINE = 6;

const TOKEN_CLASS: Record<TokenKind, string> = { kw: styles.kw, str: styles.str, fn: styles.fn, attr: styles.attr };

const PROPS: { name: string; required?: boolean; type: string; fallback?: string; description: string }[] = [
  { name: 'endpoint', required: true, type: 'string', description: 'Route name in forge.config.ts.' },
  { name: 'maxFileSize', type: 'string', fallback: '"4MB"', description: 'Largest file a user can pick.' },
  { name: 'accept', type: 'string[]', fallback: '["image/*"]', description: 'File types the picker allows.' },
  { name: 'multiple', type: 'boolean', fallback: 'false', description: 'Allows picking several files.' },
  { name: 'onUploadComplete', type: '(files) => void', description: 'Runs when every file is done.' },
];

/** A heading becomes the current section once it scrolls up to this far below the top bar. */
const SPY_OFFSET = 96;

/**
 * Scroll spy for the table of contents: the current section is the last heading that has scrolled up near the top
 * bar, or the last one once the page reaches its end. It only reacts to scrolling; nothing moves on its own.
 */
function useCurrentSection(bar: RefObject<HTMLElement | null>, article: RefObject<HTMLElement | null>) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const barEl = bar.current;
    const articleEl = article.current;
    if (!barEl || !articleEl) return;
    const headings = [...articleEl.querySelectorAll('h3')];
    // The box that scrolls this page (the browser frame moves its content with scrollTop)
    let scroller = barEl.parentElement;
    while (scroller && getComputedStyle(scroller).overflowY === 'visible') scroller = scroller.parentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = barEl.getBoundingClientRect().bottom + SPY_OFFSET;
      let index = 0;
      headings.forEach((heading, i) => {
        if (heading.getBoundingClientRect().top <= line) index = i;
      });
      // The last section is often too short to reach the line, so the end of the page selects it
      const atEnd =
        scroller !== null &&
        scroller.scrollTop > 0 &&
        scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
      setCurrent(atEnd ? headings.length - 1 : index);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    // Capture phase: scroll events from the frame don't bubble up to the window
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll, { capture: true });
    };
  }, [bar, article]);

  return current;
}

function Icon({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg className={className ? `${styles.icon} ${className}` : styles.icon} viewBox="0 0 24 24">
      {children}
    </svg>
  );
}

/** Icon-only copy button; the install command and the code block share it. */
function CopyButton() {
  return (
    <span className={styles.copy} role="button" aria-label="Copy code" data-inspect="copy-button">
      <Icon>
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M5 15V6a1 1 0 0 1 1-1h9" />
      </Icon>
    </span>
  );
}

/**
 * Developer docs page: a sticky top bar, a docs tree on the left, the article in the middle and an "On this page"
 * list on the right that follows the reader's scroll. Not interactive (links have no href); for inspection only.
 */
export function DocsSite() {
  const barRef = useRef<HTMLElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const currentSection = useCurrentSection(barRef, articleRef);

  return (
    <div className={styles.page}>
      <header ref={barRef} className={styles.topBar} data-inspect="top-bar">
        <span className={styles.menuButton}>
          <Icon>
            <path d="M4 7h16M4 12h16M4 17h16" />
          </Icon>
        </span>
        <a className={styles.brand}>
          <span className={styles.mark}>
            <svg viewBox="0 0 24 24" width="14" height="14">
              <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" fill="currentColor" />
            </svg>
          </span>
          Forge
          <span className={styles.docsLabel}>Docs</span>
        </a>
        <span className={styles.search} role="button" aria-keyshortcuts="Meta+K" data-inspect="search-field">
          <Icon>
            <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4" />
          </Icon>
          <span className={styles.searchText}>Search docs…</span>
          <kbd className={styles.kbd}>⌘K</kbd>
        </span>
        <div className={styles.barEnd}>
          <span className={styles.version} role="button" aria-haspopup="listbox" data-inspect="version-selector">
            v3.2
            <Icon className={styles.versionChevron}>
              <path d="M6 9l6 6 6-6" />
            </Icon>
          </span>
          <a className={styles.dashboard}>Dashboard</a>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <nav className={styles.sidebarNav} aria-label="Docs" data-inspect="sidebar">
            {NAV.map((section) => (
              <div key={section.heading}>
                <p className={styles.sectionHeading}>{section.heading}</p>
                <ul className={styles.navList}>
                  {section.links?.map((label) => (
                    <li key={label}>
                      <a className={styles.navItem}>{label}</a>
                    </li>
                  ))}
                  {section.groups?.map((group) => (
                    <li key={group.label} data-inspect="nav-group">
                      <span className={styles.groupHeader} role="button" aria-expanded={Boolean(group.pages)}>
                        {group.label}
                        <Icon className={styles.chevron}>
                          <path d="M9 6l6 6-6 6" />
                        </Icon>
                      </span>
                      {group.pages && (
                        <ul className={styles.groupPages}>
                          {group.pages.map((page) => (
                            <li key={page}>
                              <a
                                className={styles.navItem}
                                aria-current={page === CURRENT_PAGE ? 'page' : undefined}
                                data-inspect={page === CURRENT_PAGE ? 'nav-active' : undefined}
                              >
                                {page}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className={styles.main}>
          <article ref={articleRef}>
            <nav aria-label="Breadcrumb" data-inspect="breadcrumbs">
              <ol className={styles.crumbs}>
                {['Docs', 'Storage'].map((crumb) => (
                  <li key={crumb} className={styles.crumb}>
                    <a>{crumb}</a>
                    <Icon className={styles.crumbSeparator}>
                      <path d="M9 6l6 6-6 6" />
                    </Icon>
                  </li>
                ))}
                <li className={styles.crumb}>
                  <span className={styles.crumbCurrent} aria-current="page">
                    {CURRENT_PAGE}
                  </span>
                </li>
              </ol>
            </nav>

            <h2 className={styles.title}>{CURRENT_PAGE}</h2>
            <p className={styles.lead}>
              A drop-in React component that sends files straight to a Forge storage bucket, with progress, retries
              and size limits built in.
            </p>

            <div className={`${styles.callout} ${styles.calloutInfo}`} role="note" data-inspect="callout">
              <Icon className={styles.calloutIcon}>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5M12 8h.01" />
              </Icon>
              <div>
                <p className={styles.calloutTitle}>New in v3.2</p>
                <p className={styles.calloutText}>Uploads now resume on their own after a dropped connection.</p>
              </div>
            </div>

            <h3 className={styles.sectionTitle}>{SECTIONS[0]}</h3>
            <p className={styles.text}>Add the React package to your project:</p>
            <div className={styles.install} data-inspect="package-tabs">
              <div className={styles.tabs} role="tablist">
                {PACKAGE_MANAGERS.map((manager, index) => (
                  <span key={manager} className={styles.tab} role="tab" aria-selected={index === 0}>
                    {manager}
                  </span>
                ))}
              </div>
              <div className={styles.command} role="tabpanel">
                <span className={styles.prompt}>$</span>
                <code className={styles.commandText}>npm install @forge/react</code>
                <CopyButton />
              </div>
            </div>

            <h3 className={styles.sectionTitle}>{SECTIONS[1]}</h3>
            <p className={styles.text}>
              Render the button in any client component, and set <code className={styles.inlineCode}>endpoint</code>{' '}
              to the name of an upload route in <code className={styles.inlineCode}>forge.config.ts</code>.
            </p>
            <div className={styles.codeBlock} data-inspect="code-block">
              <div className={styles.codeHeader}>
                <span className={styles.fileTab}>
                  <Icon className={styles.fileIcon}>
                    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                    <path d="M14 3v5h5" />
                  </Icon>
                  app/settings/avatar-form.tsx
                </span>
                <CopyButton />
              </div>
              <pre className={styles.code}>
                <code className={styles.codeLines}>
                  {CODE.map((line, index) => {
                    const highlighted = index + 1 === HIGHLIGHTED_LINE;
                    return (
                      <span
                        key={index}
                        className={highlighted ? `${styles.line} ${styles.lineHighlighted}` : styles.line}
                        data-inspect={highlighted ? 'highlighted-line' : undefined}
                      >
                        <span className={styles.lineNumber}>{index + 1}</span>
                        <span className={styles.lineCode}>
                          {line.map(([kind, text], i) =>
                            kind ? (
                              <span key={i} className={TOKEN_CLASS[kind]}>
                                {text}
                              </span>
                            ) : (
                              text
                            ),
                          )}
                        </span>
                      </span>
                    );
                  })}
                </code>
              </pre>
            </div>

            <div className={`${styles.callout} ${styles.calloutWarning}`} role="note" data-inspect="callout">
              <Icon className={styles.calloutIcon}>
                <path d="M10.3 4.6 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.6a2 2 0 0 0-3.4 0z" />
                <path d="M12 9.5v4M12 17h.01" />
              </Icon>
              <div>
                <p className={styles.calloutTitle}>Keep your secret key on the server</p>
                <p className={styles.calloutText}>
                  The button only needs the endpoint name, never <code className={styles.inlineCode}>FORGE_SECRET_KEY</code>.
                </p>
              </div>
            </div>

            <h3 className={styles.sectionTitle}>{SECTIONS[2]}</h3>
            <table className={styles.table} data-inspect="props-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {PROPS.map((prop) => (
                  <tr key={prop.name}>
                    <td>
                      <code className={styles.propName}>{prop.name}</code>
                      {prop.required && <span className={styles.required}>required</span>}
                    </td>
                    <td>
                      <code className={styles.propType}>{prop.type}</code>
                    </td>
                    <td data-label="Default">
                      {prop.fallback ? (
                        <code className={styles.propDefault}>{prop.fallback}</code>
                      ) : (
                        <span className={styles.none}>—</span>
                      )}
                    </td>
                    <td className={styles.propDescription}>{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className={styles.sectionTitle}>{SECTIONS[3]}</h3>
            <p className={styles.text}>Hobby projects take files up to 64 MB, Pro projects up to 1 GB.</p>

            <div className={styles.pageMeta}>
              <div className={styles.feedback} data-inspect="feedback">
                <span>Was this page helpful?</span>
                <span className={styles.vote}>
                  <Icon>
                    <path d="M7 10v11M15 5.9 14 10h5.8a2 2 0 0 1 2 2.4l-1.4 7A2 2 0 0 1 18.4 21H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3l4.3-6.4a1.8 1.8 0 0 1 3.7 1.3z" />
                  </Icon>
                  Yes
                </span>
                <span className={styles.vote}>
                  <Icon>
                    <path d="M17 14V3M9 18.1l1-4.1H4.2a2 2 0 0 1-2-2.4l1.4-7A2 2 0 0 1 5.6 3H20a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-3l-4.3 6.4a1.8 1.8 0 0 1-3.7-1.3z" />
                  </Icon>
                  No
                </span>
              </div>
              <span className={styles.updated}>Last updated on Oct 14, 2026</span>
            </div>

            <nav className={styles.pager} aria-label="Previous and next page" data-inspect="pager">
              <a className={styles.pagerCard}>
                <span className={styles.pagerLabel}>Previous</span>
                <span className={styles.pagerTitle}>
                  <Icon>
                    <path d="M15 6l-6 6 6 6" />
                  </Icon>
                  Buckets
                </span>
              </a>
              <a className={`${styles.pagerCard} ${styles.pagerNext}`}>
                <span className={styles.pagerLabel}>Next</span>
                <span className={styles.pagerTitle}>
                  Signed URLs
                  <Icon>
                    <path d="M9 6l6 6-6 6" />
                  </Icon>
                </span>
              </a>
            </nav>

            <footer className={styles.footer}>
              <span>© 2026 Forge Labs, Inc.</span>
              <span>Status · Privacy · Terms</span>
            </footer>
          </article>
        </main>

        <div className={styles.toc}>
          <nav className={styles.tocNav} aria-label="On this page" data-inspect="toc">
            <p className={styles.tocTitle}>On this page</p>
            <ul className={styles.tocList}>
              {SECTIONS.map((section, index) => (
                <li key={section}>
                  <a className={styles.tocLink} aria-current={index === currentSection ? 'true' : undefined}>
                    {section}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
