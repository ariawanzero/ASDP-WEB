export class Document {
    id: string;
    name: string;
    description: string;
    descriptionNoTagShow: string;
    type: string;
    sop: string;
    category: string;
    divisi: string;
    divisiDisplay: string;
    tumbnail: string;
    startDate: string;
    endDate: string;
    startDateDisplay: string;
    endDateDisplay: string;
    nameFileJson: string;
    status: string;
    twitter: boolean;
    facebook: boolean;
    instagram: boolean;
    view: boolean;
    countRead: number;
    createdDate: string;
    createdBy: string;
    createdDateDisplay: string;
    nameFile: string[];
    countHist: number;
}

export class DocumentHistory {
    id: string;
    username: string;
    divisi: string;
    readDateDisplay: string;
}

export class DocumentFilter {
    name: string;
    divisi: string;
    type: string;
    id: string;
    status: string;
    page: number;
    
    constructor() {
        this.name = "";
        this.divisi = "";
        this.id = "";
        this.type = "";
        this.status = "";
        this.page = 0;
    }
}
