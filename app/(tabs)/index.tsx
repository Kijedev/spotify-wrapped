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
    songName: "Lalala",
    image: "https://notjustok.com/wp-content/uploads/2025/11/IMG_5491.jpeg",
  },
  {
    id: 6,
    songName: "Waist",
    image:
      "https://i0.wp.com/highlifeng.com/yoruba/wp-content/uploads/2025/11/Omah-Lay-Waist-artwork-1.jpg?resize=274%2C300&ssl=1",
  },
];

const rotation = [
  {
    id: 1,
    songName: "Secrets",
    name: "The weeknd",
    image: "https://i.scdn.co/image/ab67616d00001e028ad8f5243d6534e03b656c8b",
  },
  {
    id: 2,
    songName: "FUN",
    name: "Rema",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlndfIZUMX-Ii9MetLROVZjH5ei5_7aYipiw&s",
  },
  {
    id: 3,
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
          source={require("@/assets/images/Kije.jpg")}
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
            marginTop: 1,
          }}
        />
        <Text
          style={{
            color: "black",
            backgroundColor: "#1DB954",
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
            backgroundColor: "#222",
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
            backgroundColor: "#222",
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
            backgroundColor: "#222",
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
              backgroundColor: "#222",
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

      <View>
        <Text
          style={{
            color: "white",
            fontFamily: "SpotifyMix-Bold",
            fontSize: 20,
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}
        >
          Your recent rotation
        </Text>

        <View
          style={{
            marginTop: 0,
            marginBottom: 10,
            paddingHorizontal: 20,
            flexDirection: "column",
          }}
        >
          {rotation.map((artist) => (
            <View
              key={artist.songName}
              style={{
                marginBottom: 0,
                padding: 0,
                borderRadius: 5,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: artist.image }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 5,
                    marginRight: 10,
                  }}
                />

                <View>
                  <Text
                    style={{
                      fontFamily: "SpotifyMix-Bold",
                      color: "#fff",
                      fontSize: 14,
                    }}
                  >
                    {artist.songName}
                  </Text>

                  <Text style={{ color: "#fff", fontSize: 14 }}>
                    {artist.name}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  marginTop: 0,
                  alignSelf: "flex-end",
                }}
              >
                ⋯
              </Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
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
