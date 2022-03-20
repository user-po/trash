Component({
  properties: {
      rating: Object
  },
  data: {},
  methods: {
      handlePreview:function (event) {
          const index = event.currentTarget.dataset.index
          wx.previewImage({
              urls: this.data.rating.illustration,
              current: this.data.rating.illustration[index]
          })
      }
  }
});