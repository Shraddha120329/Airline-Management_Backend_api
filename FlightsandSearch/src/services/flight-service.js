//const { FlightRepository } = require('../repository/flight-repository');
//const{ AirplaneRepository } = require('../repository/airplane-repository');
const {FlightRepository, AirplaneRepository} = require('../repository/index');
const{ compareTime } = require('../utils/helper');

class FlightService{

    constructor(){
        this.airplaneRepository = new AirplaneRepository();
        this.flightrepository = new FlightRepository();
    }
    
    async createFlight(data){
        try {
            if(!compareTime(data.arrivalTime, data.departureTime)){
                throw{error: 'Arrival time cannot be less than departure time'};
            }
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            const flight = await this.flightrepository.createFlight(
            {
                ...data, 
                totalSeats:airplane.capacity 
            });
            return flight;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw{error};
        }
    }

    async getAllFlightData(data){
        try {
          const flights = await this.flightrepository.getAllFlights(data);
          return flights;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw{error};
        }
    }

    async getFlight(flightId){
        try {
          const flight = await this.flightrepository.getFlight(flightId);
          return flight;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw{error};
        }
    }

    async updateFlight(flightId, data){
        try {
          const response = await this.flightrepository.updateFlight(flightId, data);
          return response;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw{error};
        }
    }
}



module.exports = FlightService;