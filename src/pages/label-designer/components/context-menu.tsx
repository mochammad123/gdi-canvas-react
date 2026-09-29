import React, { useEffect, useRef } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  selectedCount: number;
  hasLockedInSelection: boolean;
  onClose: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onToggleLock: () => void;
  onBringFront: () => void;
  onSendBack: () => void;
  onAlignLeft: () => void;
  onAlignRight: () => void;
  onAlignTop: () => void;
  onAlignBottom: () => void;
}

const Item: React.FC<{ label: string; shortcut?: string; onClick: () => void; danger?: boolean; disabled?: boolean }> = ({
  label,
  shortcut,
  onClick,
  danger,
  disabled,
}) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={`w-full flex items-center justify-between gap-6 px-3 py-1.5 text-xs text-left transition ${
      disabled ? 'text-slate-300 cursor-not-allowed' : danger ? 'text-red-600 hover:bg-red-50' : 'text-slate-700 hover:bg-slate-100'
    }`}
  >
    <span>{label}</span>
    {shortcut && <span className="text-[10px] text-slate-400 font-mono">{shortcut}</span>}
  </button>
);

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  selectedCount,
  hasLockedInSelection,
  onClose,
  onCopy,
  onPaste,
  onDuplicate,
  onDelete,
  onToggleLock,
  onBringFront,
  onSendBack,
  onAlignLeft,
  onAlignRight,
  onAlignTop,
  onAlignBottom,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [onClose]);

  const maxX = typeof window !== 'undefined' ? window.innerWidth - 220 : x;
  const maxY = typeof window !== 'undefined' ? window.innerHeight - 320 : y;
  const left = Math.min(x, maxX);
  const top = Math.min(y, maxY);

  return (
    <div
      ref={ref}
      className="fixed z-100 min-w-48 bg-white border border-slate-200 rounded-md shadow-xs py-1"
      style={{ left, top }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Item label="Salin" shortcut="Ctrl+C" onClick={onCopy} disabled={selectedCount === 0} />
      <Item label="Tempel" shortcut="Ctrl+V" onClick={onPaste} />
      <Item label="Duplikat" shortcut="Ctrl+D" onClick={onDuplicate} disabled={selectedCount === 0} />
      <div className="h-px bg-slate-100 my-1" />
      <Item label={hasLockedInSelection ? 'Buka kunci' : 'Kunci'} onClick={onToggleLock} disabled={selectedCount === 0} />
      <Item label="Bawa ke depan" onClick={onBringFront} disabled={selectedCount === 0} />
      <Item label="Kirim ke belakang" onClick={onSendBack} disabled={selectedCount === 0} />
      <div className="h-px bg-slate-100 my-1" />
      <Item label="Rata kiri" onClick={onAlignLeft} disabled={selectedCount < 2} />
      <Item label="Rata kanan" onClick={onAlignRight} disabled={selectedCount < 2} />
      <Item label="Rata atas" onClick={onAlignTop} disabled={selectedCount < 2} />
      <Item label="Rata bawah" onClick={onAlignBottom} disabled={selectedCount < 2} />
      <div className="h-px bg-slate-100 my-1" />
      <Item label="Hapus" shortcut="Del" onClick={onDelete} danger disabled={selectedCount === 0} />
    </div>
  );
};
