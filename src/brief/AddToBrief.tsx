import type { LibraryExample } from '../library';
import { isInBrief, toggleInBrief, useBrief } from './briefStore';
import styles from './AddToBrief.module.css';

type AddToBriefProps = {
  example: LibraryExample;
  /** The element's `data-inspect` id. */
  specId: string;
  /** `balloon` sits on the explainer balloon's dark surface, `page` on the page. */
  tone?: 'balloon' | 'page';
  /** The id of the element's name, so a list of these buttons reads as "Add to brief: Navbar". */
  describedBy?: string;
};

/** Puts an element of an example in the brief, or takes it out again. */
export function AddToBrief({ example, specId, tone = 'page', describedBy }: AddToBriefProps) {
  const brief = useBrief();
  const ref = { platform: example.platform, exampleId: example.id, specId };
  const added = isInBrief(brief, ref);

  return (
    <button
      type="button"
      className={styles.button}
      data-tone={tone}
      data-added={added || undefined}
      title={added ? 'Remove from brief' : undefined}
      aria-describedby={describedBy}
      onClick={() => toggleInBrief(ref)}
    >
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <path d={added ? 'm3.5 8.5 3 3 6-7' : 'M8 3v10M3 8h10'} />
      </svg>
      {added ? 'Added to brief' : 'Add to brief'}
    </button>
  );
}
