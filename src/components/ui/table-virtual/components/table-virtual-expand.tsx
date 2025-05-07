import ChevronIcon from '../../icon/chevron';

export default function TableVirtualExpand({ expanded, onExpand }: { expanded: boolean; onExpand: () => void }) {
  return (
    <div className="flex justify-center items-center size-6 hover:bg-gray-200" onClick={() => onExpand()}>
      <ChevronIcon color="black" rotate={expanded ? 'top' : 'bottom'} />
    </div>
  );
}
