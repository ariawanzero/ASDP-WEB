export class MateriFilter {
    name: string;
    divisi: string;
    page: number;
    
    constructor() {
        this.name = "";
        this.divisi = "";
        this.page = 0;
    }
}

export class Materi {
    id: string;
    name: string;
    divisi: string;
    divisiDisplay: string;
    startDate: Date;
    endDate: Date;
    totalQuiz: number;
    description: string;
    publish: boolean;
}