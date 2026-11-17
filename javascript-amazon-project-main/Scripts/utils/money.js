export function formatecurrency(priceCents){
   return (Math.round(priceCents) / 100).toFixed(2);        // 2095 => 20.85  // math.round [coverrts the round]
}

export default formatecurrency;