
import serviceStatus from "../../../../enum/service-status";
import serviceAction from "../../../../enum/service-action";
import behavior from "../behavior";
import { getDataSet } from "../../../../utils/utils";

Component({
  behaviors: [behavior],
  properties: {},
  data: {
      serviceStatusEnum: serviceStatus,
      serviceActionEnum: serviceAction
  },
  methods: {
      handleUpdateStatus: function (event) {
          let action = getDataSet(event, 'action')
          action+=1
          this.triggerEvent('update', { action })
      },

      handleEditService: function () {
          this.triggerEvent('edit')
      }
  }
});
