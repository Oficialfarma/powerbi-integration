USE powerbiDev;

CREATE TABLE Client(
	client_id VARCHAR(20) NOT NULL,
	name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(75) NOT NULL,
	document VARCHAR(13) NOT NULL,
	CONSTRAINT PK_clientId PRIMARY KEY CLUSTERED (client_id)
);

CREATE TABLE ShippingData(
	addressId VARCHAR(20),
	state VARCHAR(2) NOT NULL,
	city VARCHAR(25) NOT NULL,
	receiver_name VARCHAR(50),
	neighborhood VARCHAR(75) NOT NULL,
	CONSTRAINT PK_addressId PRIMARY KEY CLUSTERED (addressId)
);

CREATE TABLE Client_ShippingData(
	clientShippingId VARCHAR(50),
	client_id VARCHAR(20) NOT NULL,
	addressId VARCHAR(20) NOT NULL,
	CONSTRAINT PK_clientShippingId PRIMARY KEY CLUSTERED (clientShippingId),
	CONSTRAINT FK_Client_ShippingData_client_id FOREIGN KEY (client_id) REFERENCES Client (client_id),
	CONSTRAINT FK_Client_ShippingData_addressId FOREIGN KEY (addressId) REFERENCES ShippingData (addressId)
);

CREATE TABLE Orders(
	orderId VARCHAR(20),
	origin VARCHAR(30),
	sequence VARCHAR(10),
	creation_date DATETIME NOT NULL,
	statusDescription VARCHAR(10),
	lastChangeDate DATETIME NOT NULL,
	utmSource VARCHAR(10),
	utmMedium VARCHAR(10),
	utmCampaign VARCHAR(15),
	coupon VARCHAR(10),
	totalValue DECIMAL NOT NULL,
	discountsTotals DECIMAL NOT NULL,
	host VARCHAR(20),
	sellerName VARCHAR(25),
	callCenterEmail VARCHAR(50),
	callCenterCode VARCHAR(20),
	client_id VARCHAR(20) NOT NULL,
	CONSTRAINT PK_orderId PRIMARY KEY CLUSTERED (orderId),
	CONSTRAINT FK_Orders_client_id FOREIGN KEY (client_id) REFERENCES Client (client_id)
);

CREATE TABLE LogisticsInfo(
	logistics_id VARCHAR(50),
	slaType VARCHAR(5),
	courrier VARCHAR(5),
	estimateDeliveryDate DATETIME,
	deliveryDeadline VARCHAR(4),
	shippingListPrice DECIMAL,
	shippingValue DECIMAL,
	trackingNumber VARCHAR(20),
	orderId VARCHAR(20),
	addressId VARCHAR(20),
	CONSTRAINT PK_logistics_id PRIMARY KEY CLUSTERED (logistics_id),
	CONSTRAINT FK_LogisticsInfo_orderId FOREIGN KEY (orderId) REFERENCES Orders (orderId),
	CONSTRAINT FK_LogisticsInfo_addressId FOREIGN KEY (addressId) REFERENCES ShippingData (addressId)
);

CREATE TABLE PaymentData(
	transaction_id VARCHAR(40),
	orderId VARCHAR(20),
	paymentSystemName VARCHAR(35),
	installments INTEGER,
	paymentValue DECIMAL
	CONSTRAINT FK_PaymentData_orderId FOREIGN KEY (orderId) REFERENCES Orders (orderId),
	CONSTRAINT PK_PaymentData_transaction_id PRIMARY KEY CLUSTERED (transaction_id, orderId)
);

CREATE TABLE DiscountsName(
	discountId VARCHAR(50),
	orderId VARCHAR(20),
	discountName VARCHAR(25),
	CONSTRAINT FK_DiscountsName_orderId FOREIGN KEY (orderId) REFERENCES Orders (orderId),
	CONSTRAINT PK_DiscountsName_discountId PRIMARY KEY CLUSTERED (discountId)
);

CREATE TABLE Items(
	skuID VARCHAR(6),
	skuName VARCHAR(100) NOT NULL,
	skuPath VARCHAR(50) NOT NULL,
	CONSTRAINT PK_skuId PRIMARY KEY CLUSTERED (skuId)
);

CREATE TABLE Order_Itens(
	orderItemsId VARCHAR(50),
	quantitySold INTEGER,
	skuSellingPrice DECIMAL,
	skuTotalPrice DECIMAL,
	skuValue DECIMAL,
	orderId VARCHAR(20),
	skuId VARCHAR(6),
	CONSTRAINT PK_orderItensId PRIMARY KEY CLUSTERED (orderItemsId),
	CONSTRAINT FK_Order_Itens_orderId FOREIGN KEY (orderId) REFERENCES Orders (orderId),
	CONSTRAINT FK_Order_Itens_skuId FOREIGN KEY (skuId) REFERENCES Items (skuId)
);

CREATE TABLE requestStatus(
	[id_status] [int] NOT NULL,
	[requestStatus] [bit] NOT NULL,
	[lastTimeRequest] [datetimeoffset](2) NOT NULL
);