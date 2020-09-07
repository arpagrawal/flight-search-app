import DatePicker from 'v-calendar/lib/components/date-picker.umd';
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
      persons: 1,
      showSearchError: false,
      tripType: '',
    };
  },
  directives: {},
  computed: {
    isRoundTrip() {
      if (this.tripType === 'Two') {
        return true;
      }
      return false;
    },
    isValidSearch() {
      if (this.isRoundTrip) {
        return (
          !!this.fromCity &&
          !!this.toCity &&
          !!this.fromDate &&
          !!this.toDate &&
          !!this.persons
        );
      }
      return (
        !!this.fromCity && !!this.toCity && !!this.fromDate && !!this.persons
      );
    },
    searchedData() {
      const searchedObj = {
        origin: this.fromCity,
        destination: this.toCity,
        departureDate: this.fromDate,
        passengers: this.persons,
      };
      if (this.isRoundTrip) {
        return {
          ...searchedObj,
          returnDate: this.toDate,
        };
      }
      return {
        ...searchedObj,
      };
    },
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
