import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/navigators/AppNavigator';
import {toastConfig} from './src/services/Toaster';
import Toast from 'react-native-toast-message';
// import {Provider} from 'react-redux';
// import {store} from './src/Redux/Store';
const Navigation = () => {
  return (
    <NavigationContainer>
      {/* I am not using redux because its small project */}
      {/* <Provider store={store}> */}
        <AppNavigation />
      {/* </Provider> */}
      <Toast config={toastConfig} position="top" />
    </NavigationContainer>
  );
};

export default Navigation;
