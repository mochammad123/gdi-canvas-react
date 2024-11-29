interface ISidebarMenuItem {
  hide?: boolean;
  title: string;
  url: string;
  element: JSX.Element | null;
}

interface ISidebarMenu {
  title: string;
  menu: ISidebarMenuItem[];
}
