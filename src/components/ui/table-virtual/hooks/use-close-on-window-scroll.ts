import { useEffect } from 'react';

interface Props {
  enabled: boolean;
  onClose: () => void;
}

const useCloseOnWindowScroll = ({ enabled, onClose }: Props) => {
  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      onClose();
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled, onClose]);
};

export default useCloseOnWindowScroll;
