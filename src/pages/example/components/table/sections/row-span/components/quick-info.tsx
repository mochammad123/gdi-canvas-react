import { memo } from 'react';

const QuickInfo = () => {
  return (
    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-3">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Rowspan Requirements & Best Practices</h3>
          <div className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
            <p>
              Rowspan functionality automatically merges consecutive duplicate values in table cells. This feature is{' '}
              <strong>exclusive to regular tables</strong> and requires specific setup.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">✅ Requirements:</h4>
                <ul className="space-y-1 text-xs">
                  <li>
                    • Must use <code className="bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded text-xs font-mono">useRegularTable={true}</code>
                  </li>
                  <li>
                    • Set <code className="bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded text-xs font-mono">enableRowSpan: true</code> in headers
                  </li>
                  <li>• Data must be pre-sorted by rowspan columns</li>
                  <li>• Only works with consecutive duplicate values</li>
                  <li>• Cannot be used with special columns (row-selection, expand, action)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Best Practices:</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Disable sorting on rowspan columns</li>
                  <li>• Sort data by hierarchical order (region → country → rep)</li>
                  <li>• Use with freeze columns for better UX</li>
                  <li>• Combine with colspan for complex layouts</li>
                  <li>• Test with different data sizes</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/50 rounded border-l-4 border-blue-500">
              <p className="text-xs font-medium text-blue-900 dark:text-blue-100">
                ⚠️ <strong>Important:</strong> Rowspan only works with regular tables. Virtual tables do not support this feature due to their
                rendering architecture. Data must be pre-sorted for proper merging.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(QuickInfo);
