export class MateriFilter {
    name: string;
    page: number;
    
    constructor() {
        this.name = "";
        this.page = 0;
    }
}

export class Materi {
    id: string;
    name: string;
    nameFile: string[];
}