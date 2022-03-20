import roleType from '../../enum/role-type'
Component({
  properties: {
      userInfo: Object,
      role:Number
  },
  data: {},
  methods: {
      handleToChat() {
          this.triggerEvent('chat',
              { targetUserId: this.data.userInfo._id })
      },
      handleServicerComment(){
            if(this.data.role!==roleType.CONSUMER){
                wx.navigateTo({
                  url: `/pages/servicer-comment/servicer-comment?servicer_id=${this.data.userInfo._id}`,
                })
            }
      }
  }
});