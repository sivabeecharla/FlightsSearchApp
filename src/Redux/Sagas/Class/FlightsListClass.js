import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../../../services/ApiService';

class FLIGHTS {
  /**
   * @description get flights data
   */
  async getFlightsList(payload) {
    return await ApiService.fetchFlightDetails(payload)
  }
}


export default new FLIGHTS();
