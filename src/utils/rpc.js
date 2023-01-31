export async function getOffersFromRPC(filters) {
    const result = await fetch("/json_rpc", {
        method: "POST",
        body: JSON.stringify({
            jsonrpc: "2.0",
            id: "0",
            method: "marketplace_global_get_offers_ex",
            params: {
              // filter: {
              //   amount_low_limit: 0,//-
              //   amount_up_limit: 0,//-
              //   bonus: false, //+
              //   category: filters.category,
              //   fake: false, //+
              //   keyword: filters.search, //+-
              //   limit: filters.offersPerPage, 
              //   location_city: filters.locationCity,
              //   location_country: filters.locationCountry,
              //   offer_type_mask: 0,
              //   offset: 0, 
              //   order_by: 0,  //+-
              //   primary: "",
              //   rate_low_limit: "0.000000",
              //   rate_up_limit: "0.000000", 
              //   reverse: false,
              //   target: "",
              //   timestamp_start: +new Date(filters.minDate) || 0, 
              //   timestamp_stop: +new Date(filters.maxDate) || 0,
              // },
              filter: {
                amount_low_limit: 0,
                amount_up_limit: 0,
                bonus: false, 
                category: "", 
                fake: false, 
                keyword: "", 
                limit: 100, 
                location_city: "", 
                location_country: "", 
                offer_type_mask: 0,  
                offset: 0, 
                order_by: 0,  
                primary: "", 
                rate_low_limit: "0.000000", 
                rate_up_limit: "0.000000", 
                reverse: false, 
                target: "",  
                timestamp_start: 0, 
                timestamp_stop: 0, 
              },
            },
        }),
        headers: {
            "Content-type": "application/json"
        }
    }).then(r => r.json());
    return result;
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
    `&url='${params.image}'` +
    `&contact='${params.contact}'` +
    `&comments='${params.comment}'`;

  window.open(url,'_blank');
}