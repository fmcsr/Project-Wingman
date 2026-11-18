import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useDemoMotion } from '../../../demos/motion';
import styles from './ToastStack.module.css';

/**
 * A toast's place in the stack: the three on screen (front, second, third), `gone` once a newer one pushes it out of
 * the three (it fades out sliding up), and `waiting` below the window, hidden, until it comes in again.
 */
type Slot = 'front' | 'second' | 'third' | 'gone' | 'waiting';

type Toast = {
  title: string;
  description: string;
  /** Work in progress: the toast shows a spinner with the text above, then a check with this text once it's done. */
  done?: { title: string; description: string };
  action?: string;
  icon?: ReactNode;
};

/** The four toasts, in the order they first come in. */
const TOASTS: Toast[] = [
  {
    title: 'Uploading 3 files…',
    description: 'Design assets · 12.4 MB',
    done: { title: '3 files uploaded', description: 'Added to Design assets' },
  },
  {
    title: 'File archived',
    description: 'Roadmap.pdf',
    action: 'Undo',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="18" height="4.5" rx="1" />
        <path d="M5 8.5V18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5M10 12.5h4" />
      </svg>
    ),
  },
  {
    title: 'Exporting PDF…',
    description: 'Brand guidelines.pdf',
    done: { title: 'PDF exported', description: 'Saved to Downloads' },
  },
  {
    title: 'Link copied',
    description: 'Link to Design assets',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 13.5a4.5 4.5 0 0 0 6.4.4l2.7-2.7a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2" />
        <path d="M14 10.5a4.5 4.5 0 0 0-6.4-.4l-2.7 2.7a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" />
      </svg>
    ),
  },
];

/**
 * One moment of the loop: each toast's slot (in the order of TOASTS), which ones have finished their work, whether
 * the pointer is over the stack and the stack spread out, and how long the moment lasts.
 */
type Step = { slots: Slot[]; done: boolean[]; pointer?: boolean; expanded?: boolean; ms: number };

/**
 * Two rounds. In the first, an upload starts with a spinner (the oldest toast leaves to keep three), finishes, and an
 * archive with Undo comes in; then the pointer comes over the stack, which spreads into a list, and closes again as
 * the pointer leaves. In the second, a PDF export starts and finishes, and a copied link comes in.
 */
const STEPS: Step[] = [
  { slots: ['waiting', 'third', 'second', 'front'], done: [false, false, true, false], ms: 1000 },
  { slots: ['front', 'gone', 'third', 'second'], done: [false, false, true, false], ms: 1900 },
  { slots: ['front', 'waiting', 'third', 'second'], done: [true, false, true, false], ms: 1300 },
  { slots: ['second', 'front', 'gone', 'third'], done: [true, false, true, false], ms: 1500 },
  { slots: ['second', 'front', 'waiting', 'third'], done: [true, false, false, false], pointer: true, ms: 700 },
  {
    slots: ['second', 'front', 'waiting', 'third'],
    done: [true, false, false, false],
    pointer: true,
    expanded: true,
    ms: 2300,
  },
  { slots: ['second', 'front', 'waiting', 'third'], done: [true, false, false, false], ms: 1000 },
  { slots: ['third', 'second', 'front', 'gone'], done: [true, false, false, false], ms: 1900 },
  { slots: ['third', 'second', 'front', 'waiting'], done: [true, false, true, false], ms: 1300 },
  { slots: ['gone', 'third', 'second', 'front'], done: [true, false, true, false], ms: 1800 },
];

/** The still picture: three toasts stacked, the archive in front with its Undo. */
const FINAL = STEPS[3];

/** Steps through the loop while `playing`; each step lasts its own time, and a held step starts over. */
function useSteps(playing: boolean, final: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((current) => (current + 1) % STEPS.length), STEPS[index].ms);
    return () => window.clearTimeout(id);
  }, [index, playing]);

  return final ? FINAL : STEPS[index];
}

/** A file manager's folder, drawn faintly behind the toasts. */
const FILES = [
  { name: 'Brand guidelines.pdf', size: '4.2 MB' },
  { name: 'Logo pack.zip', size: '12.8 MB' },
  { name: 'Hero banner.png', size: '2.1 MB' },
  { name: 'Hero wide.png', size: '6.3 MB' },
  { name: 'Hero mobile.png', size: '4.0 MB' },
  { name: 'Icon set.svg', size: '860 KB' },
  { name: 'Moodboard.jpg', size: '1.2 MB' },
  { name: 'Typography.pdf', size: '940 KB' },
  { name: 'Color tokens.json', size: '12 KB' },
  { name: 'Launch video.mp4', size: '48.6 MB' },
];

const NAV = ['Home', 'Files', 'Shared', 'Recent', 'Trash'];

/** Twelve bars around a circle, each fading as the next lights up: the spinner of a loading toast. */
function Spinner() {
  return (
    <span className={styles.spinner} aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
        <span key={index} className={styles.bar} style={{ '--i': index } as CSSProperties} />
      ))}
    </span>
  );
}

const SUCCESS = (
  <svg className={styles.success} viewBox="0 0 20 20" aria-hidden="true">
    <circle cx="10" cy="10" r="8.5" />
    <path d="m6.75 10.25 2.25 2.25 4.25-4.5" />
  </svg>
);

/**
 * Toast stack: notifications stacked at the bottom of a file manager, as Sonner shows them. The newest is in front;
 * the two before it peek out above it, smaller. In the loop new toasts slide up and push the stack back, a loading
 * toast turns into a success, the oldest leaves past three, and every other round the pointer comes over the stack,
 * which spreads into a list and closes again as the pointer leaves.
 */
export function ToastStack() {
  const { ref, playing, final } = useDemoMotion<HTMLDivElement>();
  const step = useSteps(playing, final);

  return (
    <div ref={ref} className={styles.tile} data-paused={playing ? undefined : ''}>
      <div className={styles.app}>
        <nav className={styles.sidebar}>
          {NAV.map((item) => (
            <span key={item} className={styles.navItem} data-current={item === 'Files' ? '' : undefined}>
              {item}
            </span>
          ))}
        </nav>
        <div className={styles.main}>
          <div className={styles.header}>
            <span className={styles.folder}>Design assets</span>
            <span className={styles.upload}>Upload</span>
          </div>
          <div className={styles.columns}>
            <span>Name</span>
            <span>Size</span>
          </div>
          {FILES.map((file) => (
            <div key={file.name} className={styles.file}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M14 3v5h5" />
              </svg>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileSize}>{file.size}</span>
            </div>
          ))}
        </div>
      </div>

      <section
        className={styles.toaster}
        data-inspect="toast-stack"
        data-expanded={step.expanded ? '' : undefined}
        aria-label="Notifications"
      >
        <ol className={styles.list}>
          {TOASTS.map((toast, index) => {
            const done = step.done[index];
            const loading = toast.done !== undefined && !done;
            const text = done && toast.done ? toast.done : toast;
            return (
              <li
                key={toast.title}
                className={styles.toast}
                data-inspect="toast-stack-toast"
                data-slot={step.slots[index]}
              >
                <span className={styles.close} data-inspect="toast-stack-close">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 7l10 10M17 7 7 17" />
                  </svg>
                </span>
                <span className={styles.content}>
                  <span className={styles.icon} data-loading={loading ? '' : undefined}>
                    {toast.done ? (
                      <>
                        <Spinner />
                        {SUCCESS}
                      </>
                    ) : (
                      toast.icon
                    )}
                  </span>
                  <span className={styles.text}>
                    <span className={styles.title}>{text.title}</span>
                    <span className={styles.description}>{text.description}</span>
                  </span>
                  {toast.action && (
                    <span className={styles.action} data-inspect="toast-stack-action">
                      {toast.action}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
        <svg
          className={styles.pointer}
          data-over={step.pointer ? '' : undefined}
          viewBox="0 0 20 24"
          aria-hidden="true"
        >
          <path d="M3 2.5v16.2l4.1-4 2.7 6.3 2.9-1.2-2.7-6.3h5.8z" />
        </svg>
      </section>
    </div>
  );
}
