import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const translations = {
  en: {
    back: "Back",
    languageToggle: "Arabic",
    scheduleHeader: "Schedule of Garbage/Damage Pickup",
    collectionMessage: "Ready for the next Collection",
    days: {
      Sun: "Sunday",
      Mon: "Monday",
      Tue: "Tuesday",
      Wed: "Wednesday",
      Thu: "Thursday",
      Fri: "Friday",
      Sat: "Saturday",
    },
    types: {
      "Residual Waste": "Residual Waste",
      "Recyclable Waste": "Recyclable Waste",
      "Food & Bio Waste": "Food & Bio Waste",
    },
  },
  ar: {
    back: "خلف",
    languageToggle: "إنجليزي",
    scheduleHeader: "جدول جمع النفايات / الأضرار",
    collectionMessage: "جاهز للجمع القادم",
    days: {
      Sun: "الأحد",
      Mon: "الاثنين",
      Tue: "الثلاثاء",
      Wed: "الأربعاء",
      Thu: "الخميس",
      Fri: "الجمعة",
      Sat: "السبت",
    },
    types: {
      "Residual Waste": "النفايات المتبقية",
      "Recyclable Waste": "النفايات القابلة لإعادة التدوير",
      "Food & Bio Waste": "النفايات الغذائية والحيوية",
    },
  },
};

// 🔹 Schedule Data
const scheduleData = [
  {
    id: "1",
    date: "09",
    day: "Sun",
    time: "9:00 AM - 11:00 AM",
    type: "Residual Waste",
  },
  {
    id: "2",
    date: "16",
    day: "Sun",
    time: "9:00 AM - 11:00 AM",
    type: "Recyclable Waste",
  },
  {
    id: "3",
    date: "16",
    day: "Sun",
    time: "3:00 PM - 4:00 PM",
    type: "Food & Bio Waste",
  },
  {
    id: "4",
    date: "23",
    day: "Sun",
    time: "9:00 AM - 11:00 AM",
    type: "Residual Waste",
  },
  {
    id: "5",
    date: "06",
    day: "Sun",
    time: "9:00 AM - 11:00 AM",
    type: "Recyclable Waste",
  },
  {
    id: "6",
    date: "06",
    day: "Sun",
    time: "3:00 PM - 4:00 PM",
    type: "Food & Bio Waste",
  },
  {
    id: "7",
    date: "13",
    day: "Sun",
    time: "9:00 AM - 11:00 AM",
    type: "Residual Waste",
  },
];

const ScheduleGarbage = () => {
  const navigation = useNavigation();
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => setLanguage(language === "en" ? "ar" : "en");
  const t = translations[language];

  return (
    <LinearGradient
      colors={["#FFFFFF", "#9FD1B0"]} // White to light green
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }} // Top to bottom
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* 🔹 Header with Language Toggle */}
        <LinearGradient
          colors={["#053400", "#1B7700", "#053400"]} // Adjust colors as needed
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.rectangle}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("./assets/ajmalsa-waste-and-damage-solutions.png")}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity
            style={styles.languageButton}
            onPress={toggleLanguage}
          >
            <Text style={styles.buttonText}>{t.languageToggle}</Text>
          </TouchableOpacity>
        </LinearGradient>

        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 20} // Adjust for better spacing
          style={{ flex: 1 }}
        >
          {/* 🔹 Back Button */}
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.navigate("Home")}
          >
            <AntDesign name="back" size={24} color="black" />
            <Text>{t.back}</Text>
          </TouchableOpacity>

          {/* 🔹 Schedule Header */}
          <View>
            <Text style={styles.headerText}>{t.scheduleHeader}</Text>
          </View>

          {/* 🔹 Schedule List with Translations */}
          <FlatList
            data={scheduleData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>{item.date}</Text>
                  <Text style={styles.day}>{t.days[item.day]}</Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.boldText}>{t.collectionMessage}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.type}>{t.types[item.type]}</Text>
                </View>
              </View>
            )}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  keyboardView: {
    flex: 1,
  },
  buttonText: {
    color: "white",
  },
  languageButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  rectangle: {
    height: 60, // Adjust height as needed
    backgroundColor: "#1E9639", // Change to any color you want
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    alignSelf: "center",
    // **Shadow for iOS**
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // **Shadow for Android**
    elevation: 5,
  },
  icon: {
    width: 50,
    height: 50,
    margin: 6,
    alignContent: "center",
  },
  gradientBackground: {
    flex: 1, // Covers entire screen
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "baseline",
    marginLeft: 20,
  },
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#053501",
    margin: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  dateContainer: {
    backgroundColor: "#146401",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  date: { color: "white", fontSize: 22, fontWeight: "bold" },
  day: { color: "white", fontSize: 14 },
  details: { flex: 1 },
  boldText: { fontSize: 16, fontWeight: "bold", color: "#053501" },
  time: { fontSize: 14, color: "#333" },
  type: { fontSize: 14, fontWeight: "bold", color: "#555" },
  back: {
    margin: 10,
    width: 50,
  },
});

export default ScheduleGarbage;
