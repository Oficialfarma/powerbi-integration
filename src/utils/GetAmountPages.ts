import { IRequestDatas } from "../interfaces/IRequests";
import { Requests } from "../providers/Requests";

export class GetAmountPages
{
    static async getPages(options: IRequestDatas): Promise<number>
    {
        let amountPages: number = 1;
        const requests = new Requests();

        await requests.makeRequest({
            ...options
        }).then(resp => {
            amountPages = resp.paging.pages;
        }).catch(async () => {
            await requests.requestErrors();
        });

        return amountPages;
    }
}