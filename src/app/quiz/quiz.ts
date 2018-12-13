export class QuizFilter {
    page: number;
    
    constructor() {
        this.page = 0;
    }
}


export class Quiz {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;
    urlPreview: string;
    nameFile: string[];
}
