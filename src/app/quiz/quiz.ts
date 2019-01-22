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
    startDateDisplay: string;
    endDateDisplay: string;
    description: string;
    urlPreview: string;
    nameFile: string[];
    alreadyStart: boolean;
}

export class QuizResult {
    id: string;
    questions: QuizQuestion[];
    quizName: string;
    passQuiz: string;
    score: number;
    endDateQuiz: Date;
}

export class QuizQuestion {
    id: string;
    question: string;
    choiceA: string;
    choiceB: string;
    choiceC: string;
    choiceD: string;
    answerUser: string;
    valid: number;
    finish: boolean;
    width: string;
}
