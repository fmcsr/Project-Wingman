import { StatusBar } from '../StatusBar';
import styles from './MuseSlop.module.css';

const OUTLINE = ['📌 Overview', '🎯 Goals & Metrics', '👥 User Stories', '✅ Launch Plan'];
const REACTIONS = ['👍', '👎', '📋', '🔄'];
const SUGGESTIONS = ['💡 Brainstorm ideas', '✍️ Write an email', '📊 Analyze data'];

/** The glowing gradient orb that stands in for the assistant's avatar. */
function Orb({ large = false }: { large?: boolean }) {
  return <span className={large ? `${styles.orb} ${styles.orbLarge}` : styles.orb} data-inspect="avatar">✨</span>;
}

/**
 * The AI slop version of Muse: what "Make an AI chat app" tends to produce. A dark screen with purple, blue and pink
 * blobs, a glowing gradient orb, a "PRO" badge, glass bubbles with emoji-bullet answers, a gradient send button and a
 * "thinking" indicator. A picture for comparison: nothing is focusable, and its elements are explained in
 * src/catalog/slopPhones.ts.
 */
export function MuseSlop() {
  return (
    <div className={styles.app}>
      <StatusBar className={styles.statusBar} />

      <header className={styles.header} data-inspect="navbar">
        <span className={styles.iconButton} data-inspect="icon-button">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </span>
        <span className={styles.identity}>
          <Orb large />
          <span className={styles.identityText}>
            <span className={styles.name}>Muse AI</span>
            <span className={styles.status}>
              <span className={styles.online} />
              Online
            </span>
          </span>
        </span>
        <span className={styles.pro} data-inspect="badge">PRO ✨</span>
      </header>

      <div className={styles.chat}>
        <span className={styles.day}>Today ✨</span>

        <div className={styles.aiRow}>
          <Orb />
          <p className={styles.received} data-inspect="chat-bubble">
            Hi! 👋 I'm Muse, your AI assistant. How can I help? ✨
          </p>
        </div>

        <p className={styles.sent} data-inspect="chat-bubble">Help me write a PRD 🙏</p>

        <div className={styles.aiRow}>
          <Orb />
          <div>
            <div className={styles.received} data-inspect="chat-bubble">
              Absolutely! 🚀 Here you go:
              <ul className={styles.outline} data-inspect="bullet-list">
                {OUTLINE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.reactions} data-inspect="message-actions">
              {REACTIONS.map((reaction) => (
                <span key={reaction} className={styles.reaction}>
                  {reaction}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.aiRow}>
          <Orb />
          <span className={styles.thinking} data-inspect="typing-indicator">
            Muse is thinking
            <span className={styles.dots}>
              <span />
              <span />
              <span />
            </span>
          </span>
        </div>
      </div>

      <div className={styles.suggestions} data-inspect="suggestion-chips">
        {SUGGESTIONS.map((suggestion) => (
          <span key={suggestion} className={styles.suggestion}>
            {suggestion}
          </span>
        ))}
      </div>

      <div className={styles.composer} data-inspect="composer">
        <span className={styles.attach}>📎</span>
        <span className={styles.placeholder}>Ask me anything... ✨</span>
        <span className={styles.send} data-inspect="send-button">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path d="M12 19V5M5.5 11.5L12 5l6.5 6.5" />
          </svg>
        </span>
      </div>
      <p className={styles.footnote} data-inspect="footnote">⚡ Powered by advanced AI</p>

      <span className={styles.homeIndicator} data-inspect="home-indicator" />
    </div>
  );
}
