import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LabColorChart from './components/LabColorChart';
import CIELABGraph from './components/CIELABGraph';
import { HeaderBackButton } from '@react-navigation/elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={LabColorChart} 
          options={{ 
            title: 'LAB Color Chart', 
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="blur" size={30} color="black" style={{ marginRight: 10 }} />
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>LAB Color Chart</Text>
              </View>
            )
          }} 
        />
        <Stack.Screen 
          name="CIELABGraph" 
          component={CIELABGraph} 
          options={({ navigation }) => ({
            title: 'CIELAB Graphic',
            headerLeft: () => (
              <HeaderBackButton onPress={() => navigation.goBack()} />
            ),
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
