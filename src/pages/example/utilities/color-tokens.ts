export interface ColorGroup {
  title: string;
  classNames: string[];
}

export const COLOR_GROUPS: ColorGroup[] = [
  {
    title: 'Knitto Blue',
    classNames: ['bg-knitto-blue-100', 'bg-knitto-blue-80', 'bg-knitto-blue-60', 'bg-knitto-blue-40', 'bg-knitto-blue-20'],
  },
  {
    title: 'Navy',
    classNames: ['bg-navy-100', 'bg-navy-80', 'bg-navy-60', 'bg-navy-40', 'bg-navy-20'],
  },
  {
    title: 'Steel Blue',
    classNames: ['bg-steel-blue-100', 'bg-steel-blue-80', 'bg-steel-blue-60', 'bg-steel-blue-40', 'bg-steel-blue-20'],
  },
  {
    title: 'Burnt Orange',
    classNames: ['bg-burnt-orange-100', 'bg-burnt-orange-80', 'bg-burnt-orange-60', 'bg-burnt-orange-40', 'bg-burnt-orange-20'],
  },
  {
    title: 'Greyish',
    classNames: ['bg-greyish-down', 'bg-greyish-semi-dark', 'bg-greyish-semi-dark-50', 'bg-greyish-semi-white', 'bg-greyish-bright-white'],
  },
  {
    title: 'Black',
    classNames: ['bg-black-100', 'bg-black-80', 'bg-black-60', 'bg-black-40', 'bg-black-20'],
  },
];
