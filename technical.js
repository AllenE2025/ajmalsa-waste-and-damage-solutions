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
import { useNavigation } from "@react-navigation/native";

const translations = {
  en: {
    back: "Back",
    header: "Technical Support",
    title1: "Customer Support",
    description1: "+966508624264",
    title2: "General Inquiries",
    description2:
      "We value your feedback and are eager to provide any information",
    title3: "Headquarter",
    description3: "We welcome collaboration proposals and partnership",
    title4: "Head Office",
    description4:
      "Dammam - Uthman Ibn Affan St. Al Rayyan Trading Center - Office No.107",
    languageToggle: "Arabic",
  },
  ar: {
    back: "خلف",
    header: "الدعم الفني",
    title1: "دعم العملاء",
    description1: "+966508624264",
    title2: "الاستفسارات العامة",
    description2: "نحن نقدر ملاحظاتك ونتطلع إلى تقديم أي معلومات",
    title3: "المقر الرئيسي",
    description3: "نحن نرحب بمقترحات التعاون والشراكة",
    title4: "المكتب الرئيسي",
    description4:
      "الدمام - شارع عثمان بن عفان - مركز الريان التجاري - مكتب رقم 107",
    languageToggle: "إنجليزي",
  },
};

const TechnicalSupport = () => {
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

          <View
            style={{
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View style={styles.border}>
              <Text style={styles.title}>{t.title1}</Text>
              <Text style={styles.description}>{t.description1}</Text>
            </View>
            <View style={styles.border}>
              <Text style={styles.title}>{t.title2}</Text>
              <Text style={styles.description}>{t.description2}</Text>
            </View>
            <View style={styles.border}>
              <Text style={styles.title}>{t.title3}</Text>
              <Text style={styles.description}>{t.description3}</Text>
            </View>
            <View style={styles.border}>
              <Text style={styles.title}>{t.title4}</Text>
              <Text style={styles.description}>{t.description4}</Text>
            </View>
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
    textAlign: "baseline",
    marginLeft: 20,
  },
  back: {
    margin: 10,
    width: 50,
  },
  border: {
    borderColor: "#1E9639",
    borderStyle: "solid",
    borderWidth: 1,
    marginVertical: 20,
    width: "90%",
    borderRadius: 5,
  },
  title: {
    backgroundColor: "#1E9639",
    color: "white",
    paddingLeft: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  description: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
});

export default TechnicalSupport;
