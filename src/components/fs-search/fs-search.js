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
      fromCity: 'Delhi (DEL)',
      toCity: 'Mumbai (BOM)',
      fromDate: null,
      toDate: null,
      persons: 1,
      showSearchError: false,
      tripType: 'One',
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
    validateSearch() {
      if (this.isRoundTrip) {
        return {
          isValid:
            !!this.fromCity &&
            !!this.toCity &&
            !!this.fromDate &&
            !!this.toDate &&
            !!this.persons,
          errText: this.$t('messages.fsMessages.commonTwoWayErr'),
        };
      }
      return {
        isValid:
          !!this.fromCity && !!this.toCity && !!this.fromDate && !!this.persons,
        errText: this.$t('messages.fsMessages.commonOneWayErr'),
      };
    },
    isSameCity() {
      if (this.fromCity === this.toCity) {
        return true;
      }
      return false;
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
    /**
     * function to emit flight data to fs-home component
     */
    searchFlights() {
      if (this.validateSearch.isValid) {
        if (!this.isSameCity) {
          this.$emit('searchFlight', this.searchedData);
        } else {
          this.toCity = null;
        }
      }
    },
  },
};
