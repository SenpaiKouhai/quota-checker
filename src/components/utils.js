
 // format numbers with commas
export const format = (number) => {
   return new Intl.NumberFormat('en-PH').format(number);
} 

// format numbers to php
export const toPhp = (number) => {
    return new Intl.NumberFormat('en-PH', { style: "currency", currency: "PHP" }).format(number)
}

export const baseUrl = "https://senhai-quota.vercel.app/"
// export const baseUrl = "http://localhost:5100/"

export const netWorth = (slp, price) => {
    return Number(slp) * Number(price)
}
