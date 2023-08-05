
export class Paginator {

    public count: number;
    public offset: number;
    public limit: number;

    constructor(count: number, limit: number) {
        this.count = count;
        this.limit = limit;
    }
}
