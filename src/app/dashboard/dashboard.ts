export class DasboardFilter {
    name: string;
    page: number;
    type: string;

    constructor() {
        this.name = "";
        this.type = "All";
        this.page = 0;
    }
}
