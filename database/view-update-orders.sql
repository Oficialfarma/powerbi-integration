CREATE VIEW OrdersToUpdate AS
SELECT indice = ROW_NUMBER() OVER (ORDER BY orderId), *
FROM Orders
WHERE statusDescription<>'Faturado' AND statusDescription<>'Cancelado';