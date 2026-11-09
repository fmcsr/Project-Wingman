import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { AcmeSite } from '../demos/AcmeSite';
import { MuseApp } from '../demos/MuseApp';
import { OrbitDashboard } from '../demos/OrbitDashboard';
import { AcmeSlop } from '../demos/slop/AcmeSlop';
import { MuseSlop } from '../demos/slop/MuseSlop';
import { OrbitSlop } from '../demos/slop/OrbitSlop';
import { StrideSlop } from '../demos/slop/StrideSlop';
import { WaveSlop } from '../demos/slop/WaveSlop';
import { StrideApp } from '../demos/StrideApp';
import { WaveApp } from '../demos/WaveApp';
import { showcaseSpecs } from '../catalog';
import { InspectSurface } from '../inspector/InspectSurface';
import { InspectorLayerHost } from '../inspector/InspectorLayer';
import { BrowserFrame } from '../showcase/BrowserFrame';
import { InteractionGuide } from '../showcase/InteractionGuide';
import { PhoneFrame } from '../showcase/PhoneFrame';
import { ButtonLink } from './ButtonLink';
import { WORKSPACE_HREF } from './links';
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

/** The vague prompt behind the AI slop side; the Wingman side comes from a brief that names every element. */
function Prompt({ children }: { children: string }) {
  return (
    <p className={styles.prompt}>
      <span className={styles.promptLabel}>Vague prompt</span>
      <span className={styles.promptText}>“{children}”</span>
    </p>
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
 * Demo on the home page: five example projects, each as a before/after comparison. On the left, the AI slop a vague
 * prompt produces; on the right, the same product built from a Wingman brief, with every element inspectable. The full
 * library opens after sign-in, so only a few projects are shown here. Sites scroll in their own windows as the page
 * scrolls; phones sit in one row. Balloons are drawn on a shared layer that covers all the frames.
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
          title="Same idea."
          muted="Better words."
          description="Drag the line on each example. On the left, what an AI coding tool builds from a vague prompt. On the right, what it builds from a Wingman brief that names every element. Hover the right side to learn those names."
        />
        <InteractionGuide />
      </div>

      <div className={`container ${styles.stage}`}>
        <InspectorLayerHost className={styles.layer}>
          <div className={styles.scenes}>
            <BrowserFrame
              url="acme.app"
              label="Acme marketing site"
              before={<AcmeSlop />}
              header={
                <div className={styles.siteHeader}>
                  <ProjectMeta index="[01]" name="Acme" kind="Marketing site" count={counts.acme} />
                  <Prompt>Make a landing page for my product-planning SaaS.</Prompt>
                </div>
              }
            >
              <InspectSurface specs={showcaseSpecs} label="Acme marketing site" onCount={onCount.acme}>
                <AcmeSite />
              </InspectSurface>
            </BrowserFrame>

            <BrowserFrame
              url="app.orbit.io"
              label="Orbit analytics dashboard"
              before={<OrbitSlop />}
              header={
                <div className={styles.siteHeader}>
                  <ProjectMeta index="[02]" name="Orbit" kind="Analytics dashboard" count={counts.orbit} />
                  <Prompt>Build an analytics dashboard for my startup.</Prompt>
                </div>
              }
            >
              <InspectSurface specs={showcaseSpecs} label="Orbit analytics dashboard" onCount={onCount.orbit}>
                <OrbitDashboard />
              </InspectSurface>
            </BrowserFrame>

            <div ref={rowRef} className={styles.phones} style={{ '--phone-scale': scale } as CSSProperties}>
              <div className={styles.phoneProject}>
                <ProjectMeta index="[03]" name="Wave" kind="Habit tracker" count={counts.wave} />
                <PhoneFrame before={<WaveSlop />} label="Wave habit tracker">
                  <InspectSurface specs={showcaseSpecs} label="Wave habit tracker" onCount={onCount.wave} fill>
                    <WaveApp />
                  </InspectSurface>
                </PhoneFrame>
                <Prompt>Make a habit tracker app.</Prompt>
              </div>

              <div className={styles.phoneProject}>
                <ProjectMeta index="[04]" name="Muse" kind="AI assistant" count={counts.muse} />
                <PhoneFrame before={<MuseSlop />} label="Muse AI assistant">
                  <InspectSurface specs={showcaseSpecs} label="Muse AI assistant" onCount={onCount.muse} fill>
                    <MuseApp />
                  </InspectSurface>
                </PhoneFrame>
                <Prompt>Make an AI chat app.</Prompt>
              </div>

              <div className={styles.phoneProject}>
                <ProjectMeta index="[05]" name="Stride" kind="Shopping" count={counts.stride} />
                <PhoneFrame before={<StrideSlop />} label="Stride shopping app">
                  <InspectSurface specs={showcaseSpecs} label="Stride shopping app" onCount={onCount.stride} fill>
                    <StrideApp />
                  </InspectSurface>
                </PhoneFrame>
                <Prompt>Build a product page for a sneaker shop.</Prompt>
              </div>
            </div>
          </div>
        </InspectorLayerHost>
      </div>

      <div className={`container ${styles.more}`}>
        <p className={styles.moreText}>
          There's a lot more inside: a library of mobile apps and websites, every element explained.
        </p>
        <ButtonLink href={WORKSPACE_HREF} variant="primary" size="lg">
          Explore the library
        </ButtonLink>
      </div>
    </section>
  );
}
