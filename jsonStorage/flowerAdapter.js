'use strict';
function adapt(item){
    return {
        flowerId:+item.flowerId,
        name:item.name,
        stock: +item.stock,
        site:item.site,
        farmer:item.farmer
    }
}
module.exports={adapt}