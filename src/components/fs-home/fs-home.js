import fsSearch from '../fs-search/fs-search.vue';
import fsResults from '../fs-results/fs-results.vue';
import serviceUrls from '../../utils/fs-service-urls';

export default {
  name: 'fs-home',
  components: {
    fsSearch,
    fsResults,
  },
  props: {},
  data() {
    return {
      flightData: null,
      filteredOneWayData: [],
      filteredTwoWayData: [],
      filteredData: [],
      oneWayInfoData: {},
      returnInfoData: {},
      isDataSearched: false,
      layoverTime: {
        min: 30,
        max: 600,
      },
    };
  },
  directives: {},
  computed: {
    isFlightAvailable() {
      return !!this.filteredOneWayData;
    },
  },
  mounted() {
    /**
     * On page load call function get flight data
     */
    this.getFlightData()
      .then(this.handleFlightDataResponse)
      .catch(this.handleFlightDataError);
  },
  methods: {
    /**
     * function to fetch flight data from service url.
     */
    async getFlightData() {
      let response = await fetch(serviceUrls.flights);
      let json = await response.json();
      return json;
    },

    /**
     * function to handle flight data response
     */
    handleFlightDataResponse(res) {
      if (res) {
        this.flightData = this.formatResponse(res);
        console.log(this.flightData);
      }
    },

    /**
     * function to handle flight response error
     */
    handleFlightDataError(err) {
      console.error(err);
    },

    /**
     * function to format flight response and get the arrivalDate and departureDate as Date() object.
     */
    formatResponse(res) {
      const formattedResp = res.map((flight) => {
        let date = new Date(flight['date']);
        let time = Object.assign(flight['departureTime'].split(':'));
        let flightdate = new Date(date.setHours(time[0], time[1]));
        flight['departureTime'] = flightdate;
        time = Object.assign(flight['arrivalTime'].split(':'));
        flightdate = new Date(date.setHours(time[0], time[1]));
        flight['arrivalTime'] = flightdate;
        return flight;
      });
      return formattedResp;
    },

    /**
     * function to be called on click of search button
     * @param data represents the data that is searched by user
     */
    searchFlights(data) {
      this.filteredOneWayData = [];
      this.filteredTwoWayData = [];
      this.filteredData = [];
      this.isDataSearched = true;
      this.createSearchInfoData(
        data.origin,
        data.destination,
        data.departureDate,
      );
      let depDate = new Date(data.departureDate);
      let depDateEod = new Date(depDate);
      depDateEod = new Date(depDateEod.setHours(23, 59));
      this.getFlightOnD(data.origin, data.destination, depDate, depDateEod, {});
      this.filteredOneWayData = [...this.filteredData];
      /**
       * This section will be executed if user has selected return trip
       */
      if (data.returnDate) {
        this.createSearchInfoData(
          data.destination,
          data.origin,
          data.returnDate,
          1,
        );
        let retDate = new Date(data.returnDate);
        let retDateEod = new Date(retDate);
        retDateEod = new Date(retDateEod.setHours(23, 59));
        this.getFlightOnD(
          data.destination,
          data.origin,
          retDate,
          retDateEod,
          {},
        );
        this.filteredTwoWayData = [...this.filteredData];
      }
    },

    /**
     * function to get the direct and multi-flight data. This fuction uses the recursion logic to solve this problem of searching different
     * paths between two cities. The route array keep track of the paths that are being found.
     * @param origin represents city of origin for search
     * @param destination represents city of destination for search
     * @param minDepartureDate represents the departure date from origin
     * @param maxDepartureDate represents the maximum time of that day
     * @param visited represents an object which checks if we have already visited this node while executing recursion
     * @param path represents array to store temporary path which can be the right path to destination.
     * @param route represents final list of available routes for destination.
     */
    getFlightOnD(
      origin,
      destination,
      minDepartureDate,
      maxDepartureDate,
      visited,
      path = [],
      route = [],
    ) {
      visited[origin] = 1;
      const pathrec = [...path];

      for (let i = 0; i < this.flightData.length; i++) {
        let flight = this.flightData[i];
        if (
          flight['origin'] == origin &&
          !visited[flight['destination']] &&
          minDepartureDate <= flight['departureTime'] &&
          flight['departureTime'] <= maxDepartureDate
        ) {
          if (flight['destination'] == destination) {
            route.push([...pathrec, flight]);
            this.filteredData = route;
            console.log(route);
          } else {
            const flightdate = new Date(flight['arrivalTime']);
            // Date object for adding get min layover time between two flights(30 mins)
            const date = new Date(
              flightdate.setTime(
                flightdate.getTime() + this.layoverTime.min * 60 * 1000,
              ),
            );
            // Date object for adding get max layover time between two flights(10 hours)
            const date2 = new Date(
              flightdate.setTime(
                flightdate.getTime() + this.layoverTime.max * 60 * 1000,
              ),
            );
            this.getFlightOnD(
              flight['destination'],
              destination,
              date,
              date2,
              visited,
              [...pathrec, flight],
              route,
            );
          }
        }
      }
      return;
    },

    /**
     * This functtion creates result header data as per oneWay or round trip
     */
    createSearchInfoData(origin, destination, departureDate, r) {
      if (r) {
        this.$set(this.returnInfoData, 'origin', origin);
        this.$set(this.returnInfoData, 'destination', destination);
        this.$set(this.returnInfoData, 'deparureDate', departureDate);
        return;
      }
      this.$set(this.oneWayInfoData, 'origin', origin);
      this.$set(this.oneWayInfoData, 'destination', destination);
      this.$set(this.oneWayInfoData, 'deparureDate', departureDate);
    },
  },
};
