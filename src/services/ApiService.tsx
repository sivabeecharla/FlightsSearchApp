// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {FLIGHT_OFFERS} from '../services/ApiEndpoints/'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLIGHT_OFFERS} from './ApiEndpoints';
import resources from '../resources';


const formatDate = (date: string | number | Date) => {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
  const day = formattedDate.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getToken = async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('client_id', resources.config.CLIENT_ID);
    urlencoded.append('client_secret', resources.config.CLIENT_SCREAT);
    urlencoded.append('grant_type', 'client_credentials');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded.toString(), // Serialize URLSearchParams to a string
      redirect: 'follow',
    };

    const response = await fetch(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      requestOptions,
    );
    const result = await response.json();

    let newAccessToken = result?.access_token;
    await AsyncStorage.setItem(resources.constants.token, newAccessToken);
    const expirationTimeInSeconds = convertTime(result?.expires_in); // Calculate based on the response or a predefined value

    await AsyncStorage.setItem(
      resources.constants.token_expires_at,
      expirationTimeInSeconds.toString(),
    );
  } catch (error) {
  }
};

const isTokenValid = async (): Promise<boolean> => {
  let asncToken = await AsyncStorage.getItem(
    resources.constants.token_expires_at,
  );

  if (asncToken == undefined || null) {
    return false;
  }
  const expirationTimeInSeconds: number | null = parseInt(asncToken, 10);
  const currentTimestamp: number = Math.floor(Date.now() / 1000);
 
  return (
    expirationTimeInSeconds !== null &&
    expirationTimeInSeconds > currentTimestamp
  );
};

export const fetchFlightDetails = async (orgiataCode:string,destiataCode:string,_departureDate: string | number | Date,numberOfPassengers:number) => {
  if (await isTokenValid()) {
    // Token is still valid, make the API request
    const token = await AsyncStorage.getItem(resources.constants.token);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    };

    const apiUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${orgiataCode}&destinationLocationCode=${destiataCode}&departureDate=${formatDate(
      _departureDate,
    )}&adults=${numberOfPassengers}&max=5`;

    try {
      const response = await fetch(apiUrl, requestOptions);
      const result = await response.text();

      return result;
    } catch (error) {
    }
  } else {
    // Token is expired or about to expire, refresh it
    await getToken();
  }
};

export const fetchData = async (query: string) => {
  const token = await AsyncStorage.getItem(resources.constants.token);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${query}`,
      requestOptions,
    );

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    const result = await response.text();

    return result;
  } catch (error) {
  }
};

const convertTime = (secondsToAdd: number) => {
  const currentDate = new Date();
  // Add seconds to the current date
  const futureDate = new Date(currentDate.getTime() + secondsToAdd * 1000);
  return futureDate.getTime();
};
