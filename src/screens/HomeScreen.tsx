import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import {fetchFlightDetails, getToken} from '../services/ApiService';
import gStyles from '../resources/styles/styles';
import resources from '../resources';
import IonIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectCity from './SelectCity';
import Header from '../components/Header';
import {FlatList} from 'react-native-gesture-handler';
import {FlightsItem} from '../types/types';
import LoaderComponent from '../components/LoaderComponent';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import NoDataComponent from '../components/NoDataComponent';
import {Toaster} from '../services/Toaster';
import NoInternetConnection from '../components/NoInternetConnection';
import {useNetInfo} from '@react-native-community/netinfo';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = () => {
  const netInfo = useNetInfo();

  const [departureAirport, setDepartureAirport] = useState<string>(
    'Select Departure city',
  );
  const [destinationAirport, setDestinationAirport] = useState<string>(
    'Select Destination city',
  );
  const [dateOfTravel, setDateOfTravel] = useState<Date>(new Date());
  const [numberOfPassengers, setNumberOfPassengers] = useState<number>(1);
  const [result, setResult] = useState<boolean>(false);
  const [flightsList, setFlightList] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [dictionaries, setDictionaries] = useState<object>({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [show, setShow] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [fromCityiataCode, setFromCity] = useState<string>('');
  const [toCityiataCode, setToCity] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  const interchangeDestinations = () => {
    // Function to interchange departure and destination airports
    if (departureAirport != 'Select Departure city') {
      if (destinationAirport != 'Select Destination city') {
        const temp = departureAirport;
        setDepartureAirport(destinationAirport);
        setDestinationAirport(temp);
        const tempcode = fromCityiataCode;
        setFromCity(toCityiataCode);
        setToCity(tempcode);
      } else {
        Toaster.error('Please select Destination city');
      }
    } else {
      Toaster.error('Please select Departure city');
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress,
      );
      return () => {
        backHandler.remove();
      };
    }, []),
  );

  const handleBackPress = () => {
    // Your custom logic here
    // For example, show an alert to confirm exit
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );

    // Return true to prevent the default back button behavior
    return true;
  };

  const _validate = () => {
    if (departureAirport == '' || departureAirport == 'Select Departure city') {
      Toaster.error('Select Departure city');
      return false;
    }
    if (
      destinationAirport == '' ||
      destinationAirport == 'Select Destination city'
    ) {
      Toaster.error('Select Destination city');

      return false;
    }

    return true;
  };

  const searchFlights = async () => {
    if (_validate()) {
      setLoading(true);
      const result = await fetchFlightDetails(
        fromCityiataCode,
        toCityiataCode,
        dateOfTravel,
        numberOfPassengers,
      );
      const resultJson = JSON.parse(result);

      setDictionaries(resultJson.dictionaries);
      setFlightList(resultJson.data);
      setResult(true);
      setLoading(false);
    }
  };

  const convertTime = (timeString: string) => {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = timeString.split(':').map(Number);

    // Convert hours to AM/PM format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    // Create the final formatted string
    const formattedTime = `${displayHours}:${
      minutes < 10 ? '0' : ''
    }${minutes} ${ampm}`;

    return formattedTime;
  };

  const renderItem = ({item}: any) => {
    let departure: string = '';
    let arrival: string = '';
    let carrierCode: string = '';
    let flightNumber: string = '';
    let departureTime: string | number | Date = '';
    let arrivalTime: string | number | Date = '';
    let price: string = item?.price?.grandTotal;
    let currency: string = item?.price?.currency;

    // Extracting flight information
    const itineraries: any = item?.itineraries;

    const airlineName: string =
      dictionaries?.carriers[item?.validatingAirlineCodes[0]];
    const currencyCode: string = dictionaries?.currencies[currency];

    itineraries.forEach((itinerary: {segments: any}) => {
      const segments = itinerary.segments;
      segments.forEach(
        (segment: {
          departure: any;
          arrival: any;
          carrierCode: any;
          number: any;
        }) => {
          departure = segment.departure;
          arrival = segment.arrival;
          carrierCode = segment.carrierCode;
          flightNumber = segment.number;
          departureTime = new Date(departure.at).toLocaleTimeString();
          arrivalTime = new Date(arrival.at).toLocaleTimeString();
        },
      );
    });

    return (
      <View style={[gStyles.cardContainer, {width: wp('90%')}]}>
        <View>
          <Text
            style={{
              fontSize: hp('2%'),
              color: resources.colors.black,
              fontWeight: '500',
            }}>
            {airlineName}
          </Text>
          <Text
            style={{
              fontSize: hp('1.6%'),
              color: resources.colors.black,
              fontWeight: '500',
            }}>{`${carrierCode} ${flightNumber}`}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                fontSize: hp('2.4%'),
                fontWeight: '500',
                color: resources.colors.black,
              }}>{`${convertTime(departureTime)}`}</Text>
            <Text
              style={{color: resources.colors.black_light, fontWeight: '400'}}>
              {' '}
              Departure time
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: hp('2.4%'),
                fontWeight: '500',
                color: resources.colors.black,
              }}>{`${convertTime(arrivalTime)}`}</Text>
            <Text
              style={{color: resources.colors.black_light, fontWeight: '400'}}>
              {' '}
              Arrival time
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: hp('2%'),
              fontWeight: '500',
              color: resources.colors.black,
            }}>
            {currencyCode == 'EURO' && '€ '}
            {price}
          </Text>
          <Text> Ticket price</Text>
        </View>
      </View>
    );
  };

  const onSelectcity = (value: any) => {
    setModalVisible(false);
    if (selectedCity == 'Departure') {
      setFromCity(value.iataCode);
      setDepartureAirport(value.name + ' (' + value.iataCode + ')');
    } else {
      setToCity(value.iataCode);
      setDestinationAirport(value.name + ' (' + value.iataCode + ')');
    }
  };

  const _showDatepicker = () => {
    setShow(true);
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setSelectedDate(currentDate);
    {
      dayjs(selectedDate).format('ddd, MMM DD YYYY');
    }
    setDateOfTravel(selectedDate);
  };

  const countincreament = () => {
    setNumberOfPassengers(numberOfPassengers + 1);
  };
  const countdecreament = () => {
    numberOfPassengers != 1 && setNumberOfPassengers(numberOfPassengers - 1);
  };

  const searchcity = (value: string) => {
    setModalVisible(true);
    setSelectedCity(value);
  };

  return (
    <View style={styles.container}>
      {/*Header*/}
      <Header
        title={'Flights'}
        backArrow={result}
        onPress={() => {
          setResult(false);
        }}
      />
      {/*LoaderComponent*/}
      {netInfo.isConnected == false ? (
        <NoInternetConnection />
      ) : isLoading ? (
        <LoaderComponent />
      ) : result ? (
        <View>
          {/*Search result */}
          <View style={styles.container_}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: resources.colors.black_light,
                  fontWeight: '400',
                }}>
                Departure From
              </Text>
              <Text style={[styles.headertxt]}>{departureAirport}</Text>
            </View>

            <View style={{flex: 1}}>
              <Text
                style={{
                  color: resources.colors.black_light,
                  fontWeight: '400',
                  textAlign: 'right',
                }}>
                Arrival To
              </Text>
              <Text style={[styles.headertxt, {textAlign: 'right'}]}>
                {destinationAirport}
              </Text>
            </View>
          </View>
          <FlatList
            data={flightsList}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            style={{marginBottom: hp('10%')}}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<NoDataComponent />}
          />
        </View>
      ) : (
        <>
          {/*Search Details */}
          <View style={[gStyles.cardContainer, {width: '95%'}]}>
            <View style={[{width: '100%'}]}>
              <View
                style={[
                  styles.input,
                  {flexDirection: 'row', paddingLeft: 10, alignItems: 'center'},
                ]}>
                <MaterialIcons
                  name="flight-takeoff"
                  size={25}
                  style={{marginEnd: 10}}
                  color={resources.colors.black}
                />
                <View>
                  <Text
                    style={{
                      color: resources.colors.black_secondary,
                      fontSize: hp('1.8%'),
                      marginTop: 10,
                    }}>
                    From
                  </Text>
                  <TouchableOpacity onPress={() => searchcity('Departure')}>
                    <Text
                      style={{
                        color:
                          departureAirport == 'Select Departure city'
                            ? resources.colors.grey
                            : resources.colors.black,
                        fontSize: hp('2%'),
                        fontWeight: 'bold',
                        marginVertical: 10,
                      }}>
                      {departureAirport}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={[
                  styles.input2,
                  {
                    flexDirection: 'row',
                    paddingLeft: 10,
                    alignItems: 'center',
                  },
                ]}>
                <MaterialIcons
                  name="flight-land"
                  size={25}
                  style={{marginEnd: 10}}
                  color={resources.colors.black}
                />

                <View>
                  <Text
                    style={{
                      color: resources.colors.black_secondary,
                      fontSize: hp('1.8%'),
                      marginTop: 10,
                    }}>
                    To
                  </Text>
                  <TouchableOpacity onPress={() => searchcity('Destination')}>
                    <Text
                      style={{
                        color:
                          destinationAirport == 'Select Destination city'
                            ? resources.colors.grey
                            : resources.colors.black,
                        fontSize: hp('2%'),
                        fontWeight: 'bold',
                        marginVertical: 10,
                      }}>
                      {destinationAirport}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.backBtn,
                  Platform.OS == 'ios'
                    ? resources.gStyles.boxShadow
                    : resources.gStyles.headerShadow,
                ]}
                onPress={() => interchangeDestinations()}>
                <IonIcon
                  name="swap-vertical"
                  size={25}
                  color={resources.colors.black}
                />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.input,
                {
                  width: '100%',
                  marginTop: hp('3%'),
                  borderRadius: 10,
                  justifyContent: 'center',
                },
              ]}>
              <Text
                style={{
                  color: resources.colors.black_secondary,
                  fontSize: hp('1.8%'),
                  marginBottom: 10,
                }}>
                Departure Date
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginEnd: wp('3%'),
                }}
                onPress={_showDatepicker}>
                <Text
                  style={[
                    styles.dateInputText,
                    {color: resources.colors.black},
                  ]}>
                  {dayjs(selectedDate).format('ddd, MMM DD YYYY')}
                </Text>
                <IonIcon
                  name="calendar"
                  size={20}
                  color={resources.colors.black}
                  style={{
                    marginRight: wp('4%'),
                  }}
                />
              </TouchableOpacity>

              {show && (
                <RNDateTimePicker
                  value={selectedDate}
                  mode={'date'}
                  is24Hour={true}
                  onChange={onChange}
                  minimumDate={new Date()}
                />
              )}
            </View>

            <View
              style={[
                styles.input,
                {
                  width: '100%',
                  borderRadius: 10,
                  height: hp('10%'),
                  paddingVertical: 10,
                  marginTop: hp('3%'),
                },
              ]}>
              <Text
                style={{
                  color: resources.colors.black_secondary,
                  fontSize: hp('1.8%'),
                  marginBottom: 10,
                }}>
                Number Of Passengers
              </Text>

              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={[
                      Platform.OS == 'ios'
                        ? resources.gStyles.boxShadow
                        : resources.gStyles.headerShadow,
                    ]}
                    onPress={() => countdecreament()}>
                    <AntDesign
                      name="minuscircleo"
                      size={25}
                      color={resources.colors.black}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: resources.colors.black,
                      fontSize: hp('2%'),
                      fontWeight: 'bold',
                      marginHorizontal: 10,
                    }}>
                    {numberOfPassengers}
                  </Text>
                  <TouchableOpacity
                    style={[
                      Platform.OS == 'ios'
                        ? resources.gStyles.boxShadow
                        : resources.gStyles.headerShadow,
                    ]}
                    onPress={() => countincreament()}>
                    <AntDesign
                      name="pluscircleo"
                      size={25}
                      color={resources.colors.black}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={searchFlights}>
              <Text style={styles.loginBtnTxt}>Search Flights</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Modal for search cites */}
      <Modal isVisible={isModalVisible}>
        <View style={{flex: 1}}>
          <SelectCity onPress={value => onSelectcity(value)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: resources.colors.white,
  },
  input: {
    width: '100%',
    height: hp('9%'),
    backgroundColor: resources.colors.grey1,
    paddingLeft: 20,
    marginBottom: 4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  input2: {
    width: '100%',
    height: hp('9%'),
    backgroundColor: resources.colors.grey1,
    paddingLeft: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  datePicker: {
    width: '100%',
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: resources.colors.button_orange,
    width: wp('90%'),
    height: hp('7%'),
    // marginHorizontal: wp('5%'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('5%'),
  },
  loginBtnTxt: {
    color: '#fff',
    fontSize: hp('2.5%'),
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  backBtn: {
    width: 50,
    height: 50,
    backgroundColor: resources.colors.grey1,
    borderRadius: 10,
    position: 'absolute',
    borderWidth: 2,
    borderColor: resources.colors.white,
    alignSelf: 'flex-end',
    top: hp('6%'),
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: hp('3%'),
    // marginLeft: wp('5%'),
  },
  counter: {
    width: 30,
    height: 30,
    backgroundColor: resources.colors.white,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: resources.colors.black,
    // alignSelf: 'flex-end',
    // top: hp('6%'),
    // right: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: hp('3%'),
    // marginLeft: wp('5%'),
  },
  flightItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  headertxt: {
    color: resources.colors.black,
    fontSize: hp('2%'),
    fontWeight: 'bold',
    marginVertical: 10,
  },
  dateInput: {
    width: wp('94%'),
    height: hp('7%'),
    backgroundColor: resources.colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp('3%'),
  },
  dateInputText: {
    color: resources.colors.primary,
    fontSize: hp('2%'),
    fontWeight: '800',
    alignSelf: 'center',
  },
  container_: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: hp('2%'),
    marginVertical: hp('2%'),
  },
});

export default HomeScreen;
