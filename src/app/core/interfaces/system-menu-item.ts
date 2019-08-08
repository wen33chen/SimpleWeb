export interface SystemMenuItem {
  roleId: number;
  roleName: string;
  menuId: number;
  parentId: number;
  displayText: string;
  subMenuList: SystemMenuItem[];
  enabled: boolean;
  sort: number;
  linkUrl: string;
  menuCode: string;
}
