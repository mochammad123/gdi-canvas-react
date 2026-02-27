import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { lazy, Suspense, useRef, useState } from 'react';
import clsx from 'clsx';
import { Typography } from '@/components/ui/typhography';
import DelayedRender from '@/components/delayed-render';

// Lazy load section components
const BasicUsage = lazy(() => import('./sections/basic-usage'));
const HeaderCustomization = lazy(() => import('./sections/header-customization'));
const HeaderGrouping = lazy(() => import('./sections/header-grouping'));
const CustomRenderCell = lazy(() => import('./sections/custom-render-cell'));
const CheckboxSelection = lazy(() => import('./sections/checkbox-selection'));
const ClickRowAction = lazy(() => import('./sections/click-row-action'));
const FreezeColumn = lazy(() => import('./sections/freeze-column'));
const ExpandRow = lazy(() => import('./sections/expand-row'));
const Footer = lazy(() => import('./sections/footer'));
const Scrolling = lazy(() => import('./sections/scrolling'));
const ServerFilter = lazy(() => import('./sections/server-filter'));
const ColumnVirtualization = lazy(() => import('./sections/column-virtualization'));
const DynamicRowHeight = lazy(() => import('./sections/dynamic-row-height'));
const LargeDataset = lazy(() => import('./sections/large-datasets'));
const RegularTable = lazy(() => import('./sections/regular-table'));
const RowSpan = lazy(() => import('./sections/row-span'));
const RowReorder = lazy(() => import('./sections/row-reorder'));
const SelectedCellStyling = lazy(() => import('./sections/selected-cell-styling'));
const ApiReference = lazy(() => import('./sections/api-reference'));

export const TABLE_CONTENTS = [
  { title: 'Basic Usage', href: 'basic-usage' },
  { title: 'Header Customization', href: 'header-customization' },
  { title: 'Header Grouping', href: 'header-grouping' },
  { title: 'Custom Render Cell', href: 'custom-render-cell' },
  { title: 'Checkbox Selection', href: 'checkbox-selection' },
  { title: 'Click Row Action', href: 'click-row-action' },
  { title: 'Selected Cell Styling', href: 'selected-cell-styling' },
  { title: 'Freeze Column', href: 'freeze-column' },
  { title: 'Expand Row', href: 'expand-row' },
  { title: 'Footer', href: 'footer' },
  { title: 'Scrolling', href: 'scrolling' },
  { title: 'Server Filter', href: 'server-filter' },
  { title: 'Column Virtualization', href: 'column-virtualization' },
  { title: 'Dynamic Row Height', href: 'dynamic-row-height' },
  { title: 'Large Dataset', href: 'large-dataset' },
  { title: 'Regular Table', href: 'regular-table' },
  { title: 'Row Span', href: 'row-span' },
  { title: 'Row Reorder (Drag & Drop)', href: 'row-reorder' },
  { title: 'API Reference', href: 'api-reference' },
];

const SectionFallback = () => <div className="h-[800px] flex items-center justify-center">Loading...</div>;

function Table() {
  const [activeIndex, setActiveIndex] = useState(0);

  const listRef = useRef<HTMLDivElement | null>(null);

  const virtualizer = useWindowVirtualizer({
    count: TABLE_CONTENTS.length,
    estimateSize: () => 800,
    overscan: 0,
    scrollMargin: listRef.current?.offsetTop ?? 0,
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element.getBoundingClientRect().height
        : undefined,
  });

  const listItems = [
    <Suspense key="basic-usage" fallback={<SectionFallback />}>
      <BasicUsage id="basic-usage" />
    </Suspense>,
    <Suspense key="header-customization" fallback={<SectionFallback />}>
      <HeaderCustomization id="header-customization" />
    </Suspense>,
    <Suspense key="header-grouping" fallback={<SectionFallback />}>
      <HeaderGrouping id="header-grouping" />
    </Suspense>,
    <Suspense key="custom-render-cell" fallback={<SectionFallback />}>
      <CustomRenderCell id="custom-render-cell" />
    </Suspense>,
    <Suspense key="checkbox-selection" fallback={<SectionFallback />}>
      <CheckboxSelection id="checkbox-selection" />
    </Suspense>,
    <Suspense key="click-row-action" fallback={<SectionFallback />}>
      <ClickRowAction id="click-row-action" />
    </Suspense>,
    <Suspense key="selected-cell-styling" fallback={<SectionFallback />}>
      <SelectedCellStyling id="selected-cell-styling" />
    </Suspense>,
    <Suspense key="freeze-column" fallback={<SectionFallback />}>
      <FreezeColumn id="freeze-column" />
    </Suspense>,
    <Suspense key="expand-row" fallback={<SectionFallback />}>
      <ExpandRow id="expand-row" />
    </Suspense>,
    <Suspense key="footer" fallback={<SectionFallback />}>
      <Footer id="footer" />
    </Suspense>,
    <Suspense key="scrolling" fallback={<SectionFallback />}>
      <Scrolling id="scrolling" />
    </Suspense>,
    <Suspense key="server-filter" fallback={<SectionFallback />}>
      <ServerFilter id="server-filter" />
    </Suspense>,
    <Suspense key="column-virtualization" fallback={<SectionFallback />}>
      <ColumnVirtualization id="column-virtualization" />
    </Suspense>,
    <Suspense key="dynamic-row-height" fallback={<SectionFallback />}>
      <DynamicRowHeight id="dynamic-row-height" />
    </Suspense>,
    <Suspense key="large-dataset" fallback={<SectionFallback />}>
      <LargeDataset id="large-dataset" />
    </Suspense>,
    <Suspense key="regular-table" fallback={<SectionFallback />}>
      <RegularTable id="regular-table" />
    </Suspense>,
    <Suspense key="row-span" fallback={<SectionFallback />}>
      <RowSpan id="row-span" />
    </Suspense>,
    <Suspense key="row-reorder" fallback={<SectionFallback />}>
      <RowReorder id="row-reorder" />
    </Suspense>,
    <Suspense key="api-reference" fallback={<SectionFallback />}>
      <ApiReference />
    </Suspense>,
  ];

  return (
    <DelayedRender delay={100}>
      <div className="p-4 bg-knitto-blue-20 flex flex-col gap-y-3">
        <div className="space-y-0">
          <Typography as="h3">Knitto Table</Typography>
          <div className="h-2 w-72 bg-burnt-orange-100" />
        </div>

        <div className="w-full flex flex-row gap-x-4">
          <div
            style={{
              height: virtualizer.getTotalSize(),
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => (
              <div
                key={virtualItem.key}
                data-index={virtualItem.index}
                ref={(node) => virtualizer.measureElement(node)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start - virtualizer.options.scrollMargin}px)`,
                }}
              >
                {listItems[virtualItem.index]}
              </div>
            ))}
          </div>

          <div className="flex-none bg-white w-[18rem] border sticky top-14 rounded-md h-max">
            <Typography as="global-report-title" className="p-2.5">
              Table of Content
            </Typography>
            <div className="p-2.5 flex flex-col gap-y-2 items-start">
              {TABLE_CONTENTS.map((content, index) => (
                <button
                  key={content.title}
                  className={clsx('global-report-content', {
                    'border-b border-blue-900': activeIndex === index,
                    'text-burnt-orange-100': content.title == 'API Reference',
                  })}
                  onClick={() => {
                    virtualizer.scrollToIndex(index, { align: 'start', behavior: 'auto' });
                    setActiveIndex(index);
                  }}
                >
                  {content.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DelayedRender>
  );
}

export default Table;
