'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  level: 2 | 3;
  title: string;
}

interface BlogArticleToolsProps {
  labels: {
    share: string;
    copied: string;
    copyFailed: string;
    backToTop: string;
  };
}

export function BlogArticleTableOfContents({ headings, label }: { headings: Heading[]; label: string }) {
  const [activeHeading, setActiveHeading] = useState(headings[0]?.id ?? '');

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveHeading(visible[0].target.id);
    }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

    headings.forEach(({ id }) => {
      const heading = document.getElementById(id);
      if (heading) observer.observe(heading);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label={label} className="blog-toc-nav">
      <h2 className="mb-4 text-sm font-black text-gray-900">{label}</h2>
      <ol className="space-y-1.5">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'ps-3' : ''}>
            <a
              href={`#${encodeURIComponent(heading.id)}`}
              aria-current={activeHeading === heading.id ? 'location' : undefined}
              className={`block rounded-lg px-3 py-2 text-sm leading-6 transition-colors ${activeHeading === heading.id ? 'bg-[#841474]/10 font-bold text-[#841474]' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950'}`}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function BlogArticleTools({ labels }: BlogArticleToolsProps) {
  const [shareMessage, setShareMessage] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const article = document.getElementById('blog-article-content');
        if (article) {
          const top = window.scrollY + article.getBoundingClientRect().top;
          const distance = Math.max(1, article.offsetHeight - window.innerHeight);
          setScrollProgress(Math.min(100, Math.max(0, ((window.scrollY - top) / distance) * 100)));
        }
        setShowBackToTop(window.scrollY > 700);
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  async function shareArticle() {
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url: window.location.href });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setShareMessage(labels.copied);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setShareMessage(labels.copyFailed);
    }

    window.setTimeout(() => setShareMessage(''), 2500);
  }

  return (
    <>
      <div className="blog-reading-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress / 100})` }} />
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <button type="button" onClick={shareArticle} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-sm font-bold text-gray-700 shadow-sm transition hover:border-[#841474]/40 hover:text-[#841474]">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.7 10.7 6.6-4.4M8.7 13.3l6.6 4.4"/></svg>
          {labels.share}
        </button>
        {shareMessage && <span role="status" className="text-sm text-gray-500">{shareMessage}</span>}
      </div>

      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={labels.backToTop}
          title={labels.backToTop}
          className="fixed end-5 bottom-6 z-40 inline-flex size-11 items-center justify-center rounded-full bg-[#841474] text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#6f0f61]"
        >
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </button>
      )}
    </>
  );
}
