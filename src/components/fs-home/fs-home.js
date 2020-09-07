import fsSearch from '../fs-search/fs-search.vue';
import fsResults from '../fs-results/fs-results.vue';

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
    };
  },
  directives: {},
  computed: {
    isFlightAvailable() {
      return !!this.filteredOneWayData;
    },
  },
  mounted() {
    this.getFlightData()
      .then(this.handleFlightDataResponse)
      .catch(this.handleFlightDataError);
  },
  methods: {
    async getFlightData() {
      let response = await fetch(
        'https://tw-frontenders.firebaseio.com/advFlightSearch.json',
      );
      let json = await response.json();
      return json;
    },
    handleFlightDataResponse(res) {
      if (res) {
        this.flightData = this.formatResponse(res);
        console.log(this.flightData);
      }
    },
    handleFlightDataError(err) {
      console.error(err);
    },
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
    searchFlights(data) {
      this.filteredOneWayData = [];
      this.filteredTwoWayData = [];

      let date = new Date(data.departureDate);
      let date2 = new Date(date);
      date2 = new Date(date2.setHours(23, 59));
      this.getFlightOnD(data.origin, data.destination, date, date2, {});
      this.filteredOneWayData = this.filteredData;

      if (data.returnDate) {
        let date = new Date(data.returnDate);
        let date2 = new Date(date);
        date2 = new Date(date2.setHours(23, 59));
        this.getFlightOnD(data.destination, data.origin, date, date2, {});
        this.filteredTwoWayData = this.filteredData;
      }

      console.log(this.filteredFlightData);
      //   const directFlights = this.getDirectFlights(
      //     data.origin,
      //     data.destination,
      //     data.departureDate,
      //   );
      //   this.filteredOneWayData.push(...directFlights);
      //   if (data.returnDate) {
      //     const directFlights = this.getDirectFlights(
      //       data.destination,
      //       data.origin,
      //       data.returnDate,
      //     );
      //     this.filteredTwoWayData.push(...directFlights);
      //   }

      // const multiAirline = this.getMultiFlights();
    },
    getFlightOnD(
      origin,
      destination,
      minDepartureDate,
      maxDepartureDate,
      visited,
      path = [],
      route = [],
    ) {
      console.log('date1' + minDepartureDate);
      console.log('date2' + maxDepartureDate);

      visited[origin] = 1;
      const pathrec = [...path];
      for (let i = 0; i < this.flightData.length; i++) {
        let flight = this.flightData[i];
        // if (minDepartureDate <= flight["departureTime"] && flight["departureTime"] <= maxDepartureDate) {
        //     console.log("i am here");
        // }
        if (
          flight['origin'] == origin &&
          !visited[flight['destination']] &&
          minDepartureDate <= flight['departureTime'] &&
          flight['departureTime'] <= maxDepartureDate
        ) {
          // console.log("flight date and time + 30 minutes");
          // console.log(new Date(date2.setTime(date2.getTime() + (30 * 60 * 1000))));
          // console.log(date.toDateString());
          if (flight['destination'] == destination) {
            route.push([...pathrec, flight]);
            this.filteredData = route;
            console.log(route);
          } else {
            const flightdate = new Date(flight['arrivalTime']);
            // console.log(flight["arrivalTime"]);
            const date = new Date(
              flightdate.setTime(flightdate.getTime() + 30 * 60 * 1000),
            );
            const date2 = new Date(
              flightdate.setTime(flightdate.getTime() + 10 * 60 * 60 * 1000),
            );
            // console.log("date" + date);
            // console.log("date2" + date2)
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
    getDirectFlights(travelCity, travelDestination, travelDate) {
      const formattedTravelDate = this.formatDate(travelDate);
      return this.flightData.filter((flight) => {
        return (
          flight.origin === travelCity &&
          flight.destination === travelDestination &&
          flight.date === formattedTravelDate
        );
      });
    },
    formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('/');
    },
  },
};
