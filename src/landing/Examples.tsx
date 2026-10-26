import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { AcmeSite } from '../demos/AcmeSite';
import { MuseApp } from '../demos/MuseApp';
import { OrbitDashboard } from '../demos/OrbitDashboard';
import { StrideApp } from '../demos/StrideApp';
import { WaveApp } from '../demos/WaveApp';
import { InspectSurface } from '../inspector/InspectSurface';
import { InspectorLayerHost } from '../inspector/InspectorLayer';
import { BrowserFrame } from '../showcase/BrowserFrame';
import { InteractionGuide } from '../showcase/InteractionGuide';
import { PhoneFrame } from '../showcase/PhoneFrame';
import { SectionHeader } from './SectionHeader';
import styles from './Examples.module.css';

type ProjectId = 'acme' | 'orbit' | 'wave' | 'muse' | 'stride';

/** Design width of the phone frame (matches PhoneFrame.module.css). */
const PHONE_WIDTH = 300;
const PHONE_COUNT = 3;

type ProjectMetaProps = {
  index: string;
  name: string;
  kind: string;
  count?: number;
};

function ProjectMeta({ index, name, kind, count }: ProjectMetaProps) {
  return (
    <div className={styles.meta}>
      <span className={styles.index}>{index}</span>
      <h3 className={styles.name}>{name}</h3>
      <span className={styles.kind}>{kind}</span>
      {count ? <span className={styles.count}>{count} elements</span> : null}
    </div>
  );
}

/** Scale that fits the three phones in a single row at any width; capped at 1 (actual size). */
function usePhoneScale() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () => {
      const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
      setScale(Math.min(1, (row.clientWidth - gap * (PHONE_COUNT - 1)) / (PHONE_COUNT * PHONE_WIDTH)));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

  return { rowRef, scale };
}

/**
 * Demo on the home page: five example projects. The full library opens after sign-in, so only a few
 * projects are shown here. Sites scroll in their own windows as the page scrolls; phones sit in one row.
 * Balloons are drawn on a shared layer that covers all the frames.
 */
export function Examples() {
  const [counts, setCounts] = useState<Partial<Record<ProjectId, number>>>({});
  const onCount = useMemo(() => {
    const update = (id: ProjectId) => (count: number) => setCounts((current) => ({ ...current, [id]: count }));
    return {
      acme: update('acme'),
      orbit: update('orbit'),
      wave: update('wave'),
      muse: update('muse'),
      stride: update('stride'),
    };
  }, []);
  const { rowRef, scale } = usePhoneScale();

  return (
    <section id="examples" className={styles.section} aria-labelledby="examples-title">
      <div className="container">
        <SectionHeader
          id="examples-title"
          index="[01]"
          label="Examples"
          title="Hover anything."
          muted="Learn what it's called."
          description="Five sample projects: a marketing site, an analytics dashboard, and three mobile apps. Every element explains itself."
        />
        <InteractionGuide />
      </div>

      <div className={`container ${styles.stage}`}>
        <InspectorLayerHost className={styles.layer}>
          <div className={styles.scenes}>
            <BrowserFrame
              url="acme.app"
              header={<ProjectMeta index="[01]" name="Acme" kind="Marketing site" count={counts.acme} />}
            >
              <InspectSurface label="Acme marketing site" onCount={onCount.acme}>
                <AcmeSite />
              </InspectSurface>
            </BrowserFrame>

            <BrowserFrame
              url="app.orbit.io"
              header={<ProjectMeta index="[02]" name="Orbit" kind="Analytics dashboard" count={counts.orbit} />}
            >
              <InspectSurface label="Orbit analytics dashboard" onCount={onCount.orbit}>
                <OrbitDashboard />
              </InspectSurface>
            </BrowserFrame>

            <div ref={rowRef} className={styles.phones} style={{ '--phone-scale': scale } as CSSProperties}>
              <div className={styles.phoneProject}>
                <ProjectMeta index="[03]" name="Wave" kind="Habit tracker" count={counts.wave} />
                <PhoneFrame>
                  <InspectSurface label="Wave habit tracker" onCount={onCount.wave} fill>
                    <WaveApp />
                  </InspectSurface>
                </PhoneFrame>
              </div>

              <div className={styles.phoneProject}>
                <ProjectMeta index="[04]" name="Muse" kind="AI assistant" count={counts.muse} />
                <PhoneFrame>
                  <InspectSurface label="Muse AI assistant" onCount={onCount.muse} fill>
                    <MuseApp />
                  </InspectSurface>
                </PhoneFrame>
              </div>

              <div className={styles.phoneProject}>
                <ProjectMeta index="[05]" name="Stride" kind="Shopping" count={counts.stride} />
                <PhoneFrame>
                  <InspectSurface label="Stride shopping app" onCount={onCount.stride} fill>
                    <StrideApp />
                  </InspectSurface>
                </PhoneFrame>
              </div>
            </div>
          </div>
        </InspectorLayerHost>
      </div>
    </section>
  );
}
