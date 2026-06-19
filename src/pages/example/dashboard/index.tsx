import { useNavigate } from 'react-router-dom';
import { Button } from '@knittotextile/react-ui';
import { Typography } from '@knittotextile/react-ui';

const COMPONENT_LIB_DOCS_URL = 'http://192.168.20.15:11111/';

interface NavLink {
  label: string;
  path: string;
}

interface PageSection {
  title: string;
  links: NavLink[];
}

const examplePageSections: PageSection[] = [
  {
    title: 'Utilities',
    links: [
      { label: 'Color Examples', path: '/example/utilities/color' },
      { label: 'Typography Examples', path: '/example/utilities/typhography' },
    ],
  },
  {
    title: 'Komponen',
    links: [
      { label: 'Table Examples', path: '/example/komponen/table' },
      { label: 'Button Examples', path: '/example/komponen/button' },
      { label: 'Selection Examples', path: '/example/komponen/selection' },
      { label: 'Input Date & Time Examples', path: '/example/komponen/input-date-and-time' },
      { label: 'Pagination Examples', path: '/example/komponen/pagination' },
      { label: 'Toast Examples', path: '/example/komponen/toast' },
      { label: 'Radio Examples', path: '/example/komponen/radio' },
      { label: 'Modal Examples', path: '/example/komponen/modal' },
      { label: 'Dropdown Examples', path: '/example/komponen/dropdown' },
      { label: 'Big Calendar Examples', path: '/example/komponen/big-calendar' },
    ],
  },
  {
    title: 'Template',
    links: [
      { label: 'Login Template', path: '/login' },
      { label: 'Login Cabang Template', path: '/login-cabang' },
      { label: 'Login Chatbot Template', path: '/login-chatbot' },
      { label: 'Master & Detail Template', path: '/example/master-and-detail' },
      { label: 'Master & Detail History', path: '/example/master-and-detail/history' },
      { label: 'Master & Detail History Detail', path: '/example/master-and-detail/history-detail' },
    ],
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-4 min-h-screen flex flex-col gap-8">
      <Typography as="h1" className="text-2xl font-semibold text-navy-100 dark:text-white">
        Navigasi Halaman Contoh Komponen dan Layout
      </Typography>

      <section className="rounded-lg border border-black-20 dark:border-black-60 bg-white dark:bg-black-80 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <Typography as="global-strong" className="text-navy-100 dark:text-greyish-semi-white">
            Dokumentasi Komponen (@knittotextile/react-ui)
          </Typography>
          <Typography as="global-paragraph" className="text-black-60 dark:text-black-40">
            Untuk melihat dokumentasi komponen yang sudah dikomponenkan di lib, buka melalui tombol di samping atau akses{' '}
            <span className="font-medium text-navy-100 dark:text-greyish-semi-white">{COMPONENT_LIB_DOCS_URL}</span>
          </Typography>
        </div>
        <Button className="shrink-0" color="navy" onClick={() => window.open(COMPONENT_LIB_DOCS_URL, '_blank', 'noopener,noreferrer')}>
          Buka Dokumentasi Lib
        </Button>
      </section>

      {examplePageSections.map((section) => (
        <section key={section.title}>
          <Typography as="h2" className="mb-4 text-xl font-bold text-navy-80 dark:text-white">
            {section.title}
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {section.links.map((pageLink) => (
              <Button
                key={pageLink.path + pageLink.label}
                onClick={() => navigate(pageLink.path)}
                className="w-full h-auto py-3 text-left justify-start hover:bg-navy-100 hover:text-white dark:border-white dark:text-white"
                variant="outline"
                color="navy"
              >
                {pageLink.label}
              </Button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
