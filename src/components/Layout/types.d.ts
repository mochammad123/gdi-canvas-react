export interface ISidebarMenuItem {
  hide?: boolean;
  title: string;
  url: string;
  element: JSX.Element | null;
}

export interface ISidebarMenu {
  title: string;
  menu: ISidebarMenuItem[];
}
