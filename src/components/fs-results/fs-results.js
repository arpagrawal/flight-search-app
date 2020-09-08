import fsBookingTile from '../fs-booking-tile/fs-booking-tile.vue';

export default {
  name: 'fs-results',
  components: {
    fsBookingTile,
  },
  props: {
    flightData: {
      type: Array,
      default: [],
    },
    searchInfo: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  directives: {},
  computed: {},
  mounted() {},
  methods: {
    /**
     * This functtion convert the date object into string format "Sun, Nov 01 2020"
     * @param d respresents date object
     */
    displayDate(d) {
      const displayDate = new Date(d);
      return displayDate.toDateString();
    },
  },
};
