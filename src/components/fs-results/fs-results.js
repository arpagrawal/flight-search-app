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
  },
  data() {
    return {};
  },
  directives: {},
  computed: {},
  mounted() {},
  methods: {},
};