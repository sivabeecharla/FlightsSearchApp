import React, {useState, useEffect} from 'react';
// Import all the components we are going to use
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {fetchData} from '../services/ApiService';
import resources from '../resources';
import gStyles from '../resources/styles/styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Searchbar} from 'react-native-paper';
import {searchProps } from '../types/types';
import NoDataComponent from '../components/NoDataComponent';

const SelectCity : React.FC<searchProps> = ({onPress}) => {
  // For Main Data
  const [searchcities, setSearchcities] = useState([]);
  const [selectedValue, setSelectedValue] = useState({});
  const [searchQuery, setSearchQuery] = React.useState('');

  const searchCities = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      let result = await fetchData(query);
      let cities = JSON.parse(result);
      setSearchcities(cities.data);
    } else {
      setSearchcities([]);
    }
  };
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity onPress={()=>onPress(item)}>
        <View style={{margin: 10}}>
          <Text
            style={{
              color: resources.colors.black_secondary,
              fontSize: hp('2%'),
            }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={value => searchCities(value)}
          value={searchQuery}
        />
        <FlatList
          data={searchcities}
          keyExtractor={item => item.id}
          style={[gStyles.cardContainer]}
          renderItem={renderItem}
          ListEmptyComponent={<NoDataComponent />}

        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: resources.colors.white,
    flex: 1,
    borderRadius: 8,
    padding: 16,
    marginTop: 40,
  },
  autocompleteContainer: {
    backgroundColor: resources.colors.white,
    borderRadius: 10,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
export default SelectCity;
