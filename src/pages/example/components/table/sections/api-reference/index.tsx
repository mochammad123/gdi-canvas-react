import { Typography } from '@/components/ui/typhography';
import CodeBlock from '../../components/code-block';

function ApiReference() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Typography as="h2">API Reference</Typography>
        <Typography as="global-paragraph" className="text-sm text-gray-600">
          Dokumentasi untuk props, methods, dan types yang tersedia.
        </Typography>
      </div>

      {/* Props Section */}
      <section className="space-y-4">
        <Typography as="h3">Props</Typography>
        <Typography as="global-paragraph" className="text-sm text-gray-600">
          Interface: <code className="px-1.5 py-0.5 bg-gray-300 rounded">IKnittoTable&lt;TData&gt;</code>
        </Typography>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 bg-white text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Prop</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Default</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Required</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>headers</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>IHeader&lt;TData&gt;[]</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span className="text-red-600 font-semibold">✓</span>
                </td>
                <td className="border border-gray-300 px-4 py-2">Array definisi kolom tabel</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>data</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>TData[]</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span className="text-red-600 font-semibold">✓</span>
                </td>
                <td className="border border-gray-300 px-4 py-2">Array data yang akan ditampilkan</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>rowKey</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>keyof TData | ((data: TData, index: number) =&gt; string)</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span className="text-red-600 font-semibold">✓</span>
                </td>
                <td className="border border-gray-300 px-4 py-2">Key unik untuk setiap row. Bisa property key atau function</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>headerMode</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>&apos;single&apos; | &apos;double&apos;</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>&apos;double&apos;</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Mode header. &apos;double&apos; untuk header grouping</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>isLoading</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>false</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Menampilkan loading indicator overlay</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>isResetFilter</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>false</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Reset semua filter ke kondisi awal</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>useFooter</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>false</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Menampilkan footer tabel</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>useAutoSizer</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>true</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Auto resize sesuai parent container</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>useRegularTable</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>false</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Gunakan native HTML table elements (tidak ada virtualization)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>useDynamicRowHeight</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>false</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">
                  Dynamic row height berdasarkan konten. Requires <code className="px-1 bg-gray-100 rounded">enableColumnVirtualization=false</code>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>enableColumnVirtualization</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>true</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Enable column virtualization</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>rowHeight</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>number</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">28</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Tinggi setiap row dalam pixels</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>headerHeight</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>number</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">32</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Tinggi header dalam pixels</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>filterHeight</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>number</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">28</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Tinggi filter row dalam pixels</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>footerHeight</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>number</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">32</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Tinggi footer dalam pixels</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>hideHeader</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>false</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Sembunyikan header</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>classNameOuterTable</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>string</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Custom CSS class untuk container</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>classNameCell</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>(data: TData, rowIndex: number, columnIndex: number, opts?: object) =&gt; string</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Dynamic CSS class untuk cell berdasarkan data dan posisi</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>useSessionFilter</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>{'{ tableKey: string }'}</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Simpan filter state di session storage dengan key yang unik</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>useServerFilter</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>{'{ sort?: boolean, search?: boolean, selection?: boolean, advance?: boolean }'}</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>{'{ sort: false, search: false, selection: false, advance: false }'}</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Enable server-side filtering untuk filter tertentu</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>onClickRow</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>(item: TData, rowIndex: number, columnIndex: number, groupOfItems?: TData[]) =&gt; void</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Callback saat row diklik. groupOfItems tersedia jika row memiliki rowspan</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>onDoubleClickRow</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>(item: TData, rowIndex: number, columnIndex: number) =&gt; void</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Callback saat row di double-click</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>onRightClickRow</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>(item: TData, position: {'{ x: number, y: number }'}) =&gt; void</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Callback saat row di right-click dengan posisi mouse</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>onReorderRows</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>(fromIndex: number, toIndex: number) =&gt; void</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">
                  Callback saat urutan row berubah via drag-drop. Ketika disediakan, row menjadi draggable. Mendukung Regular Table dan Virtual Table.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>reorderOnlyFromToggle</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>false</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">
                  Ketika true, drag hanya dari kolom row-reorder. Memerlukan kolom dengan key &apos;row-reorder&apos; di headers.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>onRenderExpandedContent</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>(item: TData) =&gt; ReactNode</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Render konten expanded row</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>onChangeCheckboxRowSelection</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>(selectedRows: (string | number)[], deselectedRows: (string | number)[], isSelectAll: boolean) =&gt; void</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Callback saat checkbox selection berubah</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>onChangeFilter</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>
                    {
                      '{ sort?: (key: keyof TData, sortBy: TSortOrder) => void, search?: (data: Record<keyof TData, string>) => void, selection?: (data: Record<keyof TData, string[]>) => void, advance?: (data: Record<keyof TData, { config_name: TFilterAdvanceConfig, value: string }>) => void }'
                    }
                  </code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Callback untuk filter changes (digunakan dengan server-side filtering)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>onScrollTouchBottom</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>() =&gt; void</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Callback saat scroll mencapai bottom (untuk infinite scroll)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>onScroll</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>(scrollTop: number, scrollLeft: number) =&gt; void</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Callback saat tabel di-scroll dengan posisi scroll</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Header Props Section */}
      <section className="space-y-4">
        <Typography as="h3">Header Props</Typography>
        <Typography as="global-paragraph" className="text-sm text-gray-600">
          Interface: <code className="px-1.5 py-0.5 bg-gray-300 rounded">IHeader&lt;TData&gt;</code>
        </Typography>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 bg-white text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Prop</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Default</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Required</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>key</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>keyof TData | &apos;expand&apos; | &apos;action&apos; | &apos;row-selection&apos; | string</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span className="text-red-600 font-semibold">✓</span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Key unik kolom. Bisa property key atau special keys seperti &apos;expand&apos;, &apos;action&apos;, &apos;row-selection&apos;
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>caption</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>string</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span className="text-red-600 font-semibold">✓</span>
                </td>
                <td className="border border-gray-300 px-4 py-2">Teks header kolom</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>width</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>number</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">160</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Lebar kolom dalam pixels</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>noStretch</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>false</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Prevent column stretching untuk mengisi ruang yang tersedia</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>freeze</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>&apos;left&apos; | &apos;right&apos;</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Freeze kolom ke kiri atau kanan saat scroll horizontal</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>visible</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>true</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Visibility kolom</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>hideHeaderAction</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>false</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Sembunyikan header action buttons (sort, filter, dll)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>hideFilter</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>{'{ sort?: boolean, search?: boolean, filterSelection?: boolean, filterAdvance?: boolean }'}</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Sembunyikan filter tertentu untuk kolom ini</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>filterSelectionOptions</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>string[]</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Options untuk selection filter dropdown</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>renderHeader</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>() =&gt; ReactNode</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Custom render untuk header cell</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>renderCell</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>(item: TData) =&gt; ReactNode</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Custom render untuk table cell</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>renderExpandToggle</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>(item: TData, isExpanded: boolean) =&gt; ReactNode</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Custom render untuk expand/collapse toggle (hanya untuk key=&apos;expand&apos;)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>renderFooter</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>() =&gt; ReactNode</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Custom render untuk footer cell (summary atau totals)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>children</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>Omit&lt;IHeader&lt;TData&gt;, &apos;freeze&apos;&gt;[]</code>
                </td>
                <td className="border border-gray-300 px-4 py-2">-</td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">
                  Nested columns untuk header grouping (dengan headerMode=&apos;double&apos;). Note: child columns tidak bisa menggunakan freeze
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>enableRowSpan</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>false</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">
                  Enable rowspan merging untuk nilai duplikat berturut-turut. Hanya bekerja dengan{' '}
                  <code className="px-1 bg-gray-100 rounded">useRegularTable=true</code>. Data harus sudah di-sort berdasarkan kolom ini.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>disableResizeColumn</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-xs">
                  <code>false</code>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">-</td>
                <td className="border border-gray-300 px-4 py-2">Nonaktifkan resize kolom untuk kolom ini</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Ref Methods Section */}
      <section className="space-y-4">
        <Typography as="h3">Ref Methods</Typography>
        <Typography as="global-paragraph" className="text-sm text-gray-600">
          Interface: <code className="px-1.5 py-0.5 bg-gray-300 rounded">IVirtualTableRef</code>
        </Typography>

        <div className="space-y-3">
          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <code className="px-2 py-1 bg-white border border-gray-300 rounded font-mono text-sm">virtualizer</code>
                <span className="text-sm text-gray-600">:</span>
                <code className="px-2 py-1 bg-white border border-gray-300 rounded font-mono text-sm">
                  Virtualizer&lt;HTMLDivElement, Element&gt; | null
                </code>
              </div>
              <Typography as="global-paragraph" className="text-sm text-gray-700">
                Virtualizer instance dari TanStack Virtual untuk kontrol programmatic scrolling dan rendering.
              </Typography>
              <CodeBlock
                title="Virtualizer Example"
                code={`import { useRef } from 'react';
import { KnittoTable, type IVirtualTableRef } from '@/components/ui/knitto-table';

const MyTable = () => {
  const tableRef = useRef<IVirtualTableRef>(null);

  const scrollToIndex = (index: number) => {
    tableRef.current?.virtualizer?.scrollToIndex(index, {
      align: 'start',
      behavior: 'smooth',
    });
  };

  return (
    <KnittoTable
      ref={tableRef}
      headers={headers}
      data={data}
      rowKey="id"
    />
  );
};`}
              />
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <code className="px-2 py-1 bg-white border border-gray-300 rounded font-mono text-sm">scrollElement</code>
                <span className="text-sm text-gray-600">:</span>
                <code className="px-2 py-1 bg-white border border-gray-300 rounded font-mono text-sm">HTMLDivElement | null</code>
              </div>
              <Typography as="global-paragraph" className="text-sm text-gray-700">
                Scroll element DOM untuk kontrol scroll langsung.
              </Typography>
              <CodeBlock
                title="ScrollElement Example"
                code={`import { useRef } from 'react';
import { KnittoTable, type IVirtualTableRef } from '@/components/ui/knitto-table';

const MyTable = () => {
  const tableRef = useRef<IVirtualTableRef>(null);

  const scrollToTop = () => {
    tableRef.current?.scrollElement?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <KnittoTable
      ref={tableRef}
      headers={headers}
      data={data}
      rowKey="id"
    />
  );
};`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Types Section */}
      <section className="space-y-4">
        <Typography as="h3">Types & Interfaces</Typography>

        <div className="space-y-3">
          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <Typography as="h4" className="font-semibold mb-2">
              TSortOrder
            </Typography>
            <Typography as="global-paragraph" className="text-sm text-gray-600 mb-2">
              Type untuk sort order pada kolom.
            </Typography>
            <CodeBlock title="TSortOrder Type" code={`type TSortOrder = 'asc' | 'desc' | 'unset';`} />
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <Typography as="h4" className="font-semibold mb-2">
              TFilterAdvanceConfig
            </Typography>
            <Typography as="global-paragraph" className="text-sm text-gray-600 mb-2">
              Type untuk advanced filter configuration. Operator yang tersedia: none, equal, notEqual, startsWith, endsWith, contains, notContains.
            </Typography>
            <CodeBlock
              title="TFilterAdvanceConfig Type"
              code={`type TFilterAdvanceConfig = 
  | 'none'
  | 'equal'
  | 'notEqual'
  | 'startsWith'
  | 'endsWith'
  | 'contains'
  | 'notContains';`}
            />
          </div>
        </div>
      </section>

      {/* Example Usage */}
      <section className="space-y-4">
        <Typography as="h3">Contoh Penggunaan</Typography>

        <div className="space-y-3">
          <CodeBlock
            title="Complete Usage Example"
            code={`import { KnittoTable, type IHeader, type IVirtualTableRef } from '@/components/ui/knitto-table';

type User = {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
};

const headers: IHeader<User>[] = [
  { key: 'row-selection', caption: '', width: 50 },
  { key: 'id', caption: 'ID', width: 80 },
  { 
    key: 'name', 
    caption: 'Name', 
    width: 200,
    filterSelectionOptions: ['Active', 'Inactive'],
  },
  { key: 'email', caption: 'Email', width: 250 },
  { 
    key: 'status', 
    caption: 'Status', 
    width: 120,
    renderCell: (item) => (
      <span className={item.status === 'active' ? 'text-green-600' : 'text-red-600'}>
        {item.status}
      </span>
    ),
  },
];

const MyTable = () => {
  const tableRef = useRef<IVirtualTableRef>(null);
  const [data, setData] = useState<User[]>([]);

  return (
    <div className="h-[600px]">
      <KnittoTable
        ref={tableRef}
        headers={headers}
        data={data}
        rowKey="id"
        headerMode="double"
        isLoading={false}
        onChangeCheckboxRowSelection={(selected, deselected, isSelectAll) => {
          console.log('Selected:', selected);
        }}
        onClickRow={(item, rowIndex, columnIndex) => {
          console.log('Clicked:', item);
        }}
      />
    </div>
  );
};`}
          />
        </div>
      </section>
    </div>
  );
}

export default ApiReference;
