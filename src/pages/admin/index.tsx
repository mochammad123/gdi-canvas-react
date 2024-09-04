import Layout from '@/components/Layout';
import { ISidebarMenu } from '@/components/Layout/types';
import loadable from '@loadable/component';
import { Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';

// master
const DataRepositoryPage = loadable(() => import('./master/repository'));
const DataEnvironmentPage = loadable(() => import('./master/environment'));

export default function AdminRoutes() {

  const sidebarAdmin: ISidebarMenu[] = useMemo(
    () => [
      {
        title: 'Data Master',
        menu: [
          {
            title: 'Data Repository',
            url: 'master/data-repository',
            element: <DataRepositoryPage />,
          },
          {
            title: 'Data Env',
            url: 'master/data-env',
            element: <DataEnvironmentPage />,
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
