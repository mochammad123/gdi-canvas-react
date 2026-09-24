import React from 'react';
import { Typography } from '@knittotextile/react-ui';

interface BarcodeVisualProps {
  widthPx: number;
  heightPx: number;
  text?: string;
}

export const BarcodeVisual: React.FC<BarcodeVisualProps> = ({ widthPx, heightPx, text }) => {
  // Generate a realistic looking pseudo barcode bar pattern
  // alternating black bars and white spaces
  const pattern = [
    2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 2, 2, 1, 1, 3, 1, 2, 1, 1, 2, 2, 1, 3, 1, 1, 2, 2, 1, 2, 1, 3, 1, 1, 2, 1, 2, 3, 1, 2, 2, 1, 1, 2, 1, 3, 1, 1,
    2, 2, 3, 1, 1, 2, 1, 1, 2,
  ];

  const totalUnits = pattern.reduce((acc, v) => acc + v, 0);
  const unitWidth = widthPx / totalUnits;

  let currentX = 0;
  const bars: { x: number; width: number }[] = [];

  pattern.forEach((val, idx) => {
    const w = val * unitWidth;
    if (idx % 2 === 0) {
      bars.push({ x: currentX, width: w });
    }
    currentX += w;
  });

  return (
    <div
      style={{
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        position: 'relative',
        userSelect: 'none',
      }}
      className="bg-white overflow-hidden flex flex-col items-center justify-between pointer-events-none"
    >
      <svg width={widthPx} height={heightPx} className="w-full h-full">
        {bars.map((bar, i) => (
          <rect key={i} x={bar.x} y={0} width={Math.max(1, bar.width)} height={heightPx} fill="black" />
        ))}
      </svg>
      {text && (
        <Typography
          as="global-hint"
          className="text-[9px] text-gray-700 font-mono tracking-wider absolute bottom-0 bg-white/80 px-1 rounded block"
          style={{ transform: 'translateY(1px)' }}
        >
          {text}
        </Typography>
      )}
    </div>
  );
};
