import { useEffect, useState } from 'react';

export function useAnimateDropdown() {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [animatingIn, setAnimatingIn] = useState(false);

  useEffect(() => {
    if (openDropdown) {
      setShowDropdown(true);
      setAnimatingIn(true);
    } else {
      setAnimatingIn(false);
      const timeout = setTimeout(() => setShowDropdown(false), 150);
      return () => clearTimeout(timeout);
    }
  }, [openDropdown]);

  return { openDropdown, setOpenDropdown, showDropdown, animatingIn };
}
