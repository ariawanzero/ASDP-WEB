export class ResultQuizFilter {
    name: string;
    page: number;

    constructor() {
        this.name = "";
        this.page = 0;
    }
}

export class ResultQuiz {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
}