import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./home"; // Import HomeScreen (Main Page)
import ComplaintForm from "./complaint-form"; // Import Complaint Form Screen
import ScheduleGarbage from "./schedule";
import EmergencyButton from "./emergency";
import AdvisoryEvent from "./advisory";
import TechnicalSupport from "./technical";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Complaint"
          component={ComplaintForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Schedule"
          component={ScheduleGarbage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Emergency"
          component={EmergencyButton}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Advisory"
          component={AdvisoryEvent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Technical"
          component={TechnicalSupport}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
