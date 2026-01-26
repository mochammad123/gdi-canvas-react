import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import ContentSection from '../../components/content-section';
import { KnittoTable, type IHeader } from '@/components/ui/knitto-table';
import CodeBlock from '../../components/code-block';
import ToggleShowCode from '@/components/toggle-show-code';
import { CODE_EXAMPLES } from './constants';
import { fetchCombinedData } from './api';
import { getUserHeaders } from './headers';
import type { CombinedData, ServerFilters } from './types';

function ServerFilter({ id }: { id: string }) {
  const [showCode, setShowCode] = useState(false);
  const [data, setData] = useState<CombinedData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Track server filter states so we can re-fetch
  const [filters, setFilters] = useState<ServerFilters>({
    search: {},
    sort: { key: null, order: 'unset' },
    selection: {},
    advance: {},
  });

  const headers = useMemo<IHeader<CombinedData>[]>(() => getUserHeaders(), []);

  const refetch = useCallback(
    async (next?: Partial<ServerFilters>) => {
      setLoading(true);
      try {
        const merged = { ...filters, ...(next || {}) } as ServerFilters;
        const payload = {
          search: Object.keys(merged.search).length ? merged.search : undefined,
          selection: Object.keys(merged.selection).length ? merged.selection : undefined,
          advance: Object.keys(merged.advance).length ? merged.advance : undefined,
          sort: merged.sort.key ? { key: merged.sort.key as string, order: merged.sort.order } : undefined,
        };
        const result = await fetchCombinedData(payload);
        setData(result);
        if (next) setFilters(merged);
      } catch (_error) {
        console.error('Error fetching data', _error);
        setData([]);
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  // initial fetch
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <ContentSection id={id} title="Server Filter" className="mb-10">
      <div className="flex justify-between items-center mb-2">
        <span className="global-report-title">Fetch + Filter on Server (JSONPlaceholder)</span>
        <ToggleShowCode show={showCode} setShow={setShowCode} />
      </div>

      <div className="h-96 mb-2.5 mt-2.5">
        <KnittoTable
          headers={headers}
          data={data}
          rowKey="id"
          headerMode="double"
          rowHeight={32}
          headerHeight={40}
          filterHeight={32}
          isLoading={loading}
          useServerFilter={{ sort: true, search: true, selection: true, advance: true }}
          onChangeFilter={{
            sort: (key, order) => refetch({ sort: { key, order } }),
            search: (search) => refetch({ search }),
            selection: (selection) => refetch({ selection }),
            advance: (advance) => refetch({ advance }),
          }}
        />
      </div>

      {showCode && (
        <div className="mt-3 space-y-3">
          <CodeBlock code={CODE_EXAMPLES.main} title="Server Filter Example" />
          <CodeBlock code={CODE_EXAMPLES.enableServerFilter} title="Enable Server Filter Props" />
          <CodeBlock code={CODE_EXAMPLES.handleFilterChanges} title="Handle Filter Changes" />
          <CodeBlock code={CODE_EXAMPLES.serverSideProcessing} title="Example Server-Side Processing" />
        </div>
      )}
    </ContentSection>
  );
}

export default memo(ServerFilter);
