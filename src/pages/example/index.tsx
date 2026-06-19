import Layout from '@/components/layout';
import { ISidebarMenu, ISidebarMenuItem } from '@/components/layout/sidebar';
import loadable from '@loadable/component';
import { Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

const DashboardPage = loadable(() => import('./dashboard'));
const ColorPage = loadable(() => import('./utilities/color'));
const TypographyPage = loadable(() => import('./utilities/typography'));
const ButtonPage = loadable(() => import('./components/button'));
const TablePage = loadable(() => import('./components/table'));
const InputDateAndTimePage = loadable(() => import('./components/input-date-and-time'));
const SelectionPage = loadable(() => import('./components/selection'));
const PaginationPage = loadable(() => import('./components/pagination'));
const ToastPage = loadable(() => import('./components/toast'));
const RadioPage = loadable(() => import('./components/radio'));
const ModalPage = loadable(() => import('./components/modal'));
const DropdownPage = loadable(() => import('./components/dropdown'));
const BigCalendarPage = loadable(() => import('./components/big-calendar'));
const TemplateMasterAndDetailPage = loadable(() => import('./templates/template-master-and-detail'));
const TemplateMasterDetailHistoryPage = loadable(() => import('./templates/template-master-and-detail/history'));
const TemplateMasterDetailHistoryDetailPage = loadable(() => import('./templates/template-master-and-detail/history-detail'));

const Icon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" className="-ml-0.5">
    <path
      fill="currentColor"
      d="M24 3H8a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v6H8V5ZM8 19v-6h16v6Zm0 8v-6h16v6Z"
    ></path>
    <circle cx={11} cy={8} r={1} fill="currentColor"></circle>
    <circle cx={11} cy={16} r={1} fill="currentColor"></circle>
    <circle cx={11} cy={24} r={1} fill="currentColor"></circle>
  </svg>
);

export default function AdminRoutes() {
  const sidebarAdmin = useMemo(() => {
    return [
      { module: 'Dashboard', menu: [{ label: 'Dashboard', url: 'dashboard', element: <DashboardPage /> }] },
      {
        module: 'Utilities',
        menu: [
          { label: 'Color', url: 'utilities/color', element: <ColorPage /> },
          { label: 'Typography', url: 'utilities/typhography', element: <TypographyPage /> },
        ],
      },
      {
        module: 'Komponen',
        menu: [
          { label: 'Button', url: 'komponen/button', element: <ButtonPage /> },
          { label: 'Selection', url: 'komponen/selection', element: <SelectionPage /> },
          { label: 'Input Date & Time', url: 'komponen/input-date-and-time', element: <InputDateAndTimePage /> },
          { label: 'Pagination', url: 'komponen/pagination', element: <PaginationPage /> },
          { label: 'Toast', url: 'komponen/toast', element: <ToastPage /> },
          { label: 'Radio', url: 'komponen/radio', element: <RadioPage /> },
          { label: 'Modal', url: 'komponen/modal', element: <ModalPage /> },
          { label: 'Dropdown', url: 'komponen/dropdown', element: <DropdownPage /> },
          { label: 'Big Calendar', url: 'komponen/big-calendar', element: <BigCalendarPage /> },
          { label: 'Table', url: 'komponen/table', element: <TablePage /> },
        ],
      },
      {
        module: 'Template',
        menu: [
          { label: 'Login', customUrl: '/login', element: null },
          { label: 'Login Cabang', customUrl: '/login-cabang', element: null },
          { label: 'Login Chatbot', customUrl: '/login-chatbot', element: null },
          {
            label: 'Master & Detail',
            url: '',
            children: [
              { label: 'Master & Detail', url: 'master-and-detail', element: <TemplateMasterAndDetailPage /> },
              { label: 'History', url: 'master-and-detail/history', element: <TemplateMasterDetailHistoryPage /> },
              { label: 'History Detail', url: 'master-and-detail/history-detail', element: <TemplateMasterDetailHistoryDetailPage /> },
            ],
          },
        ],
      },
      {
        module: 'Contoh Sidebar',
        menu: [
          {
            label: '1 Level Sub Menu',
            children: [
              { label: '1 Level Sub Menu Child 1', url: 'contoh-sidebar/1-level-sub-menu/1-level-sub-menu-child-1' },
              { label: '1 Level Sub Menu Child 2', url: 'contoh-sidebar/1-level-sub-menu/1-level-sub-menu-child-2' },
            ],
          },
          {
            label: 'Multi Level Sub Menu',
            children: [
              {
                label: 'Multi Level Sub Menu Child 1',
                children: [
                  {
                    label: 'Multi Level Sub Menu Child 1 Sub 1',
                    url: 'contoh-sidebar/multi-level-sub-menu/multi-level-sub-menu-child-1/multi-level-sub-menu-child-1-sub-1',
                  },
                  {
                    label: 'Multi Level Sub Menu Child 1 Sub 2',
                    children: [
                      {
                        label: 'Multi Level Sub Menu Child 1 Sub 2 Sub 1',
                        url: 'contoh-sidebar/multi-level-sub-menu/multi-level-sub-menu-child-1/multi-level-sub-menu-child-1-sub-2/multi-level-sub-menu-child-1-sub-2-sub-1',
                      },
                      {
                        label: 'Multi Level Sub Menu Child 1 Sub 2 Sub 2',
                        url: 'contoh-sidebar/multi-level-sub-menu/multi-level-sub-menu-child-1/multi-level-sub-menu-child-1-sub-2/multi-level-sub-menu-child-1-sub-2-sub-2',
                      },
                    ],
                  },
                  {
                    label: 'Multi Level Sub Menu Child 1 Sub 3',
                    url: 'contoh-sidebar/multi-level-sub-menu/multi-level-sub-menu-child-1/multi-level-sub-menu-child-1-sub-3',
                  },
                ],
              },
              { label: 'Multi Level Sub Menu Child 2', url: 'contoh-sidebar/multi-level-sub-menu/multi-level-sub-menu-child-2' },
            ],
          },
          { label: 'Menu With Icon', url: 'contoh-sidebar/menu-with-icon', icon: Icon },
          {
            label: 'Menu With Icon and Long Text for Testing Purpose',
            url: 'contoh-sidebar/menu-with-icon-and-long-text-for-testing-purpose',
            icon: Icon,
          },
        ],
      },
    ] as ISidebarMenu[];
  }, []);

  const getFirstComponet = () => sidebarAdmin?.[0]?.menu?.[0]?.element || <></>;

  return (
    <Layout sidebar={sidebarAdmin}>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={getFirstComponet()} />
          <Route path="/dashboard" element={getFirstComponet()} />
          {sidebarAdmin.flatMap((section) => renderRoutesFromMenu(section.menu))}
        </Routes>
      </Suspense>
    </Layout>
  );
}

function renderRoutesFromMenu(menuItems: ISidebarMenuItem[]): JSX.Element[] {
  const routes: JSX.Element[] = [];

  function recurse(items: ISidebarMenuItem[]) {
    items.forEach((item) => {
      if (item.url && item.element && !item.customUrl) {
        routes.push(<Route key={item.url} path={item.url} element={item.element} />);
      }
      if (item?.children && item.children.length > 0) {
        recurse(item.children);
      }
    });
  }

  recurse(menuItems);
  return routes;
}
