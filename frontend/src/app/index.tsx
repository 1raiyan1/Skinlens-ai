import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow gallery access."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"] as any,
      quality: 1,
    });

    if (result.canceled) return;

    const selectedImage = result.assets[0].uri;

    setImageUri(selectedImage);
    setLoading(true);
    setAnalysis("");

    try {
      const formData = new FormData();

      const imageResponse = await fetch(selectedImage);
      const blob = await imageResponse.blob();

      formData.append(
        "file",
        blob,
        "selfie.jpg"
      );

      const response = await fetch(
        "http://127.0.0.1:8000/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.analysis) {
        setAnalysis(data.analysis);
      } else {
        setAnalysis(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Error",
        "Failed to analyze image."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>SkinLens</Text>

      <Text style={styles.subtitle}>
        AI-Powered Skin Analysis
      </Text>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>
          Upload Selfie
        </Text>
      </TouchableOpacity>

      {loading && (
        <Text style={styles.loading}>
          Analyzing skin...
        </Text>
      )}

      {analysis ? (
        <View style={styles.analysisContainer}>
          <Text style={styles.analysisTitle}>
            Analysis Result
          </Text>

          <Text style={styles.analysisText}>
            {analysis}
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    padding: 24,
    paddingTop: 80,
  },

  logo: {
    fontSize: 40,
    fontWeight: "700",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },

  image: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 16,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  loading: {
    marginTop: 20,
    fontSize: 16,
  },

  analysisContainer: {
    width: "100%",
    maxWidth: 700,
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    padding: 15,
    backgroundColor: "#fafafa",
  },

  analysisTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  analysisText: {
    fontSize: 14,
    lineHeight: 22,
  },
});