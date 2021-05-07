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
        let amountPages: number;
        const requests = new Requests();
        
        await requests.makeRequest({
            ...options
        }).then(resp => {
            amountPages = resp.paging.pages;
        }).catch(err => {
            return Promise.reject(err);
        });

        return amountPages;
    }
}