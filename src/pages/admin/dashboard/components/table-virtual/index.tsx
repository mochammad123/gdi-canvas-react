import { Typography } from '@/components/ui/typhography';
import { dataSource, getHeaders } from './data';
import { TableVirtual } from '@/components/ui/table-virtual';
import { useState } from 'react';

export default function SectionTableVirtual() {
  return (
    <div className="flex flex-col gap-3 mt-10">
      <Typography as="h3">Table Virtual</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="py-2.5">
        <Typography as="global-report-content">
          Menampilkan: <b>{dataSource.length}</b> data
        </Typography>
      </div>

      <div className="w-full h-[50rem]">
        <TableVirtual
          headers={getHeaders(dataSource)}
          dataSource={dataSource}
          isLoading={false}
          stickyFooterHeight={40}
          onChangeAdvanceFilter={(props) => console.log('CHANGE ADVANCE FILTER', props)}
          onChangeFilter={(props) => console.log('CHANGE FILTER', props)}
          onChangeSort={(sortKey, sortBy) => console.log('CHANGE SORT', sortKey, sortBy)}
          onScrollTouchBottom={() => console.log('SCROLL TOUCH BOTTOM')}
          onClickRow={(data, rowIndex) => console.log('CLICK ROW', { data, rowIndex })}
          renderRightClickRow={(data, value, callbackFn) => <RightClickContent data={data} value={value} callbackFn={callbackFn} />}
        />
      </div>
    </div>
  );
}

interface IRightClickContentProps {
  data: Record<string, string | number> | null;
  value: string | number;
  callbackFn?: () => void;
}

const RightClickContent = ({ data, value, callbackFn }: IRightClickContentProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClickHapus = () => {
    alert(`Hapus: ${JSON.stringify(data, null, 2)}`);
    callbackFn?.();
  };

  const handleClickCopy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = value.toString();
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999);

    try {
      document.execCommand('copy');
    } catch (err) {
      navigator.clipboard.writeText(value.toString());
    }

    document.body.removeChild(textArea);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
      callbackFn?.();
    }, 150);
  };

  return (
    <div className="max-w-sm overflow-auto p-4 text-sm flex flex-col gap-2">
      <button className="cursor-pointer p-1.5 bg-red-600 text-white rounded inline-flex items-center" onClick={handleClickHapus}>
        Hapus
      </button>
      <button className="cursor-pointer p-1.5 bg-blue-950 text-white rounded inline-flex items-center" onClick={handleClickCopy}>
        {isCopied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
};
