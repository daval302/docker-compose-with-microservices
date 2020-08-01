export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateNPaymentRquests = (number, items) => (
    Array(getRandomInt(0, number)).fill().map((_, i) => {
        const randomItem = items[getRandomInt(0, items.length - 1)]
        return {
            id: randomItem['id'],
            name: randomItem['name'],
            price: randomItem['price'],
            quantity: getRandomInt(0, 5)
        }
    })
)