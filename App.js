import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddContact from './components/createEditContacts';
import ShowContact from './components/contactDetails';
import Contacts from './components/contactsList';
import store from './store';

const Stack = createStackNavigator();
function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Contacts">
            <Stack.Screen
              name="Contacts"
              component={Contacts}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddContact"
              component={AddContact}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Details"
              component={ShowContact}
              options={{ title: 'Show Contact' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </React.Fragment>
  );
}

export default App;