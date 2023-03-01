export async function getOffersFromRPC(filters) {
    const offersData = await fetch("/api/data/json_rpc", {
        method: "POST",
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "0",
            method: "marketplace_global_get_offers_ex",
            params: {
              filter: {
                amount_low_limit: filters.minPrice, 
                amount_up_limit: filters.maxPrice,
                bonus: false,
                category: filters.category,
                fake: false, 
                keyword: filters.search,
                limit: filters.offersPerPage, 
                location_city: filters.locationCity,
                location_country: filters.locationCountry,
                offer_type_mask: 0,
                offset: filters.offset, 
                order_by: filters.order_by,
                primary: "",
                rate_low_limit: "0.000000",
                rate_up_limit: "0.000000", 
                reverse: filters.reverse || false,
                target: "",
                timestamp_start: +new Date(filters.minDate) || 0, 
                timestamp_stop: +new Date(filters.maxDate) || 0,
              },
            },
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(r => r.json());
    return { offers: offersData?.result?.offers || [], total: offersData?.result?.total_offers };
}

export async function deleteOffer(tx) {
  
}

export async function submitNewOffer(params) {
  const url = 'zano:action=marketplace_offer_create' +
    `&mixins=10` +
    `&hide_sender=true` +
    `&hide_receiver=true'` +
    `&title='${params.title}'` +
    `&description='${params.description}'` +
    `&category='${params.category}'` +
    `&price=${params.price}` +
    `&url='${params.images}'` +
    `&contact='${params.contact}'` +
    `&comments='${params.comment}'`;

  window.open(url,'_blank');
}
export async function buyOffer(address, title) {
  const url = `zano:action=send&address=${address}&comment='${title}'&hide_sender=true&hide_receiver=true`

  window.open(url,'_blank');
}