import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const translations = {
  en: {
    languageToggle: "Arabic",
  },
  ar: {
    languageToggle: "إنجليزي",
  },
};

const HomeScreen = () => {
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

        <View>
          <Image
            source={
              language === "en"
                ? require("./assets/cleaner-tomorrow.png")
                : require("./assets/cleaner-tomorrow-ar.png")
            }
            style={styles.cleanerImage}
            resizeMode="contain"
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => navigation.navigate("Schedule")}
          >
            <Image
              source={
                language === "en"
                  ? require("./assets/schedule-garbage-icon.png")
                  : require("./assets/schedule-garbage-icon-ar.png")
              }
              style={styles.iconTab}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => navigation.navigate("Complaint")}
          >
            <Image
              source={
                language === "en"
                  ? require("./assets/complaint-report-icon.png")
                  : require("./assets/complaint-report-icon-ar.png")
              }
              style={styles.iconTab}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => navigation.navigate("Technical")}
          >
            <Image
              source={
                language === "en"
                  ? require("./assets/technical-support-icon.png")
                  : require("./assets/technical-support-icon-ar.png")
              }
              style={styles.iconTab}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => navigation.navigate("Advisory")}
          >
            <Image
              source={
                language === "en"
                  ? require("./assets/advisory-event-icon.png")
                  : require("./assets/advisory-event-icon-ar.png")
              }
              style={styles.iconTab}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => navigation.navigate("Emergency")}
          >
            <Image
              source={
                language === "en"
                  ? require("./assets/emergency-button-icon.png")
                  : require("./assets/emergency-button-icon-ar.png")
              }
              style={styles.iconTab}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 20} // Adjust for better spacing
          style={{ flex: 1 }}
        >
          <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 105 }}
            keyboardShouldPersistTaps="handled"
          ></ScrollView>
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
  keyboardView: { flex: 1 },
  container: { padding: 20 },
  buttonText: { color: "white" },
  languageButton: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
    color: "white",
  },
  rectangle: {
    height: 60, // Adjust height as needed
    backgroundColor: "#1E9639", // Change to any color you want
    borderRadius: 20,
    marginHorizontal: 20,
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
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    borderRadius: 20,
    width: 140,
    height: 140,
    // **Shadow for iOS**
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // **Shadow for Android**
    elevation: 5,
  },
  iconTab: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  cleanerImage: {
    width: "95%",
    height: 200,
    alignSelf: "center",
    // **Shadow for iOS**
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // **Shadow for Android**
    elevation: 5,
  },
});

export default HomeScreen;
