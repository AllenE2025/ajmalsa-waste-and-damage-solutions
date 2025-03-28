import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const translations = {
  en: {
    back: "back",
    header: "Waste & Damage Management Solution",
    title: "Complaint Report",
    description:
      "Please fill out the complaint report form for the waste and damage management system to ensure your concerns are addressed promptly.",
    fullname: "Full Name",
    phone: "Phone Number",
    email: "Email",
    message: "Write your message...",
    attachFile: "Attach Image",
    submit: "Submit",
    remove: "Remove",
    evidence: "Evidence Attachment",
    errors: {
      fullname: "Full name is required",
      phone: "Phone number is required",
      email: "Invalid email format",
      message: "Message is required",
    },
    languageToggle: "Arabic",
  },
  ar: {
    back: "خلف",
    header: "حل إدارة النفايات والأضرار",
    title: "تقرير الشكوى",
    description:
      "يرجى ملء نموذج تقرير الشكوى لنظام إدارة النفايات والأضرار لضمان معالجة مخاوفك على الفور.",
    fullname: "الاسم الكامل",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    message: "اكتب رسالتك...",
    attachFile: "إرفاق صورة",
    submit: "إرسال",
    remove: "إزالة",
    evidence: "إرفاق دليل",
    errors: {
      fullname: "الاسم الكامل مطلوب",
      phone: "رقم الهاتف مطلوب",
      email: "تنسيق البريد الإلكتروني غير صالح",
      message: "الرسالة مطلوبة",
    },
    languageToggle: "إنجليزي",
  },
};

const ComplaintForm = () => {
  const navigation = useNavigation();

  const [language, setLanguage] = useState("en");

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    email: "",
    message: "",
    files: [null, null, null, null],
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleImagePick = async (index) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled && result.assets.length > 0) {
        const newFiles = [...form.files];
        newFiles[index] = {
          name: `image_${index}.jpg`,
          uri: result.assets[0].uri,
        };
        setForm((prevForm) => ({
          ...prevForm,
          files: newFiles,
        }));
      }
    } catch (err) {
      console.error("Error selecting image:", err);
    }
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...form.files];
    newFiles[index] = null;
    setForm((prevForm) => ({
      ...prevForm,
      files: newFiles,
    }));
  };

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const validateForm = () => {
    let newErrors = {};
    const t = translations[language].errors;
    if (!form.fullname.trim()) newErrors.fullname = t.fullname;
    if (!form.phone.trim()) newErrors.phone = t.phone;
    if (!form.email.trim() || !validateEmail(form.email))
      newErrors.email = t.email;
    if (!form.message.trim()) newErrors.message = t.message;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please correct the errors before submitting.");
      return;
    }

    const apiUrl = "https://sys.ajmalsa.com/api/observation";
    
    const formData = new FormData();
    formData.append("fullname", form.fullname);
    formData.append("phone_number", form.phone);
    formData.append("email", form.email);
    formData.append("message", form.message);
    formData.append("lang", language);
    formData.append("lat", "0");

    form.files.forEach((file, index) => {
      if (file) {
        formData.append(`files[${index}]`, {
          uri: file.uri,
          name: file.name,
          type: "image/jpeg",
        });
      }
    });

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const responseData = await response.json();
      if (response.ok) {
        alert("Form submitted successfully!");
        console.log("Response:", responseData);
      } else {
        alert("Submission failed. Please try again.");
        console.error("Error:", responseData);
      }
    } catch (error) {
      console.error("Request error:", error);
      alert("An error occurred. Please check your connection.");
    }
  };

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
          <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 50 }}
            keyboardShouldPersistTaps="handled"
          >
            <TouchableOpacity
              style={styles.back}
              onPress={() => navigation.navigate("Home")}
            >
              <AntDesign name="back" size={24} color="black" />
              <Text>{t.back}</Text>
            </TouchableOpacity>

            <Text style={styles.header}>{t.header}</Text>
            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.description}>{t.description}</Text>

            <TextInput
              style={styles.input}
              placeholder={t.fullname}
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              onChangeText={(value) => handleInputChange("fullname", value)}
            />
            {errors.fullname && (
              <Text style={styles.errorText}>{errors.fullname}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder={t.phone}
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              keyboardType="phone-pad"
              onChangeText={(value) => handleInputChange("phone", value)}
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder={t.email}
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              keyboardType="email-address"
              onChangeText={(value) => handleInputChange("email", value)}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <Text style={styles.label}>{t.evidence}</Text>

            <View style={styles.evidenceSection}>
              {[...Array(4)].map((_, index) => (
                <View key={index}>
                  {form.files[index] && (
                    <View style={styles.fileContainer}>
                      <Text style={styles.fileText}>
                        {form.files[index].name}
                      </Text>
                      <TouchableOpacity onPress={() => handleRemoveFile(index)}>
                        <Text style={styles.removeButton}>{t.remove}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleImagePick(index)}
                  >
                    <Ionicons
                      name="attach"
                      size={20}
                      color="white"
                      style={{ marginRight: 5 }}
                    />
                    <Text style={styles.buttonText}>{t.attachFile}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <TextInput
              style={[styles.input, styles.messageBox]}
              placeholder={t.message}
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              multiline
              onChangeText={(value) => handleInputChange("message", value)}
              textAlignVertical="top"
            />
            {errors.message && (
              <Text style={styles.errorText}>{errors.message}</Text>
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>{t.submit}</Text>
            </TouchableOpacity>
          </ScrollView>
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
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "baseline",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "baseline",
  },
  description: { textAlign: "baseline", marginBottom: 30 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#F0F0F0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  label: { fontWeight: "bold", marginTop: 20 },
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  fileText: { fontSize: 14 },
  removeButton: { color: "red" },
  button: {
    backgroundColor: "#1E9639",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 100,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#1E9639",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
    width: 100,
  },
  buttonText: { color: "white" },
  messageBox: { height: 100 },
  errorText: { color: "red", fontSize: 12, marginBottom: 5, marginLeft: 5 },
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
  evidenceSection: {
    borderColor: "lightgrey",
    borderWidth: 1,
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
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
  bottomNavBar: {
    position: "absolute", // Keeps it fixed at the bottom
    bottom: 0, // Aligns it to the bottom
    width: "100%", // Full width
    alignItems: "center",
    zIndex: 10, // Ensures it's on top
  },

  navBar: {
    width: "95%", // Slight padding from the sides
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row", // Icons in a row
    justifyContent: "space-between", // Even spacing
    alignItems: "center",
  },

  navItem: {
    alignItems: "center",
    padding: 10,
  },

  navText: {
    color: "white",
    fontSize: 12,
    marginTop: 3,
  },

  button: {
    flexDirection: "row", // Arrange items in a row
    alignItems: "center", // Align icon and text
    backgroundColor: "#1E9639",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: 120, // Adjusted width
    justifyContent: "center",
  },

  phoneNumber: {
    color: "white",
  },
  back: {
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: -10,
    marginLeft: -10,
    width: 50,
  },
});

export default ComplaintForm;
