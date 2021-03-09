import { IGetOrders } from "../../../interfaces/IGetOrders";
import { IGetOrdersDTO } from "../../../interfaces/IGetOrdersDTO";
import { Requests } from "../../../providers/Requests";

const requests = new Requests();

export class GetOrders implements IGetOrders
{
    async getOrders(datas: IGetOrdersDTO): Promise<void>
    {
        let request = [];
       
        if(datas.methodType === "list")
        {
            for(let i = 1; i <= datas.amountPages; i++)
            {
                request.push({
                    url: datas.url,
                    queryParams: datas.queryParams + `&page=${i}`,
                    options: datas.options,
                    timeout: datas.timeout
                });
            }
        }
        else
        {
            for(let i = 0; i < datas.orderId.length; i++)
            {
                request.push({
                    url: datas.url + `/${datas.orderId}`,
                    options: datas.options,
                    timeout: datas.timeout
                })
            }
        }
       
        const prepareRequests = request.map(params => requests.makeRequest(params));
        
        const result = await Promise.allSettled(prepareRequests);

        let allSucceded: Array<any>;

        result.map(elem => {
            if(elem.status === "fulfilled")
            {
                if(datas.methodType === "list")
                {
                    // elem.value.list.map((order: { orderId: string }) => {
                    //     allSucceded.push(order.orderId);
                    // });
                }
                else
                {
                    allSucceded.push(elem.value);
                }
            }
            else
            {
                requests.requestErrors();
            }
        });
        
        console.log(allSucceded);
        // return succeded;
    }
}