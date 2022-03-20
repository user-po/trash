import Http from "../utils/http"

class Money{
    static async Charge(count){
        const moneyObj =  await Http.request({
            url:'v1/charge',
            data:{
               count:count
            },
            method:"POST",
        })
   
        return moneyObj;
    }
    static async moneyQuery(){
      const moneyObj = await Http.request({
        url:'v1/money',
        method:'GET'
      })
      return moneyObj;
    }
    static async pay(order_id){
      const moneyObj = await Http.request({
        url:'v1/pay',
        data:{
          order_id:order_id
        },
        method:'POST'
      })
      return moneyObj;
    }
}
export default  Money