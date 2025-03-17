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
    languageToggle: "Arabic",
    back: "Back",
    advisoryEvent: "Advisory Event",
  },
  ar: {
    languageToggle: "إنجليزي",
    back: "رجوع",
    advisoryEvent: "حدث استشاري",
  },
};

const scheduleData = {
  en: [
    {
      id: "1",
      date: "15",
      month: "March 2025",
      day: "Sat",
      title: "Scheduled Waste Collection Delay",
      time: "8:00 AM - 12:00 PM",
      place: "Downtown & Eastside Areas",
      type: "Due to road maintenance, waste collection will be delayed. Please keep your bins secured until further notice.",
    },
    {
      id: "2",
      date: "24",
      month: "March 2025",
      day: "Mon",
      title: "Recycling Awareness Drive",
      time: "10:00 AM - 4:00 PM",
      place: "Community Hall, Green Park",
      type: "Join us for an interactive session on proper waste segregation and recycling benefits.",
    },
    {
      id: "3",
      date: "1",
      month: "March 2025",
      day: "Tue",
      title: "Garbage Collection Time Change",
      time: "3:00 PM - 4:00 PM",
      type: "Starting April 1, 2025, collection times will shift from 6:00 AM - 9:00 AM to 5:00 AM - 8:00 AM due to summer heat conditions.",
    },
  ],
  ar: [
    {
      id: "1",
      date: "15",
      month: "مارس 2025",
      day: "السبت",
      title: "تأخير جمع النفايات المجدولة",
      time: "8:00 ص - 12:00 م",
      place: "وسط المدينة والمناطق الشرقية",
      type: "نظرًا لأعمال الصيانة على الطرق، سيتم تأخير جمع النفايات. يرجى إبقاء صناديق القمامة مغلقة حتى إشعار آخر.",
    },
    {
      id: "2",
      date: "24",
      month: "مارس 2025",
      day: "الاثنين",
      title: "حملة توعية لإعادة التدوير",
      time: "10:00 ص - 4:00 م",
      place: "قاعة المجتمع، حديقة جرين بارك",
      type: "انضم إلينا في جلسة تفاعلية حول الفرز الصحيح للنفايات وفوائد إعادة التدوير.",
    },
    {
      id: "3",
      date: "1",
      month: "مارس 2025",
      day: "الثلاثاء",
      title: "تغيير وقت جمع النفايات",
      time: "3:00 م - 4:00 م",
      type: "اعتبارًا من 1 أبريل 2025، ستتغير أوقات الجمع من 6:00 ص - 9:00 ص إلى 5:00 ص - 8:00 ص بسبب حرارة الصيف.",
    },
  ],
};

const AdvisoryEvent = () => {
  const navigation = useNavigation();
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => setLanguage(language === "en" ? "ar" : "en");
  const t = translations[language];
  const events = scheduleData[language];

  return (
    <LinearGradient
      colors={["#FFFFFF", "#9FD1B0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={["#053400", "#1B7700", "#053400"]}
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
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 20}
          style={{ flex: 1 }}
        >
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.navigate("Home")}
          >
            <AntDesign name="back" size={24} color="black" />
            <Text>{t.back}</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.headerText}>{t.advisoryEvent}</Text>
          </View>

          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.dateContainer}>
                  <Text style={styles.date}>{item.date}</Text>
                  <Text style={styles.day}>{item.day}</Text>
                </View>
                <View style={styles.details}>
                  <Text style={styles.boldText}>{item.title}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.place}>{item.place}</Text>
                  <Text style={styles.type}>{item.type}</Text>
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
  type: { fontSize: 14, color: "#555" },
  place: { fontSize: 14, color: "#053501" },
  back: {
    margin: 10,
    width: 50,
  },
});

export default AdvisoryEvent;
