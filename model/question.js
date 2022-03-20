import Http from "../utils/http"
import Base from "./base";

class question extends Base{
    static async getQuestionList(){
        const obj =  await Http.request({
            url:'v1/question',
            data:'',
            method:"GET",
        })
   
        return obj;
    }
}
export default  question