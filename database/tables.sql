USE powerbiDev;

CREATE TABLE Client(
	client_id VARCHAR(50) NOT NULL,
	name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(75) NOT NULL,
	document VARCHAR(13) NOT NULL,
	CONSTRAINT PK_clientId PRIMARY KEY CLUSTERED (client_id)
);

CREATE TABLE ShippingData(
	addressId VARCHAR(50),
	state VARCHAR(2) NOT NULL,
	city VARCHAR(100) NOT NULL,
	receiverName VARCHAR(150),
	neighborhood VARCHAR(200) NOT NULL,
	CONSTRAINT PK_addressId PRIMARY KEY CLUSTERED (addressId)
);

CREATE TABLE Client_ShippingData(
	clientShippingId VARCHAR(50),
	client_id VARCHAR(50) NOT NULL,
	addressId VARCHAR(50) NOT NULL,
	CONSTRAINT PK_clientShippingId PRIMARY KEY CLUSTERED (clientShippingId),
	CONSTRAINT FK_Client_ShippingData_client_id FOREIGN KEY (client_id) REFERENCES Client (client_id),
	CONSTRAINT FK_Client_ShippingData_addressId FOREIGN KEY (addressId) REFERENCES ShippingData (addressId)
);

CREATE TABLE Orders(
	orderId VARCHAR(50),
	origin VARCHAR(30),
	sequence VARCHAR(10),
	creation_date DATETIMEOFFSET(2) NOT NULL,
	statusDescription VARCHAR(50),
	lastChangeDate DATETIMEOFFSET(2) NOT NULL,
	utmSource VARCHAR(50),
	utmMedium VARCHAR(50),
	utmCampaign VARCHAR(50),
	coupon VARCHAR(50),
	totalValue DECIMAL(18,2) NOT NULL,
	discountsTotals DECIMAL(18,2) NOT NULL,
	host VARCHAR(30),
	sellerName VARCHAR(30),
	callCenterEmail VARCHAR(50),
	callCenterCode VARCHAR(50),
	client_id VARCHAR(50) NOT NULL,
	CONSTRAINT PK_orderId PRIMARY KEY CLUSTERED (orderId),
	CONSTRAINT FK_Orders_client_id FOREIGN KEY (client_id) REFERENCES Client (client_id)
);

CREATE TABLE LogisticsInfo(
	logistics_id VARCHAR(50),
	slaType VARCHAR(20),
	courrier VARCHAR(20),
	estimateDeliveryDate DATETIMEOFFSET(2),
	deliveryDeadline VARCHAR(4),
	trackingNumber VARCHAR(20),
	orderId VARCHAR(50),
	addressId VARCHAR(50),
	CONSTRAINT PK_logistics_id PRIMARY KEY CLUSTERED (logistics_id),
	CONSTRAINT FK_LogisticsInfo_orderId FOREIGN KEY (orderId) REFERENCES Orders (orderId),
	CONSTRAINT FK_LogisticsInfo_addressId FOREIGN KEY (addressId) REFERENCES ShippingData (addressId)
);

CREATE TABLE PaymentData(
	transaction_id VARCHAR(50),
	orderId VARCHAR(50),
	paymentSystemName VARCHAR(100),
	installments INTEGER,
	paymentValue DECIMAL(18,2)
	CONSTRAINT FK_PaymentData_orderId FOREIGN KEY (orderId) REFERENCES Orders (orderId),
	CONSTRAINT PK_PaymentData_transaction_id PRIMARY KEY CLUSTERED (transaction_id, orderId)
);

CREATE TABLE DiscountsName(
	discountId VARCHAR(50),
	orderId VARCHAR(50),
	discountName VARCHAR(50),
	CONSTRAINT FK_DiscountsName_orderId FOREIGN KEY (orderId) REFERENCES Orders (orderId),
	CONSTRAINT PK_DiscountsName_discountId PRIMARY KEY CLUSTERED (discountId)
);

CREATE TABLE Items(
	skuID VARCHAR(6),
	skuName VARCHAR(200) NOT NULL,
	CONSTRAINT PK_skuID PRIMARY KEY CLUSTERED (skuID)
);

CREATE TABLE Order_Items(
	orderItemsId VARCHAR(50),
	quantitySold INTEGER,
	skuSellingPrice DECIMAL(18,2),
	skuTotalPrice DECIMAL(18,2),
	skuValue DECIMAL(18,2),
	orderId VARCHAR(50),
	skuID VARCHAR(50),
	shippingListPrice DECIMAL(18,2),
	shippingValue DECIMAL(18,2),
	CONSTRAINT PK_orderItensId PRIMARY KEY CLUSTERED (orderItemsId),
	CONSTRAINT FK_Order_Itens_orderId FOREIGN KEY (orderId) REFERENCES Orders (orderId),
	CONSTRAINT FK_Order_Itens_skuID FOREIGN KEY (skuID) REFERENCES Items (skuID)
);

CREATE TABLE requestStatus(
	[id_status] [int] NOT NULL,
	[requestStatus] [bit] NOT NULL,
	[lastTimeRequest] [datetimeoffset](2) NOT NULL
);