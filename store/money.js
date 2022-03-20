import { action, observable } from "mobx-miniprogram";

export const moneyStore = observable({
    //数据字段
    money:"0,00",
    setMoney:action(function(money){
         this.money = money;
    }),
    resetMoney:action(function(){
        this.money = "0,00"
    })
})