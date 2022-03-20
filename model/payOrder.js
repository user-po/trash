import Http from "../utils/http"
import Base from "./base";

class payOrder extends Base{
    static async createPayOrder(params){
        const obj =  await Http.request({
            url:'v1/payOrder',
            data:params,
            method:"POST",
        })
   
        return obj;
    }
    static async payOrderQuery(order_no){
      const obj =  await Http.request({
        url:'v1/payOrder/query',
        data:{
          order_no:order_no
        },
        method:"GET",
    })

    return obj;
    }
    static async payOrderList(order_no){
      const obj =  await Http.request({
        url:'v1/payOrder/list',
        data:'',
        method:"GET",
    })

    return obj;
    }
}
export default  payOrder