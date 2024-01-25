function generateStockPrice(name: string): number {
    const hash = name.split('').reduce(function(a,b){a = ((a << 5) - a) + b.charCodeAt(0); return a&a}, 0);

    const amplitude = 100;
    const d = new Date();
    const n = d.getTime();
    //added toFixed(2)
    return parseFloat(Math.abs(3 * Math.sin(2*  hash * n) + Math.random() * amplitude).toFixed(2));
}

export function generateListOfStocksWithPrices(listOfStockSymbols?: Array<string>) {
    return listOfStockSymbols ?
        listOfStockSymbols.map(stock => { return {name: stock, price: generateStockPrice(stock)}}):
        generateRandomString(10).map(stock => { return {name: stock, price: generateStockPrice(stock)}});
}

function generateRandomString(amountOfStocks: number): Array<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    return [...Array(amountOfStocks)].map(() => [...Array(4)].reduce((res) => {res += characters.charAt(Math.floor(Math.random() * charactersLength)); return res;}, ''));
}