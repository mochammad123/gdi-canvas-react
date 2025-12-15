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
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Regular Table vs Virtual Table</h3>
          <div className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
            <p>
              When you set <code className="bg-blue-100 dark:bg-blue-900 px-1.5 py-0.5 rounded text-xs font-mono">useRegularTable</code>, the table
              switches to native HTML table elements and disables virtualization capabilities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">✅ Available Features:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Native HTML table semantics</li>
                  <li>• Rowspan merging (enableRowSpan)</li>
                  <li>• Freeze columns (left/right)</li>
                  <li>• Group headers (colspan)</li>
                  <li>• All filtering & sorting</li>
                  <li>• Row selection & expansion</li>
                  <li>• Custom cell rendering</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">❌ Disabled Features:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Row virtualization</li>
                  <li>• Column virtualization</li>
                  <li>• Infinite scroll optimization</li>
                  <li>• Large dataset performance</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/50 rounded border-l-4 border-blue-500">
              <p className="text-xs font-medium text-blue-900 dark:text-blue-100">
                💡 <strong>Best for:</strong> Small to medium datasets (&lt;1000 rows), when you need standard table semantics, or when you require
                rowspan functionality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(QuickInfo);
