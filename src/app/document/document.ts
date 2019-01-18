export class Document {
    id: string;
    name: string;
    description: string;
    descriptionNoTag: string;
    type: string;
    sop: string;
    category: string;
    divisi: string;
    divisiDisplay: string;
    tumbnail: string;
    startDate: string;
    endDate: string;
    nameFileJson: string;
    status: string;
    twitter: boolean;
    facebook: boolean;
    instagram: boolean;
    view: boolean;
    countRead: number;
    createdDate: string;
    nameFile: string[];
}

export class DocumentFilter {
    name: string;
    divisi: string;
    type: string;
    status: string;
    page: number;
    
    constructor() {
        this.name = "";
        this.divisi = "";
        this.type = "";
        this.status = "";
        this.page = 0;
    }
}
