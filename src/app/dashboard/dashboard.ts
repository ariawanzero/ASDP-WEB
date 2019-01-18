export class DasboardFilter {
    keyword: string;
    type: string;
    page: number;

    constructor() {
        this.keyword = "";
        this.type = "NEW";
        this.page = 0;
    }
}
