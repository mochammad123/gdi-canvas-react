interface FilterActionProps {
  headerKey: string;
  onReset?: () => void;
  onApply?: () => void;
}

export default function FilterAction({ headerKey, onReset, onApply }: FilterActionProps) {
  return (
    <div className="flex justify-end space-x-2.5 border-t border-gray-300 px-1.5 py-2 mt-1.5">
      <button data-testid={`kn-table-filter-action-reset-btn-${headerKey}`} className="cursor-pointer" onClick={onReset}>
        Reset
      </button>
      <button
        data-testid={`kn-table-filter-action-apply-btn-${headerKey}`}
        className="cursor-pointer px-1.5 py-0.5 bg-blue-950 text-white rounded"
        onClick={onApply}
      >
        Filter
      </button>
    </div>
  );
}
