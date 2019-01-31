export class SysParamFilter {
    code: string;
    value: string;
    type: string;
    page: number;

    constructor() {
        this.code = "";
        this.value = "";
        this.type = "";
        this.page = 0;
    }
}

export class SysParam {
    code: string;
    value: string;
    type: string;
}