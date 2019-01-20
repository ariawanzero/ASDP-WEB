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

export class QuestionFilter {
    id: string;
    page: number;
    
    constructor() {
        this.id = "";
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
    startDateDisplay: string;
    endDateDisplay: string;
    publish: boolean;
    urlPreview: string;
    questionList: MateriQuestion[];
    nameFile: string[]; 
}

export class MateriQuestion {
    quizId: string;
    id: string;
    question: string;
    choiceA: string;
    choiceB: string;
    choiceC: string;
    choiceD: string;
    answer: string;
    createdDate: number;
    valid: number;
}