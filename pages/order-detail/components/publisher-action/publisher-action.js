import behavior from "../behavior";

Component({
    behaviors: [behavior],
    properties: {},
    data: {},
    methods: {
        handleRating() {
            this.triggerEvent('rating')
        }
    }
});