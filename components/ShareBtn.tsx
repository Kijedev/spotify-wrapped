import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Share,
  Linking,
  Alert,
} from "react-native";
import { Video } from "expo-av";

export default function WrappedPage() {
  const videoRef = useRef(null);

  // Default Share
  const onShare = async () => {
    try {
      await Share.share({
        message: "Check out my 2025 Wrapped!",
        url: "https://yourapp.com/wrapped",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(String(error));
      }
    }
  };

  // WhatsApp Share
  const shareToWhatsApp = () => {
    const message = "Check out my 2025 Wrapped!";
    const url = "https://yourapp.com/wrapped";

    const whatsappURL =
      "whatsapp://send?text=" + encodeURIComponent(`${message}\n${url}`);

    Linking.openURL(whatsappURL).catch(() => {
      Alert.alert(
        "WhatsApp not installed",
        "Please install WhatsApp to share this."
      );
    });
  };

  return (
    <View style={styles.page}>
      {/* Video */}
      <View style={styles.videoCard}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={require("@/assets/video/rema.mp4")}
          shouldPlay
          isLooping
          isMuted={false}
        />
      </View>

      {/* Album Cover */}
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlndfIZUMX-Ii9MetLROVZjH5ei5_7aYipiw&s",
        }}
        style={styles.albumCover}
      />

      {/* Text Section */}
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Text style={styles.heading}>Your Top Song</Text>
        <Text style={styles.subtitle}>FUN by Rema</Text>
        <Text style={styles.count}>You listened 46 times.</Text>
      </View>

      {/* Share Buttons */}
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity onPress={onShare} style={styles.shareButton}>
          <Text style={styles.shareText}>Share this story</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={shareToWhatsApp}
          style={[styles.shareButton, styles.whatsappButton]}
        >
          <Text style={styles.whatsappText}>Share to WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
  },

  videoCard: {
    width: "90%",
    height: 250,
    backgroundColor: "#222",
    borderRadius: 20,
    marginTop: 50,
    overflow: "hidden",
  },

  video: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },

  albumCover: {
    width: 120,
    height: 120,
    borderRadius: 15,
    marginTop: -40,
    borderWidth: 4,
    borderColor: "#111",
  },

  heading: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },

  subtitle: {
    marginTop: 5,
    color: "#bbb",
    fontSize: 16,
  },

  count: {
    marginTop: 8,
    color: "#888",
  },

  shareButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  shareText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },

  whatsappButton: {
    backgroundColor: "#25D366",
    borderColor: "#25D366",
  },

  whatsappText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
