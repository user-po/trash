// app.js

import Token from "./model/token";
import { createStoreBindings } from "mobx-miniprogram-bindings";
import { timStore } from "./store/tim";

App({
    async onLaunch() {
        const res = await Token.verifyToken()
        if (res.valid) {
            
            this.storeBindings = createStoreBindings(this, {
                store: timStore,
                actions: ['login']
            })
            await this.login()
            this.storeBindings.destroyStoreBindings()
        }
    }
})
