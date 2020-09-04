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
        fromDate: null,
        toDate: null,
      };
    },
    directives: {},
    computed: {},
    mounted() {},
    methods: {
        searchFlights() {
            this.$emit('searchFlight');
        },
    },
  };