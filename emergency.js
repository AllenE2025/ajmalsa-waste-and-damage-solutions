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
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const translations = {
  en: {
    back: "Back",
    header: "Having an Emergency?",
    description: "Press the button below help will arrive soon.",
    cancel: "Cancel",
    languageToggle: "Arabic",
  },
  ar: {
    back: "خلف",
    header: "وجود حالة الطوارئ؟",
    description: "اضغط على الزر أدناه وسوف تصل المساعدة قريبا.",
    cancel: "يلغي",
    languageToggle: "إنجليزي",
  },
};

const EmergencyButton = () => {
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
              source={require("./assets/aljouf-baladiya.webp")}
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
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.navigate("Home")}
          >
            <AntDesign name="back" size={24} color="black" />
            <Text>{t.back}</Text>
          </TouchableOpacity>

          <Text style={styles.headerText}>{t.header}</Text>

          <Text style={styles.description}>{t.description}</Text>

          <View style={{ alignItems: "center", marginTop: 100 }}>
            <TouchableOpacity style={styles.buttonEmergency}>
              <MaterialCommunityIcons
                name="gesture-double-tap"
                size={40}
                color="black"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancel}>
              <Text style={{ color: "white" }}>{t.cancel}</Text>
            </TouchableOpacity>
          </View>
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
    textAlign: "center",
  },
  description: {
    textAlign: "center",
  },
  buttonEmergency: {
    backgroundColor: "red",
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center", // Center icon properly
    borderRadius: 100, // Make it circular
    marginBottom: 10, // Add spacing between buttons
  },
  cancel: {
    backgroundColor: "#1E9639",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    marginTop: 50,
  },
  back: {
    margin: 10,
    width: 50,
  },
});

export default EmergencyButton;
