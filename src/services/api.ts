import axios from 'axios';

export const api = axios.create({
    baseURL: `https://${process.env.VTEXACCOUNTNAME}.vtexcommercestable.com.br/api/oms/pvt/orders/`
});