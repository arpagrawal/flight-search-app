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
          filteredData: [],
      };
    },
    directives: {},
    computed: {
        isFlightAvailable() {
            return !!this.filteredData;
        }
    },
    mounted() {
        this.getFlightData()
        .then(this.handleFlightDataResponse)
        .catch(this.handleFlightDataError);
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
        },
        searchFlights(data) {
            this.filteredData = [];
            const directFlights = this.getDirectFlights(data.origin, data.destination, data.departureDate);
            this.filteredData.push(...directFlights);
        },
        getDirectFlights(travelCity, travelDestination, travelDate) {
            const formattedTravelDate = this.formatDate(travelDate);
            return  this.flightData.filter((flight) => {
                return (flight.origin === travelCity && flight.destination === travelDestination && flight.date === formattedTravelDate)
            });
        },
        formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        
            return [year, month, day].join('/');
        },
    },
  };