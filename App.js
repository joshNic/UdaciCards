import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import AddCardScreen from "./screens/AddCardScreen";
import AddDeckScreen from "./screens/AddDeckScreen";
import QuizScreen from "./screens/QuizScreen";
import {setLocalNotification} from './utils/helpers'

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="Add Card" component={AddCardScreen} />
      <HomeStack.Screen name="Quiz" component={QuizScreen} />
    </HomeStack.Navigator>
  );
}

const AddDeckStack = createStackNavigator();

function AddDeckStackScreen() {
  return (
    <AddDeckStack.Navigator>
      <AddDeckStack.Screen name="Add Deck" component={AddDeckScreen} />
      <AddDeckStack.Screen name="Details" component={DetailsScreen} />
    </AddDeckStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default class App extends React.Component{
  componentDidMount(){
    setLocalNotification()
  }
  render(){
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === "Home") {
                iconName = focused
                  ? "ios-home"
                  : "md-home";
              } else if (route.name === "Add Deck") {
                iconName = focused ? "ios-add-circle" : "ios-add";
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Add Deck" component={AddDeckStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
}
