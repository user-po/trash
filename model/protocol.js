import Http from "../utils/http"
import Base from "./base";

class protocol extends Base{
    static async getProtocol(){
        const obj =  await Http.request({
            url:'v1/protocol',
            data:{
              used:true
            },
            method:"GET",
        })
   
        return obj;
    }
}
export default  protocol