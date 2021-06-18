import { IGetOrdersDTO } from "../../interfaces/IGetOrdersDTO";
import { GetOrdersUseCase } from "./GetOrdersUseCase";

/**
 * @classdesc receives the requests for the use case of obtaining the orders
 * by starting the logic and returning the responses of the request
 */
export class GetOrdersController
{
    /**
     * 
     * @param createGetOrdersuseCase - GetOrdersUseCase class. All methods presents in that class
     */
    constructor(
        private createGetOrdersuseCase: GetOrdersUseCase
    ){}

    /**
     * 
     * @param datas - request datas, method type and aditional options to make request
     * @returns Orders Id or detailed orders
     */
    async handle(datas: IGetOrdersDTO): Promise<any[]>
    {
        try
        {
            let response = await this.createGetOrdersuseCase.execute(datas);

            return response;
        }
        catch(err)
        {
            return err
        }
    }
}