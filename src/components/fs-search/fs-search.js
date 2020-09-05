import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import { cities } from '../../utils/fs-enums';

export default {
    name: 'fs-search',
    components: {
        DatePicker,
    },
    props: {},
    data() {
      return {
        cities,
        fromCity: null,
        toCity: null,
        fromDate: null,
        toDate: null,
        persons: null,
        showSearchError: false,
      };
    },
    directives: {},
    computed: {
        isValidSearch() {
            return(!!this.fromCity && !!this.toCity && !!this.fromDate && !!this.persons)
        },
        searchedData() {
            return {
                origin: this.fromCity,
                destination: this.toCity,
                departureDate: this.fromDate,
                passengers: this.persons,
            }
        }
    },
    mounted() {},
    methods: {
        searchFlights() {
            if (this.isValidSearch) {
                this.$emit('searchFlight', this.searchedData);
            }
        },
    },
  };