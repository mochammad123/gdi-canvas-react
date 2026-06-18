import { Typography } from '@knittotextile/react-ui';
import { COLOR_GROUPS } from './color-tokens';

export default function Color() {
  return (
    <div className="p-4 h-full flex flex-col gap-3 mb-10">
      <Typography as="h3" className="text-navy-100 dark:text-white">
        Color
      </Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COLOR_GROUPS.map((group) => (
          <div key={group.title} className="shadow p-3 rounded bg-white dark:bg-black-80">
            <Typography as="h5" className="mb-3 text-navy-100 dark:text-greyish-semi-white">
              {group.title}
            </Typography>
            <div className="flex flex-col gap-2">
              {group.classNames.map((className) => (
                <div key={className} className="flex flex-row items-center gap-4 w-full">
                  <div className={`w-10 h-3 shrink-0 ${className}`} />
                  <span className="text-sm text-black-80 dark:text-black-20">{className}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
