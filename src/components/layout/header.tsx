import { useUserLogin } from '@/lib/hooks/hooks';
import { COOKIES_NAME } from '@/lib/variables/example';
import { toggleSidebar } from '@/redux/layoutSlice';
import Cookies from 'js-cookie';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import HamburgerIcon from '@/components/ui/icon/hamburger';
import { ISidebarMenu, ISidebarMenuItem } from './sidebar';
import { useLocation } from 'react-router-dom';

const parsedMenu = (menu: ISidebarMenuItem[]) => {
  let result: { label: string; url: string }[] = [];
  menu.forEach(({ label, url, children }) => {
    result.push({ label, url: url || '' });

    if (children) {
      result = result.concat(parsedMenu(children));
    }
  });
  return result;
};

function Header({ sidebar }: { sidebar: ISidebarMenu[] }) {
  const location = useLocation();
  const { data: userLogin } = useUserLogin();
  const splitPathUrl = location.pathname.split('/');
  const lastPath = splitPathUrl[splitPathUrl.length - 1];

  const allMenu = useMemo(() => {
    return sidebar.flatMap((item) => parsedMenu(item.menu));
  }, [sidebar]);

  const textTitle = allMenu.find(({ url }) => url.endsWith(lastPath))?.label || sidebar?.[0]?.menu?.[0]?.label || '';

  return (
    <header className="z-[999] h-[3.25rem] fixed top-0 left-0 right-0 flex justify-between px-[.875rem] bg-navy-100 header">
      <TitleHeader menuName={textTitle} />
      <div className="flex gap-x-[.625rem] items-center">
        <Button variant="outline" color="white" className="">
          {userLogin?.username || 'User'}
        </Button>
        <Button
          color="burnt-orange"
          onClick={() => {
            Cookies.remove(COOKIES_NAME.Token);
            document.location = '/';
          }}
        >
          Log out
        </Button>
      </div>
    </header>
  );
}

function TitleHeader({ menuName }: { menuName: string }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-x-6">
      <div className="w-6 h-6 flex justify-center cursor-pointer items-center" onClick={() => dispatch(toggleSidebar())}>
        <HamburgerIcon />
      </div>
      <div className="flex gap-x-2 items-center">
        <div className="subtitle-2 !text-white ">{menuName || ''}</div>
      </div>
    </div>
  );
}

export default Header;
