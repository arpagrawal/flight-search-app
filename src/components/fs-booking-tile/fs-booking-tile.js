export default {
  name: 'fs-booking-tile',
  components: {},
  props: {
    flightInfo: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      flightData: [],
      multiFlightHeaderDetails: {},
      showDetails: false,
    };
  },
  directives: {},
  computed: {
    ismultiFlight() {
      return this.flightInfo.length > 1;
    },
  },
  mounted() {
    this.flightData = this.flightInfo;
    if (this.ismultiFlight) {
      this.createMultipleFlightData();
    }
  },
  methods: {
    createMultipleFlightData() {
      const lastElement = this.flightInfo.length - 1;
      const totalPrice = this.flightInfo
        .map((item) => item.price)
        .reduce((a, b) => {
          return Number(a) + Number(b);
        }, 0);
      this.multiFlightHeaderDetails = {
        arrivalTime: this.flightInfo[lastElement].arrivalTime,
        date: this.flightInfo[0].date,
        departureTime: this.flightInfo[0].departureTime,
        destination: this.flightInfo[lastElement].destination,
        flightNo: '',
        name: 'Multiple',
        origin: this.flightInfo[0].origin,
        price: totalPrice,
      };

      //   this.flightData = [obj, ...this.flightData];
    },
    toggleDetailsVisibility() {
      this.showDetails = !this.showDetails;
    },
  },
};
