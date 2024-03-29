import { IGetOrders } from "../../../interfaces/IGetOrders";
import { IGetOrdersDTO } from "../../../interfaces/IGetOrdersDTO";
import { OrdersDTO } from "../../../interfaces/OrdersDTO";
import { Requests } from "../../../providers/Requests";

export class GetOrders implements IGetOrders
{
    /**
     * @description prepare an array of objects with the API connection url (based on the type of request),
     * headers and additional data; launches the request and returns an array with the requested information.
     * @param datas - data used as a request parameter.
     * receive Url, options, query params, timeout delay, order id and page amount
     * @returns with orders id or detailed orders
     */
    async getOrders(datas: IGetOrdersDTO): Promise<string[] | OrdersDTO[]>
    {
        const requests = new Requests();
        let request = [];
        
        if(datas.methodType === "list")
        {
            for(let i = 1; i <= datas.amountPages; i++)
            {
                request.push({
                    queryParams: datas.queryParams + `&page=${i}`,
                    timeout: datas.timeout
                });
            }
        }
        else
        {
            for(let i = 0; i < datas.orderId.length; i++)
            {
                request.push({
                    url: datas.orderId[i],
                    timeout: datas.timeout
                })
            }
        }
        
        const prepareRequests = request.map(params => requests.makeRequest(params));
        
        const result = await Promise.allSettled(prepareRequests);
        
        let allSucceded: Array<any> = [];
        let allFailed;
        
        result.forEach(elem => {
            if(elem.status === "fulfilled")
            {
                if(datas.methodType === "list")
                {
                    elem.value.list.forEach((order: any) => {
                        allSucceded.push(order.orderId);
                    });
                }
                else
                {
                    allSucceded.push(elem.value);
                }
            }
            else
            {
               allFailed = elem.reason;
            }
        });

        if(allFailed) return Promise.reject(allFailed);
        
        return allSucceded;
    }
}