import { v4 as uuidv4 } from 'uuid';
import { IHandleOrders } from "../../../interfaces/IHandleOrders";
import { OrdersDTO } from "../../../interfaces/OrdersDTO";
import { Database } from '../../../repositories/Database';

/**
 * @classdesc creates the objects that will be save into the database.
 * The format of the objects follows the following pattern:
 * {
 *      TableName: {
 *          column1: value,
 *          column2: value
 *      }
 * }
 */
export default class HandleOrders implements IHandleOrders
{
    /**
     * @description Creates the client object to insert into database
     * @param order detailed order
     * @returns Client object 
     */
    client(order: OrdersDTO)
    {
        //treats the email that comes from the api removing the part inserted by vtex leaving only the client's real email
        const clientEmail = order.clientProfileData.email;
        const replacedEmail = clientEmail.substring(0, clientEmail.indexOf('-')).replace("'", "");
        const clientName = this.handleString(order.clientProfileData.firstName);
        const clientLastName = this.handleString(order.clientProfileData.lastName);

        return {
            Client: {
                client_id: `'${order.clientProfileData.userProfileId}'`,
                name: `'${clientName}'`,
                last_name: `'${clientLastName}'`,
                email: `'${replacedEmail}'`,
                document: `'${order.clientProfileData.document}'`
            }
        };
    }

    /**
     * @description Creates the ShippingData object to insert into database
     * @param order detailed order
     * @returns ShippingData object
     */
    addressShippingData(order: OrdersDTO)
    {
        const city = this.handleString(order.shippingData.address.city);
        const receiverName = this.handleString(order.shippingData.address.receiverName);
        const neighborhood = this.handleString(order.shippingData.address.neighborhood);
        
        return {
            ShippingData: {
                addressId: `'${order.shippingData.address.addressId}'`,
                state: `'${order.shippingData.address.state}'`,
                city: `'${city}'`,
                receiverName: `'${receiverName}'`,
                neighborhood: `'${neighborhood}'`
            }
        }
    }

    /**
     * @description Creates the Client_ShippingData object to insert into database
     * @param order detailed order
     * @returns Client_ShippingData object 
     */
    clientShippingData(order: OrdersDTO)
    {
        return {
            Client_ShippingData: {
                clientShippingId: `'${uuidv4()}'`,
                client_id: `'${order.clientProfileData.userProfileId}'`,
                addressId: `'${order.shippingData.address.addressId}'`
            }
        }
    }

    /**
     * @description Creates the DiscountsName object to insert into database
     * @param order detailed order
     * @returns DiscountsName object 
     */
    discountsName(order: OrdersDTO)
    {
        const discountsName = order.ratesAndBenefitsData.rateAndBenefitsIdentifiers.map(elem => {
            return {
                DiscountsName: {
                    discountId: `'${uuidv4()}'`,
                    orderId: `'${order.orderId}'`,
                    discountName: `'${elem.name}'`
                }
            };
        });
        
        return discountsName;
    }

    /**
     * @description Creates the Items object to insert into database
     * @param order detailed order
     * @returns Items object 
     */
    items(order: OrdersDTO)
    {
        const itens = order.items.map(item => {
            return {
                Items: {
                    skuID: `'${item.id}'`,
                    skuName: `'${item.name}'`
                }
            };
        });
        
        return itens;
    }

    /**
     * @description Creates the LogistcsInfo object to insert into database
     * @param order detailed order
     * @returns LogistcsInfo object 
     */
    logisticsInfo(order: OrdersDTO)
    {
        let trackingNumber: string;

        if(order.packageAttachment.packages[0])
        {
            trackingNumber = `'${order.packageAttachment.packages[0].trackingNumber}'`;
        }
        else
        {
            trackingNumber = "''";
        }

        if(!order.shippingData.logisticsInfo[0].shippingEstimateDate)
        {
            order.shippingData.logisticsInfo[0].shippingEstimateDate = '2199-12-31T00:00:00.00+00:00';
        }
        
        const logisticsInfo = {
            LogisticsInfo: {
                logistics_id: `'${uuidv4()}'`,
                slaType: `'${order.shippingData.logisticsInfo[0].selectedSla}'`,
                courrier: `'${order.shippingData.logisticsInfo[0].selectedSla}'`,
                estimateDeliveryDate: `'${order.shippingData.logisticsInfo[0].shippingEstimateDate}'`,
                deliveryDeadline: `'${order.shippingData.logisticsInfo[0].shippingEstimate}'`,
                trackingNumber,
                orderId: `'${order.orderId}'`,
                addressId: `'${order.shippingData.address.addressId}'`
            }
        };

        return logisticsInfo;
    }

    /**
     * @description Creates the Order_Items object to insert into database
     * @param order detailed order
     * @returns Order_Items object 
     */
    orderItems(order: OrdersDTO)
    {
        const itens = order.items.map((item, index) => {
            return {
                Order_Items: {
                    orderItemsId: `'${uuidv4()}'`,
                    quantitySold: `'${item.seller}'`,
                    skuSellingPrice: item.sellingPrice / 100,
                    skuTotalPrice: (item.sellingPrice * Number(item.seller)) / 100,
                    skuValue: item.costPrice / 100,
                    orderId: `'${order.orderId}'`,
                    skuID: `'${item.id}'`,
                    shippingValue: order.shippingData.logisticsInfo[index].price / 100,
                    shippingListPrice: order.shippingData.logisticsInfo[index].listPrice / 100
                }
            }
        });

        return itens;
    }

    /**
     * @description Creates the Orders object to insert into database
     * @param order detailed order
     * @returns Orders object 
     */
    orders(order: OrdersDTO)
    {
        let callCenterDatas: object;

        if(order.callCenterOperatorData !== null)
        {
            callCenterDatas = {
                callCenterEmail: `'${order.callCenterOperatorData.email}'`,
                callCenterCode: `'${order.callCenterOperatorData.userName}'`
            }
        }
        else
        {
            callCenterDatas = {
                callCenterEmail: "''",
                callCenterCode: "''"
            };
        }

        let utmSource: string, utmMedium: string, utmCampaign: string, coupon: string;

        if(order.marketingData === null)
        {
            utmSource = utmMedium = utmCampaign = coupon = "''"
        }
        else
        {
            utmSource = `'${order.marketingData.utmSource}'`;
            utmMedium = `'${order.marketingData.utmMedium}'`;
            utmCampaign = `'${order.marketingData.utmCampaign}'`;
            coupon = `'${order.marketingData.coupon}'`;
        }

        return {
            Orders: {
                orderId: `'${order.orderId}'`,
                origin: `'${order.origin}'`,
                sequence: `'${order.sequence}'`,
                creation_date: `'${order.creationDate}'`,
                statusDescription: `'${order.statusDescription}'`,
                lastChangeDate: `'${order.lastChange}'`,
                utmSource,
                utmMedium,
                utmCampaign,
                coupon,
                totalValue: order.value / 100,
                discountsTotals: order.totals.find(totals => {
                    return totals.id === 'Discounts';
                }).value / 100,
                host: `'${order.hostname}'`,
                sellerName: `'${order.sellers[0].name}'`,
                ...callCenterDatas,
                client_id: `'${order.clientProfileData.userProfileId}'`,
            }
        }
    }

    /**
     * @description Creates the PaymentData object to insert into database
     * @param order detailed order
     * @returns Payment object 
     */
    paymentData(order: OrdersDTO)
    {
        const payments = order.paymentData.transactions[0].payments.map(payment => {
            return {
                PaymentData: {
                    transaction_id: `'${payment.id}'`,
                    orderId: `'${order.orderId}'`,
                    paymentSystemName: `'${payment.paymentSystemName}'`,
                    installments: payment.installments,
                    paymentValue: payment.value / 100
                }
            }
        });

        return payments
    }

    /**
     * @description run through the objects creating the database query and then execute it 
     * @param order detailed order
     * @returns true if all informations has saved successfully or false if an error has occurred 
     */
    async saveOrders(orders: object[])
    {
        if(!orders.length) return false;

        const db = new Database().createConnection();

        orders.forEach((order: any) => {

            const tableName = Object.keys(order)[0];
            
            db.insertInto(tableName).values(order[tableName]);
        });

        const response = await db.build().then(resp => resp);
        
        return response;
    }

    async updateOrders(orders: object[])
    {
        const db = new Database().createConnection();

        orders.forEach((information: any) => {
            const actualKey = Object.keys(information)[0];
            const objId = Object.keys(information[actualKey])[0];
            const objIdValue = information[actualKey][objId];
            const differentUpdates = ["logistics_id", "orderItemsId", "discountId"];

            if(objId === "client_id")
            {
                const clientId = information[actualKey][objId];
                delete information[actualKey][objId];
                
                db.update(actualKey).set(information[actualKey]).where(`client_id=${clientId}`);
            }
            else if(differentUpdates.includes(objId))
            {
                delete information[actualKey][objId];
                
                db.update(actualKey).set(information[actualKey]).where(`orderId=${information[actualKey].orderId}`);
            }
            else if(objId === "clientShippingId")
            {
                const clientId = information[actualKey].client_id;
                delete information[actualKey][objId];
                
                db.update(actualKey).set(information[actualKey]).where(`client_id=${clientId}`);
            }
            else
            {
                db.update(actualKey).set(information[actualKey]).where(`${objId}=${objIdValue}`);
            }
        });

        const response = await db.build();

        return response;
    }

    /**
     * @description Removes white spaces at the end of the string and remove the apostrophe character
     * @param string String to be handled
     * @returns string whithout white space at the end of string and apostrophe character
     */
    private handleString(string: string)
    {
        return string.trimEnd().replace(/'/g, "");
    }
}