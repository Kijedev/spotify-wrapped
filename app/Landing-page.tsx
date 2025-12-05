import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

const songs = [
  require("@/assets/music/CHPTRS_-_Last_Chance_Alt_Version__CeeNaija.com_.mp3"),
  require("@/assets/music/BNXN-Ft-Soweto-Gospel-Choir-In-Jesus-Name-(TrendyBeatz.com).mp3"),
  require("@/assets/music/CHPTRS_-_Last_Chance_Alt_Version__CeeNaija.com_.mp3"),
];

const topGenres = [
  { rank: 1, name: "Afro adura" },
  { rank: 2, name: "Pop Rap" },
  { rank: 3, name: "Melodic Rap" },
  { rank: 4, name: "Indie Folk" },
  { rank: 5, name: "Gospel" },
];

const Landingpage = () => {
  const [muted, setMuted] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);
  const currentPageRef = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [statusBarStyle, setStatusBarStyle] = useState<
    "light-content" | "dark-content"
  >("dark-content");

  // 🔥 Go to previous page
  const goBack = () => {
    // make sure the page index never goes below 0
    const newPage = Math.max(0, currentPageRef.current - 1);
    currentPageRef.current = newPage;

    scrollViewRef.current?.scrollTo({
      y: newPage * height,
      animated: true,
    });
  };

  // 🔥 Play song when page changes
  const playSongForPage = async (pageIndex: number) => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(songs[pageIndex], {
        shouldPlay: true,
        isLooping: true,
      });

      soundRef.current = sound;
      if (muted) sound.setIsMutedAsync(true);
    } catch (error) {
      console.log("Error loading sound:", error);
    }
  };

  // 🔥 Play first song on mount
  useEffect(() => {
    playSongForPage(0);

    return () => {
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, []);

  // 🔥 Mute/Unmute
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.setIsMutedAsync(muted);
    }
  }, [muted]);

  // 🔥 Detect Scroll Page
  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: any } };
  }) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / height);

    if (index !== currentPageRef.current) {
      currentPageRef.current = index;

      // Change status bar based on page background
      if (index === 0 || index === 3 || index === 4) {
        setStatusBarStyle("dark-content");
      } else {
        setStatusBarStyle("light-content");
      }

      // Change song on even pages
      if (index % 2 === 0) {
        playSongForPage(index / 2);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        ref={scrollViewRef}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* PAGE 1 */}
        <View style={[styles.page, { backgroundColor: "#fff" }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
              <Ionicons name="chevron-back-outline" size={24} />
            </TouchableOpacity>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logo}
            />
            <TouchableOpacity onPress={() => setMuted((m) => !m)}>
              <Ionicons
                name={muted ? "volume-mute-outline" : "volume-medium-outline"}
                size={24}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>We're ready for you, Kije.</Text>
          <Text style={{ marginTop: 10 }}>Come on Down.</Text>

          <View style={styles.bigNumberContainer}>
            <Text style={styles.bigNumber}>2025</Text>
          </View>
        </View>

        {/* PAGE 2 */}
        <View style={[styles.page, { backgroundColor: "#222" }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
              <Ionicons name="chevron-back-outline" size={24} color="white" />
            </TouchableOpacity>
            <Image
              source={require("@/assets/images/logo-white.png")}
              style={styles.logo}
            />
            <TouchableOpacity onPress={() => setMuted((m) => !m)}>
              <Ionicons
                name={muted ? "volume-mute-outline" : "volume-medium-outline"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.pageTitle}>You listened.</Text>
          <Text
            style={{
              color: "white",
              fontSize: 32,
              fontWeight: "bold",
              lineHeight: 20,
            }}
          >
            We counted.
          </Text>
        </View>

        {/* PAGE 3 */}
        <View style={[styles.page, { backgroundColor: "#222" }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
              <Ionicons name="chevron-back-outline" size={24} color="white" />
            </TouchableOpacity>
            <Image
              source={require("@/assets/images/logo-white.png")}
              style={styles.logo}
            />
            <TouchableOpacity onPress={() => setMuted((m) => !m)}>
              <Ionicons
                name={muted ? "volume-mute-outline" : "volume-medium-outline"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 120,
              fontWeight: "bold",
              color: "#DDA0FF",
              textShadowColor: "white",
              textShadowOffset: { width: 6, height: 3 },
              textShadowRadius: 6,
            }}
          >
            10,992
          </Text>

          <Text
            style={{
              color: "white",
              fontSize: 16,
              marginTop: 10,
              maxWidth: 300,
              textAlign: "center",
            }}
          >
            You Listened for <Text style={{ fontWeight: "bold" }}>10,992</Text>{" "}
            minutes.
          </Text>
          <Text
            style={{
              backgroundColor: "#fff",
              marginTop: 10,
              borderRadius: 50,
              paddingHorizontal: 20,
              paddingVertical: 14,
              fontWeight: "bold",
            }}
          >
            Share this story
          </Text>
        </View>

        {/* PAGE 4 */}
        <View style={[styles.page, { backgroundColor: "#fff" }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
              <Ionicons name="chevron-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logo}
            />
            <TouchableOpacity onPress={() => setMuted((m) => !m)}>
              <Ionicons
                name={muted ? "volume-mute-outline" : "volume-medium-outline"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#222",
              textAlign: "center",
              maxWidth: 300,
              lineHeight: 30,
            }}
          >
            Taste like yours can't be defined. But let's try anyway.
          </Text>

          <Text
            style={{
              color: "#222",
              fontSize: 16,
              marginTop: 10,
              maxWidth: 300,
              textAlign: "center",
            }}
          >
            You Listened to{" "}
            <Text style={{ fontWeight: "bold", marginTop: 20 }}>156</Text>{" "}
            genres.
          </Text>
        </View>

        {/* PAGE 5 */}
        <View style={[styles.page, { backgroundColor: "#fff" }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
              <Ionicons name="chevron-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logo}
            />
            <TouchableOpacity onPress={() => setMuted((m) => !m)}>
              <Ionicons
                name={muted ? "volume-mute-outline" : "volume-medium-outline"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",

                textAlign: "center",
              }}
            >
              Your top genres
            </Text>
            {topGenres.map((genre) => (
              <View
                key={genre.rank}
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  width: 350,
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    width: 40,
                  }}
                >
                  {genre.rank}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 60,
                    backgroundColor: "black",
                    letterSpacing: -6,
                    color: "white",
                    paddingHorizontal: 0,
                    marginLeft: 0,
                    flex: 1,
                    paddingVertical: 1,
                  }}
                >
                  {genre.name}
                </Text>
              </View>
            ))}

            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text
                style={{
                  backgroundColor: "#000",
                  marginTop: 10,
                  borderRadius: 50,
                  paddingHorizontal: 20,
                  paddingVertical: 14,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Share this story
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Landingpage;

const styles = StyleSheet.create({
  container: { flex: 1 },
  page: {
    height: height,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: 70,
  },
  logo: { width: 100, height: 30, resizeMode: "contain" },
  title: { fontWeight: "bold", fontSize: 30, textAlign: "center" },
  bigNumberContainer: { position: "absolute", bottom: 40 },
  bigNumber: {
    fontSize: 210,
    fontWeight: "bold",
    color: "orangered",
    letterSpacing: -30,
  },
  pageTitle: { fontSize: 32, fontWeight: "bold", color: "white" },
});
