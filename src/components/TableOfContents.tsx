import type { FunctionalComponent } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import cn from 'classnames';
import { unescapeHtml } from '../utils';

interface Props {
  headers: { depth: number; slug: string; text: string }[];
}

const TableOfContents: FunctionalComponent<Props> = ({ headers = [] }) => {
  const targetedHeaders = [...headers].filter(
    ({ depth }) => depth > 1 && depth < 4
  );
  const toc = useRef<HTMLUListElement>();
  const [currentID, setCurrentID] = useState(targetedHeaders[0].slug);
  const onThisPageID = 'on-this-page-heading';

  useEffect(() => {
    if (!toc.current) {
      return;
    }

    const setCurrent: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const { id } = entry.target;
          if (id === onThisPageID) {
            continue;
          }
          setCurrentID(entry.target.id);
          break;
        }
      }
    };

    const observerOptions: IntersectionObserverInit = {
      // Negative top margin accounts for `scroll-margin`.
      // Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
      rootMargin: '-90px 0% -66%',
      threshold: 1,
    };

    const headingsObserver = new IntersectionObserver(
      setCurrent,
      observerOptions
    );

    // Observe all the headings in the main page content.
    document
      .querySelectorAll('main :is(h1,h2,h3)')
      .forEach((h) => headingsObserver.observe(h));

    // Stop observing when the component is unmounted.
    return () => headingsObserver.disconnect();
  }, [toc.current]);

  const onLinkClick = (e) => {
    setCurrentID(e.target.getAttribute('href').replace('#', ''));
  };

  return (
    <>
      <h2
        class="text-secondary dark:text-secondary-dark mb-3 w-full px-4 text-sm font-bold uppercase tracking-wide lg:mb-3"
        id={onThisPageID}
      >
        On This Page
      </h2>
      <ul
        class="m-0 h-full list-none space-y-1 overflow-y-auto pb-16 pl-4"
        ref={toc}
      >
        {targetedHeaders.map(({ depth, slug, text }) => (
          <li
            class={cn('m-0 rounded-l-lg px-2 text-sm', {
              'dark:bg-highlight-dark bg-blue-300': currentID === slug,
              'pl-8': depth === 3,
            })}
          >
            <a
              href={`#${slug}`}
              onClick={onLinkClick}
              class="text-link dark:text-link-dark hover:text-link dark:hover:text-link-dark block py-2 font-bold leading-normal"
            >
              {unescapeHtml(text)}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TableOfContents;
