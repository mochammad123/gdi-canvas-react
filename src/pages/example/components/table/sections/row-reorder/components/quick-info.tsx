import { memo } from 'react';

const QuickInfo = () => {
  return (
    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-2.5">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Row Reorder dengan Drag and Drop</h3>
          <div className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
            <p>
              Fitur ini memungkinkan pengguna untuk menukar posisi row dengan drag and drop. Gunakan prop{' '}
              <code className="bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded text-xs font-mono">onReorderRows</code> untuk mengaktifkan fitur
              ini.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Persyaratan:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Data harus berupa state (useState) agar bisa di-update</li>
                  <li>• Callback menerima fromIndex dan toIndex (indeks di data yang ditampilkan)</li>
                  <li>• Mendukung Regular Table dan Virtual Table</li>
                  <li>• Menggunakan HTML5 native Drag and Drop API (tanpa library)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Dua Mode Reorder:</h4>
                <ul className="space-y-1 text-xs">
                  <li>
                    • <strong>Whole row</strong>: <code>reorderOnlyFromToggle=false</code> — drag dari mana saja di row
                  </li>
                  <li>
                    • <strong>Handle only</strong>: <code>reorderOnlyFromToggle=true</code> — drag hanya dari kolom row-reorder
                  </li>
                  <li>
                    • Mode handle memerlukan kolom <code>key: `row-reorder`</code> di headers
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/50 rounded border-l-4 border-blue-500">
              <p className="text-xs font-medium text-blue-900 dark:text-blue-100">
                <strong>Catatan:</strong> Indeks <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">fromIndex</code> dan{' '}
                <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">toIndex</code> merujuk ke data yang ditampilkan (setelah filter). Pastikan
                parent mengelola data dengan benar untuk menampilkan urutan yang diinginkan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(QuickInfo);
