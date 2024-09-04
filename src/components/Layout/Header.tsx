
import { useUserLogin } from "@/lib/hooks";
import { COOKIES_NAME } from "@/lib/variables/constants";
import { toggleSidebar } from "@/redux/layoutSlice";
import Cookies from "js-cookie";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import Button from "../Button";
import HamburgerIcon from "../Icon/Hamburger";
import { ISidebarMenu } from "./types";

function Header({ sidebar }: { sidebar: ISidebarMenu[] }) {
  const { data:userLogin  } = useUserLogin();
  const parsedMenu = useMemo(() => {
    const temp: { title: string; url: string }[] = [];
    sidebar.forEach((item) => {
      const menus = item.menu;
      menus.forEach((menu) => {
        temp.push({
          title:
            item.title.includes("Master") && !menu.title.includes("Data")
              ? `Data ${menu.title}`
              : menu.title,
          url: menu.url,
        });
      });
    });
    return temp;
  }, [sidebar]);

  const textTitle =
    parsedMenu.find((menu) => window.location.pathname.includes(menu.url))
      ?.title || sidebar?.[0]?.menu?.[0]?.title || "";

  return (
    <header className="z-[999] h-[3.25rem] fixed top-0 left-0 right-0 flex justify-between px-[.875rem] bg-navy-100 header">
      <TitleHeader menuName={textTitle} />
      <div className="flex gap-x-[.625rem] items-center">
        <Button
          variant="outline-white"
          className="py-2 align-middle capitalize flex justify-center items-center px-4 text-white"
        >
          {userLogin?.username || "User"}
        </Button>
        <Button
          variant="burnt-orange"
          className="h-[2.3125rem] flex justify-center items-center px-4"
          onClick={() => {
            Cookies.remove(COOKIES_NAME.Token);
            document.location = "/";
          }}
        >
          Log out
        </Button>
      </div>
    </header>
  );
}

function TitleHeader({
  menuName,
}: {
  menuName: string;
}) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-x-6">
      <div
        className="w-6 h-6 flex justify-center cursor-pointer items-center"
        onClick={() => dispatch(toggleSidebar())}
      >
        <HamburgerIcon />
      </div>
      <div className="flex gap-x-2 items-center">
        <div className="subtitle-2 !text-white ">{menuName || ""}</div>
      </div>
    </div>
  );
}

export default Header;
