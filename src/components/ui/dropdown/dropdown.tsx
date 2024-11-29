import { useOnClickOutside } from '@/lib/hooks';
import { useEffect, useRef } from 'react';
import DropdownMenu from './dropdown-menu';
import { IDropdownMenuItem } from './types';

const defaultDropdownMenus: IDropdownMenuItem[] = [
  {
    value: 'edit',
    text: 'Edit',
  },
  {
    value: 'delete',
    text: 'Hapus',
  },
];
const Dropdown = ({
  elementRef,
  onHide,
  positions,
  onSelect,
  dropdownMenu,
  width,
}: {
  width?:string;
  dropdownMenu?: IDropdownMenuItem[];
  elementRef: HTMLElement | null;
  onHide: () => void;
  positions?: { x: number; y: number };
  onSelect: (selected: IDropdownMenuItem) => void;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!elementRef || !wrapperRef.current) return;
    const rect = elementRef?.getBoundingClientRect();
    if (!elementRef || !rect) return;

    const left = rect.left + (positions?.x || 0);
    const top = (rect.top + (positions?.y || 0)) + window.scrollY;
    wrapperRef.current.style.left = `${left}px`;
    wrapperRef.current.style.top = `${top}px`;
  }, [elementRef, positions]);

  useOnClickOutside(wrapperRef, () => {
    onHide();
  });

  return (
    <div ref={wrapperRef} className="absolute z-50">
      <DropdownMenu
        width={width}
        menus={dropdownMenu || defaultDropdownMenus}
        onClick={(selected) => {
          onHide();
          onSelect(selected);
        }}
      />
    </div>
  );
};

export default Dropdown;
