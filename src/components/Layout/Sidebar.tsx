import InputSearch from "@/components/Input/InputSearch";
import { KNUI_LABEL } from "@/lib/variables/constants";
import { toggleSidebar } from "@/redux/layoutSlice";
import { RootState } from "@/redux/store";
import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../icon/Search";
import KNUI from "../KNUI";
import { Typography } from "../typhography";
import { ISidebarMenu, ISidebarMenuItem } from "./types";

const Sidebar = React.memo(SidebarMemoized);
function SidebarMemoized({ data }: { data: ISidebarMenu[] }) {
  const sidebarIsOpen = useSelector(
    (state: RootState) => state.layout.isSidebarOpen
  );

  const [search, setSearch] = useState<string>("");
  const filteredMenu = useMemo(() => data.map((item) => {
    const menus = item.menu.filter(menu => menu.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    return { ...item, menu: menus };
  }),[data, search]);

  return (
    <div
      className={clsx(
        "shadow-md bg-white z-[999] transition-all duration-300 top-[3.25rem] bottom-0 w-[15.625rem] pt-[.625rem] fixed",
        {
          "left-0": sidebarIsOpen,
          "-left-[260px]": !sidebarIsOpen,
        }
      )}
    >
      <SearchMenu value={search} onSearch={setSearch} />
      <ListMenu data={filteredMenu} />
    </div>
  );
}

function SearchMenu({ value, onSearch }: { value?: string; onSearch: (value:string) => void }) {
  return (
    <div className="flex justify-between w-full">
      <InputSearch
        className="w-full"
        classNameInput="global-paragraph focus:!bg-white border-none !outline-none "
        placeholder="Cari menu"
        suffix={<SearchIcon />}
        value={value}
        onChangeValue={onSearch}
      />
    </div>
  );
}

function ListMenu({ data }: { data: ISidebarMenu[] }) {
  const pathName = window.location.pathname;

  return (
    <nav className="pt-[.625rem] flex flex-col gap-y-[.625rem]">
      {data.map((item, key) => {
        return (
          <div key={key}>
            <Typography as="global-report-title" className="mb-1 px-[.625rem]">
              {item.title}
            </Typography>
            <div className="flex flex-col">
              {item.menu.map((menu, key) =>
                menu?.hide ? null : <MenuItem menu={menu} key={key} activeMenu={pathName.includes(menu.url)} />
              )}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

function MenuItem({ menu, activeMenu }: { menu: ISidebarMenuItem; activeMenu: boolean }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className={clsx("p-[.625rem] cursor-pointer global-report-content hover:bg-knitto-blue-40", {
        "bg-knitto-blue-40": activeMenu
      })}
      onClick={() => {
        menu.url && navigate(menu.url);
        dispatch(toggleSidebar());
        document.body.classList.remove("modal-open");
      }}
    >
      {menu.title}
    </div>
  );
}

export default Sidebar;
