const axios = require('axios');

function createItem(marketHashName: string, minPrice: number | null) {
    if (minPrice !== null) {
        return {
            market_hash_name: marketHashName,
            currency: 'USD',
            min_price_tradable: minPrice
        };
    } else {
        return {
            market_hash_name: marketHashName,
            currency: 'USD',
            min_price_non_tradable: null
        };
    }
}

export async function getItems() {

    const url = 'https://api.skinport.com/v1/items';
    const params = {app_id: 730, currency: 'USD'};

    try {
        const response = await axios.get(url, {params});
        const items = response.data;

        return items.reduce((acc: any[], item: any) => {
            const newItem = createItem(item.market_hash_name, item.min_price);
            acc.push(newItem);
            return acc;
        }, []);

    } catch (error) {
        console.error(error);
    }
}

