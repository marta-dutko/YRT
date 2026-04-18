export interface Payment {
    cardHolder: string,
    cardNumber: string
    cardExpiryMonth: string,
    cardExpiryYear: string,
    cardCVN: string,
}

export const payment: Payment = {
    cardHolder: process.env.CARDHOLDER!,
    cardNumber: process.env.CARDNUMBER!,
    cardExpiryMonth: process.env.CARDEXPIRYMONTH!,
    cardExpiryYear: process.env.CARDEXPIRYYEAR!,
    cardCVN: process.env.CARDCVN!,
}