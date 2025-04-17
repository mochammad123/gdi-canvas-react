import { useEffect } from 'react';

interface IDropdownOverflow {
  openDropdown: boolean;
  showDropdown: boolean;
  selectionRef: React.RefObject<HTMLDivElement>;
}

export function useDropdownOverflow({ openDropdown, showDropdown, selectionRef }: IDropdownOverflow) {
  useEffect(() => {
    if (!openDropdown || !showDropdown || !selectionRef.current) return;

    const rect = selectionRef.current.querySelector('.selection-box')?.getBoundingClientRect();
    const dropdownEl = selectionRef.current.querySelector('.selection-dropdown') as HTMLDivElement;
    const dropdownHeight = dropdownEl?.getBoundingClientRect().height || 0;

    if (!rect || !dropdownHeight || !dropdownEl) return;

    const isDropdownOverflow = rect.top + dropdownHeight + 50 > window.innerHeight;
    if (isDropdownOverflow) {
      dropdownEl.style.bottom = `${rect.height}px`;
    }
  }, [openDropdown, showDropdown]);
}
