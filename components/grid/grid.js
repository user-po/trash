import {getEventParam} from '../../utils/utils'
Component({
  options: {
    multipleSlots: true,
  },
  relations: {
    "../grid-item/grid-item": {
      type: "child",
    },
  },
  properties: {
    rowNum: {
      type: Number,
      value: 3,
    },
    title: String,
    extend: String,
    extendCell: Object,
  },
  data: {},
  lifetimes: {
    ready() {
      this.getGridItems();
    },
  },
  methods: {
    getGridItems() {
      const items = this.getRelationNodes("../grid-item/grid-item");
      const gridItems = items.map((item, index) => {
        return {
          index,
        };
      });
      this.setData({
        gridItems,
      });
    },
    handleSelect(event) {
      const cell = getEventParam(event, "cell");
      this.triggerEvent("itemtap", { cell });
    },
    handleExtend() {
      this.triggerEvent("extendtap", { cell: this.data.extendCell });
    },
  },
});
