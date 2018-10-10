export class Menu {
    code: string;
    value: string;
    icon: string;
    menuItem: MenuItem[];
    
    constructor(code: string, value: string, icon: string) {
        this.code = code;
        this.value = value;
        this.icon = icon;
    }
}

export class MenuItem {
    menuCode: string;
    menuName: string;
    parent: string;
    url: string;
}
