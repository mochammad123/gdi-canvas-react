import { memo, useCallback, useMemo, useRef, useState } from 'react';
import ContentSection from '../../components/content-section';
import CodeBlock from '../../components/code-block';
import { CODE_EXAMPLES, ScrollPosition, getEmployeeHeaders } from './data';
import ToggleShowCode from '@/components/toggle-show-code';
import { generateEmployeeData } from '@/lib/variables/table-sample';
import { IVirtualTableRef, KnittoTable } from '@/components/ui/knitto-table';

function Scrolling({ id }: { id: string }) {
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);

  const data = useMemo(() => generateEmployeeData(100), []);
  const headers = useMemo(() => getEmployeeHeaders(), []);

  // 1. Scroll tracking
  const [scrollPos, setScrollPos] = useState<ScrollPosition>({ scrollTop: 0, scrollLeft: 0 });
  const handleScroll = useCallback((scrollTop: number, scrollLeft: number) => {
    setScrollPos({ scrollTop, scrollLeft });
  }, []);

  // 2. Programmatic scrolling
  const tableRef = useRef<IVirtualTableRef | null>(null);
  const scrollToTop = () => tableRef.current?.scrollElement?.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToBottom = () => tableRef.current?.scrollElement?.scrollTo({ top: tableRef.current?.scrollElement?.scrollHeight, behavior: 'smooth' });
  const scrollTo = (top: number, left: number = 0) => tableRef.current?.scrollElement?.scrollTo({ top, left, behavior: 'smooth' });

  // 3. Infinite loading
  const [infiniteData, setInfiniteData] = useState(data.slice(0, 50));
  const [bottomTouches, setBottomTouches] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleTouchBottom = useCallback(() => {
    if (loading) return;
    setBottomTouches((v) => v + 1);
    setLoading(true);
    setTimeout(() => {
      setInfiniteData((prev) => [...prev, ...generateEmployeeData(20)]);
      setLoading(false);
    }, 600);
  }, [loading]);

  return (
    <ContentSection id={id} title="Scrolling" className="mb-10">
      {/* 1. Scroll Tracking with onScroll Prop */}
      <div className="flex justify-between items-center mb-2">
        <span className="global-report-title">1. Scroll Tracking with onScroll Prop</span>
        <ToggleShowCode show={showCode1} setShow={setShowCode1} />
      </div>
      <div className="flex gap-4">
        <div className="flex-1 h-80">
          <KnittoTable headers={headers} data={data} rowKey="id" onScroll={handleScroll} />
        </div>
        <div className="w-80 border rounded-md p-3 bg-white">
          <div className="font-semibold mb-2">Current Scroll Position</div>
          <div className="text-sm">Scroll Top: {scrollPos.scrollTop}px</div>
          <div className="text-sm">Scroll Left: {scrollPos.scrollLeft}px</div>
          <div className="text-xs text-gray-600 mt-2">Sticky headers, progress indicator, or analytics can use this.</div>
        </div>
      </div>
      {showCode1 && (
        <div className="mt-3">
          <CodeBlock code={CODE_EXAMPLES.scrollTracking} title="Scroll Tracking Example" />
        </div>
      )}

      {/* 2. Programmatic Scrolling with Ref */}
      <div className="flex justify-between items-center mb-2 mt-6">
        <span className="global-report-title">2. Programmatic Scrolling with Ref</span>
        <ToggleShowCode show={showCode2} setShow={setShowCode2} />
      </div>
      <div className="mb-2 p-3 border rounded bg-green-50 text-green-800 text-sm">
        Use the ref prop to access the table&apos;s scroll element and implement programmatic scrolling. Great for navigation, search results, or
        user-controlled scrolling.
      </div>
      <div className="mb-2 flex gap-2">
        <button className="px-2 py-1 text-xs border rounded" onClick={scrollToTop}>
          Scroll to Top
        </button>
        <button className="px-2 py-1 text-xs border rounded" onClick={scrollToBottom}>
          Scroll to Bottom
        </button>
        <button className="px-2 py-1 text-xs border rounded" onClick={() => scrollTo(500)}>
          Scroll to 500px
        </button>
        <button className="px-2 py-1 text-xs border rounded" onClick={() => scrollTo(1000, 200)}>
          Scroll to (1000px, 200px)
        </button>
      </div>
      <div className="h-80 mb-2">
        <KnittoTable ref={tableRef} headers={headers} data={data} rowKey="id" />
      </div>
      {showCode2 && (
        <div className="mt-3">
          <CodeBlock code={CODE_EXAMPLES.programmaticScrolling} title="Programmatic Scrolling Example" />
        </div>
      )}

      {/* 3. Scroll Touch Bottom for Infinite Loading */}
      <div className="flex justify-between items-center mb-2 mt-6">
        <span className="global-report-title">3. Scroll Touch Bottom for Infinite Loading</span>
        <ToggleShowCode show={showCode3} setShow={setShowCode3} />
      </div>
      <div className="mb-2 p-3 border rounded bg-amber-50 text-amber-800 text-sm">
        Use the onScrollTouchBottom prop to detect when users scroll near the bottom. Perfect for implementing infinite loading, pagination, or lazy
        loading of data.
      </div>
      <div className="flex gap-4">
        <div className="flex-1 h-80">
          <KnittoTable headers={headers} isLoading={loading} data={infiniteData} rowKey="id" onScrollTouchBottom={handleTouchBottom} />
        </div>
        <div className="w-80 border rounded-md p-3 bg-white">
          <div className="font-semibold mb-2">Infinite Scroll Stats</div>
          <div className="text-sm">Total Records: {infiniteData.length}</div>
          <div className="text-sm">Bottom Touches: {bottomTouches}</div>
          <div className="text-sm">Loading: {loading ? 'Yes' : 'No'}</div>
          <div className="text-xs text-gray-600 mt-2">Threshold: ~100px from bottom. Throttled to prevent excessive calls.</div>
        </div>
      </div>
      {showCode3 && (
        <div className="mt-3">
          <CodeBlock code={CODE_EXAMPLES.infiniteScroll} title="Infinite Scroll Example" />
        </div>
      )}
    </ContentSection>
  );
}

export default memo(Scrolling);
