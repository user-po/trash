import Http from "../utils/http"

class userSig{
    static async getUserSig(userId){
        const obj =  await Http.request({
            url:'v1/userSig',
            data:{
              userId
            },
            method:"GET",
        })
   
        return obj;
    }
}
export default  userSig