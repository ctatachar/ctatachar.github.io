window.addEventListener('load', function () {
    //energy widget reusable component 
    //since it's only one component here, including directly in w/out separate import statement
    Vue.component('energy-widget-comp', {
        template: '#energy-widget-templ',
        data() {
            return {
                info: null,
                isActive: false,
                carsActive: true,
                treesActive: false,
                co2Active: false,
            }
        },
        mounted() {
            //using modern, promise based fetch instead of XHR, for older browser support, can replace with axios or use babel
            fetch('scripts/user_data.json')
                .then(response => response.json())
                .then(res => this.info = res);
        },
        methods: {
            carsFilter: function () {
                this.carsActive = true;
                this.treesActive = false;
                this.co2Active = false;
            },
            treesFilter: function () {
                this.treesActive = true;
                this.carsActive = false;
                this.co2Active = false;
            },
            co2Filter: function () {
                this.co2Active = true;
                this.treesActive = false;
                this.carsActive = false;
            }
        }
        //closing component
    });

    //energy application
    new Vue({
        el: '#energy-app',
    })
    //closing window load
});