import { IRequestDatas } from "../interfaces/IRequests";
import { Requests } from "../providers/Requests";

export class GetAmountPages
{
    /**
     * 
     * @param options url and queryParams 
     * @returns amount of order pages
     */
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