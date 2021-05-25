type Totals = {
    id: string;
    name: string;
    value: number;
}

type PriceTags = {
    name: string;
    value: number;
    isPercentual: boolean;
    identifier: string;
    rawValue: number;
    rate: any;
    jurisCode: any;
    jurisType: any;
    jurisName: any;
}

type Categories = {
    id: number;
    name: string;
}

type AdditionalInfo = {
    brandName: string;
    brandId: string;
    categoriesIds: string;
    categories: Categories[];
    productClusterId: string;
    commercialConditionId: string;
    dimension: {
        cubicweight: number;
        height: number;
        length: number;
        weight: number;
        width: number;
    };
    offeringInfo: any;
    offeringType: any;
    offeringTypeId: any;
}

type Items = {
    uniqueId: string;
    id: string;
    productId: string;
    ean: string;
    lockId: string;
    itemAttachment: object;
    attachments: any[];
    quantity: number;
    seller: string;
    name: string;
    refId: any;
    price: number;
    listPrice: number;
    manualPrice: any;
    priceTags: PriceTags[];
    imageUrl: string;
    detailUrl: string;
    components: any[];
    bundleItems: any[];
    params: any[];
    offerings: any[];
    sellerSku: string;
    priceValidUntil: any;
    commission: number;
    tax: number;
    preSaleDate: any;
    additionalInfo: AdditionalInfo;
    measurementUnit: string;
    unitMultiplier: number;
    sellingPrice: number;
    isGift: boolean;
    shippingPrice: any;
    rewardValue: number;
    freightCommission: number;
    priceDefinitions: any;
    taxCode: any;
    parentItemIndex: any;
    parentAssemblyBinding: any;
    callCenterOperator: any;
    serialNumbers: any;
    assemblies: any[];
    costPrice: number;
}

type ClientProfileData = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    documentType: string;
    document: string;
    phone: string;
    corporateName: any;
    tradeName: any;
    corporateDocument: any;
    stateInscription: string;
    corporatePhone: any;
    isCorporate: false;
    userProfileId: string;
    customerClass: any
}

type RateAndBenefitsIdentifiers = {
    description: any;
    featured: boolean;
    id: string;
    name: string;
    matchedParameters: object;
    additionalInfo: any
}

type Address = {
    addressType: string;
    receiverName: string;
    addressId: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    street: string;
    number: string;
    neighborhood: string;
    complement: any;
    reference: any;
    geoCoordinates: number[]
}

type Slas = {
    id: string;
    name: string;
    shippingEstimate: string;
    deliveryWindow: any;
    price: number;
    deliveryChannel: string;
    pickupStoreInfo: {
        additionalInfo: any;
        address: any;
        dockId: any;
        friendlyName: any;
        isPickupStore: boolean
    };
    polygonName: any;
    lockTTL: string;
    pickupPointId: any;
    transitTime: string;
}

type DeliveryIds = {
    courierId: string;
    courierName: string;
    dockId: string;
    quantity: number;
    warehouseId: string;
    accountCarrierName: string;
}
type LogisticsInfo = {
    itemIndex: number;
    selectedSla: string;
    lockTTL: string;
    price: number;
    listPrice: number;
    sellingPrice: number;
    deliveryWindow: any;
    deliveryCompany: string;
    shippingEstimate: string;
    shippingEstimateDate: string;
    slas: Slas[],
    shipsTo: string[];
    deliveryIds: DeliveryIds[];
    deliveryChannel: string;
    pickupStoreInfo: {
        additionalInfo: any;
        address: any;
        dockId: any;
        friendlyName: any;
        isPickupStore: boolean
    };
    addressId: string;
    polygonName: any;
    pickupPointId: any;
    transitTime: string;
}

type SelectedAddresses = {
    addressId: string;
    addressType: string;
    receiverName: string;
    street: string;
    number: string;
    complement: any;
    neighborhood: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    reference: any;
    geoCoordinates: number[]
}

type Payments = {
    id: string;
    paymentSystem: string;
    paymentSystemName: string;
    value: number;
    installments: number;
    referenceValue: number;
    cardHolder: any;
    cardNumber: any;
    firstDigits: any;
    lastDigits: any;
    cvv2: any;
    expireMonth: any;
    expireYear: any;
    giftCardId: any;
    giftCardName: any;
    giftCardCaption: any;
    redemptionCode: any;
    group: string;
    dueDate: string;
    connectorResponses: object;
    giftCardProvider: any;
    giftCardAsDiscount: any;
    koinUrl: any;
    accountId: any;
    parentAccountId: any;
}

type Transactions = {
    isActive: boolean;
    transactionId: string;
    merchantName: string;
    payments: Payments[]
}

type PackagesItems = {
    itemIndex: number;
    quantity: number;
    price: number;
    description: any;
    unitMultiplier: number;
}

type Packages = {
    items: PackagesItems[];
    courier: string;
    invoiceNumber: string;
    invoiceValue: number;
    invoiceUrl: any;
    issuanceDate: string;
    trackingNumber: string;
    invoiceKey: any;
    trackingUrl: string;
    embeddedInvoice: string;
    type: string;
    courierStatus: any;
    cfop: any;
    restitutions: object;
    volumes: any;
}

type Sellers = {
    id: string;
    name: string;
    logo: string;
    fulfillmentEndpoint: string;
}

type ItemMetadata = {
    Id: string;
    Seller: string;
    Name: string;
    SkuName: string;
    ProductId: string;
    RefId: any;
    Ean: string;
    ImageUrl: string;
    DetailUrl: string;
    AssemblyOptions: any[]
}

type CallCenterOperatorData = {
    id: string;
    email: string;
    userName: string;
}
export type OrdersDTO =
{
    orderId: string;
    sequence: string;
    marketplaceOrderId: string;
    marketplaceServicesEndpoint: string;
    sellerOrderId: string;
    origin: string;
    affiliateId: string;
    salesChannel: string;
    merchantName: any;
    status: string;
    statusDescription: string;
    value: number;
    creationDate: string;
    lastChange: string;
    orderGroup: string;
    totals: Totals[];
    items: Items[];
    marketplaceItems: any[];
    clientProfileData: ClientProfileData;
    giftRegistryData: any;
    marketingData: {
        id: string;
        utmSource: string;
        utmPartner: any;
        utmMedium: any;
        utmCampaign: any;
        coupon: any;
        utmiCampaign: string;
        utmipage: string;
        utmiPart: string;
        marketingTags: any[];
    };
    ratesAndBenefitsData: {
        id: string;
        rateAndBenefitsIdentifiers: RateAndBenefitsIdentifiers[]
    };
    shippingData: {
        id: string;
        address: Address;
        logisticsInfo: LogisticsInfo[];
        trackingHints: any;
        selectedAddresses: SelectedAddresses[]
    };
    paymentData: {
        giftCards: any[];
        transactions: Transactions[]
    };
    packageAttachment: {
        packages: Packages[]
    };
    sellers: Sellers[];
    callCenterOperatorData: null | CallCenterOperatorData;
    followUpEmail: string;
    lastMessage: any;
    hostname: string;
    invoiceData: {
        address: any
    };
    allowCancellation: boolean;
    allowEdition: boolean;
    isCheckedIn: boolean;
    marketplace: {
        baseURL: string;
        isCertified: any;
        name: string;
    };
    authorizedDate: string;
    invoicedDate: string;
    cancelReason: string;
    itemMetadata: {
        Items: ItemMetadata[]
    };
    subscriptionData: any;
    taxData: any;
    checkedInPickupPointId: any;
    cancellationData: any
}