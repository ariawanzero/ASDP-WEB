export class UserFilter {
    username: string;
    name: string;
    jabatan: string;
    userrole: string;
    page: number;

    constructor() {
        this.username = "";
        this.name = "";
        this.jabatan = "";
        this.userrole = "";
        this.page = 0;
    }
}

export class User {
    id: string;
    username: string;
    name: string;
    no_hp: string;
    alamat: string;
    jabatan: string;
    divisi: string;
    valid: number;    
}
