import fsSearch from '../fs-search/fs-search.vue';

export default {
    name: 'fs-home',
    components: {
        fsSearch,
    },
    props: {},
    data() {
      return {
          flightData: null,
          showData: false,
      };
    },
    directives: {},
    computed: {},
    mounted() {
        this.getFlightData()
        .then(this.handleFlightDataResponse)
        .catch(this.handleFlightDataError);
        // fetch('https://tw-frontenders.firebaseio.com/advFlightSearch.json')
        // .then(response => response.json())
        // .then(this.handleFlightDataResponse)
        // .catch(this.handleFlightDataError);
    },
    methods: {
        async getFlightData() {
            let response = await fetch('https://tw-frontenders.firebaseio.com/advFlightSearch.json');
            let json = await response.json();
            return json;
        },
        handleFlightDataResponse(res) {
            this.flightData = res;
            console.log(this.flightData);
        },
        handleFlightDataError(err) {
            console.error(err);
        }
    },
  };