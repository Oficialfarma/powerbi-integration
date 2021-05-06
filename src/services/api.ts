import axios from 'axios';

export const api = axios.create({
    baseURL: `https://${process.env.VTEXACCOUNTNAME}.vtexcommercestable.com.br/api/oms/pvt/orders/`,
    method: 'GET',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-VTEX-API-AppKey": process.env.X_VTEX_API_APPKEY,
        "X-VTEX-API-AppToken": process.env.X_VTEX_API_APPTOKEN
    }
});