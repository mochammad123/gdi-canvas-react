import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import DotsVertical from '@/components/ui/icon/dots-vertical';
import Portal from '@/components/ui/portal';

const actions = [
  { label: 'Edit', type: 'edit' },
  { label: 'Hapus', type: 'delete' },
];

function ActionToggle({ onClick }: { onClick: (type: 'edit' | 'delete') => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  // Menutup action card ketika klik di luar area container atau card
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (containerRef.current?.contains(target) || cardRef.current?.contains(target)) return;
      setPosition(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Menutup action card ketika terjadi scroll dari elemen manapun
  useEffect(() => {
    if (!position) return;

    const handleScroll = () => setPosition(null);

    window.addEventListener('scroll', handleScroll, true);
    document.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [position]);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) setPosition({ x: rect.left - 65, y: rect.top });
  };

  const handleActionClick = (type: 'edit' | 'delete') => {
    onClick(type);
    setPosition(null);
  };

  return (
    <div ref={containerRef}>
      <button
        ref={buttonRef}
        className={clsx(
          'btn-action-toggle',
          'cursor-pointer w-5 bg-transparent py-0.5 rounded flex justify-center items-center text-black-100 dark:text-greyish-semi-white',
          'hover:bg-gray-300 dark:hover:bg-black-60 transition-colors duration-150',
          position && 'bg-gray-300! dark:bg-black-60!'
        )}
        onClick={handleToggle}
      >
        <DotsVertical color="currentColor" />
      </button>

      {position && (
        <Portal>
          <div ref={cardRef} className="fixed z-50" style={{ top: position.y, left: position.x }}>
            <div className="bg-white dark:bg-black-80 dark:border dark:border-black-60 shadow-lg w-[3.813rem] flex flex-col space-y-1">
              {actions.map(({ label, type }, idx) => (
                <button
                  key={idx}
                  className="global-report-content text-start hover:bg-blue-950 hover:text-white dark:hover:bg-knitto-blue-60 py-1 pl-2 cursor-pointer dark:text-greyish-semi-white"
                  onClick={() => handleActionClick(type as 'edit' | 'delete')}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

export default ActionToggle;
