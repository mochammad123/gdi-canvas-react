import { renderToStaticMarkup } from 'react-dom/server';
import { ReactNode, useEffect } from 'react';

export function useSensorKeyboard(keys: string[], triggerFn: (key: string, e?: KeyboardEvent) => void, options?: { usingCtrl?: boolean }) {
  useEffect(() => {
    const sensorListener = (e: KeyboardEvent) => {
      const keyPressed = [...keys].indexOf(e.key) > -1;

      if (options?.usingCtrl && e.ctrlKey && keyPressed) {
        triggerFn(`CTRL + ${e.key}`, e);
        return;
      }
      if (keyPressed) triggerFn(e.key, e);
    };
    window.addEventListener('keydown', sensorListener);

    return () => {
      window.removeEventListener('keydown', sensorListener);
    };
  }, [keys, options?.usingCtrl, triggerFn]);
}

export function extractTextFromLabel(label: string | ReactNode) {
  if (typeof label === 'string') return label;
  const htmlString = renderToStaticMarkup(label);
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.textContent || div.innerText || '';
}
