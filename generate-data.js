use OrdersDB

function randomDate() {
    var start = new Date();
    var end = new Date()
    var setDateResult = start.setDate(start.getDate() - 60);

    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomSKU() {
    var length = 1;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

db.Orders.deleteMany({})
db.Lines.deleteMany({})
db.Deliveries.deleteMany({})

for (i = 0; i < 10; i++) {
    var orderNumber = Math.floor(Math.random() * 999999999).toString();
    var lineCount = Math.floor(Math.random() * 5);
    var orderDate = randomDate()

    db.Orders.insert({
        "OrderNumber": orderNumber,
        "OrderDate": ISODate(orderDate.toISOString()),
        "UserId": "b5b0f469-dd8f-4b99-bc64-1a1f9e78dfae",
        "Address": {
            "City": "Istanbul",
            "Town": "Şişli"
        },
        "PaymentType": "CreditCard",
        "Amount": "15.0"
    })

    for (x = 0; x < lineCount; x++) {
        var lineSKU = randomSKU();
        var hasDelivery = Math.floor(Math.random() * 999999999) % 2;
        var deliveryCode = null;

        if (hasDelivery) {
            deliveryCode = Math.floor(Math.random() * 999999999).toString();
        }

        db.Lines.insert({
            "Sku": lineSKU,
            "Price": "13.89",
            "Quantity": 1,
            "Index": 1,
            "OrderNumber": orderNumber,
            "DeliveryCode": deliveryCode
        })

        if (hasDelivery) {
            var estimatedArrivalDate = randomDate()
            db.Deliveries.insert({
                "Code": deliveryCode,
                "TrackingNumber": "1232136565711",
                "CargoCompany": "AR",
                "ReceivedBy": null,
                "EstimatedArrivalDate": ISODate(estimatedArrivalDate.toISOString()),
                "Status": "Shipped",
                "Deci": "1"
            })
        }
    }
}
