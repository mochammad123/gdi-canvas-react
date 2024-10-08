import Layout from '@/components/Layout';
import { ISidebarMenu } from '@/components/Layout/types';
import loadable from '@loadable/component';
import { Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

const DashboardPage = loadable(() => import('./dashboard'));

export default function AdminRoutes() {

  const sidebarAdmin: ISidebarMenu[] = useMemo(
    () => [
      {
        title: 'Dashboard',
        menu: [
          {
            title: 'Dashboard',
            url: 'dashboard',
            element: <DashboardPage />,
          },
        ],
      },
    ],
    []
  );

  const getFirstComponet = () => sidebarAdmin?.[0]?.menu?.[0]?.element || <></>;

  return (
    <Layout sidebar={sidebarAdmin}>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={getFirstComponet()} />
          <Route path="/dashboard" element={getFirstComponet()} />
          {sidebarAdmin.map((item) => item.menu.map((menu, keyMenu) => <Route key={keyMenu} path={menu.url} element={menu.element} />))}
        </Routes>
      </Suspense>
    </Layout>
  );
}
