export class Menu {
    code: string;
    value: string;
    menuItem: MenuItem[];
}

export class MenuItem {
    menuCode: string;
    menuName: string;
    parent: string;
    url: string;
}
