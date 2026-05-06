function fetchUser(user) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (user) {
                resolve({ user, age: 12, gender: "Male" });
            } else {
                reject("User not found");
            }

        }, 1000);

    });
}

function fetchOrder(order) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (order) {
                resolve({ orderId: order, qt: 12 });
            } else {
                reject("Order not found");
            }

        }, 1000);

    });
}

function fetchPayment(PymtId) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (PymtId) {
                resolve({ PymtId, status: true, orderid: 23 });
            } else {
                reject("Payment failed");
            }

        }, 1000);

    });
}

// fetchUser("Prakhar")
//     .then((value) => console.log(value))
//     .catch((error) => console.log(error));

// fetchOrder(23)
//     .then((value) => console.log(value))
//     .catch((error) => console.log(error));

// fetchPayment(1234)
//     .then((value) => console.log(value))
//     .catch((error) => console.log(error));

Promise.all([fetchUser("Prakhar"),fetchOrder(12345),fetchPayment(12)]).then(value=> console.log(value)).catch(error => console.log(error));