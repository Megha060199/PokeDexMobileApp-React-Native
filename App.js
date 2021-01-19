/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/home'
import SinglePokemon from './screens/singlepokemon'
import SavedPokemons from './screens/saved-pokemons'
import store from './store/configureStore'
import { Provider } from 'react-redux'
const App = ()=>{

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const homeScreenTabStack = ()=>(

<Stack.Navigator screenOptions={{headerShown:false}}>
 <Stack.Screen name="Home" component={HomeScreen} />
 <Stack.Screen name="singlepokemon" component={SinglePokemon} />
      </Stack.Navigator> 
  )
  const savedPokemonsTabStack = ()=>(

    <Stack.Navigator screenOptions={{headerShown:false}}>
     <Stack.Screen name="Saved" component={SavedPokemons} />
    
          </Stack.Navigator> 
      )
  return (
    <>
     <Provider store={store}>
    <NavigationContainer>
    <Tab.Navigator tabBarOptions={{tabStyle:styles.tabStyle,style:styles.tabNav,labelStyle:styles.tabTextStyle}}  >
        <Tab.Screen  name="Home" component={homeScreenTabStack} />
        <Tab.Screen name="Saved" component={savedPokemonsTabStack } />
      </Tab.Navigator>

    </NavigationContainer>
    </Provider>
    </>
  );
};

const styles = StyleSheet.create({
tabNav:{
  height:40,
},
tabTextStyle:{
color:'white'
},
  tabStyle:{
   backgroundColor:'#1b2f69',
   alignItems:'center',
   justifyContent:'center',
   borderRightWidth:0.2,
   borderColor:'white',
   color:'white'
  
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
