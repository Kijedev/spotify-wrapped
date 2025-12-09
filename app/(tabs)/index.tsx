import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const artists = [
  {
    id: 1,
    songName: "Secrets",
    image: "https://i.scdn.co/image/ab67616d00001e028ad8f5243d6534e03b656c8b",
  },
  {
    id: 2,
    songName: "FUN",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlndfIZUMX-Ii9MetLROVZjH5ei5_7aYipiw&s",
  },
  {
    id: 3,
    songName: "Entergalactic",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzz9F3N-2UGLSuhzezsmNv3zcc2t5HN8libw&s",
  },
  {
    id: 4,
    songName: "Fi Kan We Kan",
    image:
      "https://www.xclusiveland.com/wp-content/uploads/2025/05/BNXN-Buju-Fi-kan-We-kan-Ft-Rema.webp",
  },
  {
    id: 5,
    songName: "Entergalactic",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzz9F3N-2UGLSuhzezsmNv3zcc2t5HN8libw&s",
  },
  {
    id: 6,
    songName: "Fi Kan We Kan",
    image:
      "https://www.xclusiveland.com/wp-content/uploads/2025/05/BNXN-Buju-Fi-kan-We-kan-Ft-Rema.webp",
  },
];

const Home = () => {
  const router = useRouter();

  const [loaded] = useFonts({
    "SpotifyMix-Bold": require("@/assets/fonts/SpotifyMix-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/174/174872.png",
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            marginRight: 0,
          }}
        />
        <Text
          style={{
            color: "white",
            backgroundColor: "#555",
            paddingVertical: 5,
            paddingHorizontal: 20,
            borderRadius: 50,
          }}
        >
          All
        </Text>
        <Text
          style={{
            color: "white",
            backgroundColor: "#555",
            paddingVertical: 5,
            paddingHorizontal: 20,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "white",
          }}
        >
          Wrapped
        </Text>
        <Text
          style={{
            color: "white",
            backgroundColor: "#555",
            paddingVertical: 5,
            paddingHorizontal: 20,
            borderRadius: 50,
          }}
        >
          Music
        </Text>
        <Text
          style={{
            color: "white",
            backgroundColor: "#555",
            paddingVertical: 5,
            paddingHorizontal: 20,
            borderRadius: 50,
          }}
        >
          Podcast
        </Text>
      </View>
      <View
        style={{
          marginTop: 0,
          marginBottom: 10,
          paddingHorizontal: 20,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {artists.map((artist) => (
          <View
            key={artist.songName}
            style={{
              width: "48%",
              marginBottom: 10,
              backgroundColor: "#333",
              padding: 0,
              borderRadius: 5,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: artist.image }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              />
              <Text
                style={{
                  fontFamily: "SpotifyMix-Bold",
                  color: "#fff",
                  fontSize: 14,
                }}
              >
                {artist.songName}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          paddingHorizontal: 20,
          paddingVertical: 30,
          alignSelf: "center",
          alignItems: "center",
          width: "90%",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: "SpotifyMix-Bold",
            textAlign: "center",
          }}
        >
          Your 2025
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontFamily: "SpotifyMix-Bold",
            textAlign: "center",
            marginTop: -10,
          }}
        >
          Wrapped
        </Text>
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          Dive into your year of listening.
        </Text>

        <TouchableOpacity
          style={styles.spotifyWrappedButton}
          onPress={() => router.push("/Landing-page")}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>
            Let's go.
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    // justifyContent: "center",
    // alignItems: "center",
  },
  spotifyWrappedButton: {
    backgroundColor: "orangered",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
});
