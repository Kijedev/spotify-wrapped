import TopHeader from "@/components/TopHeader";
import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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

// Reusable Text component with Lexend-Bold
const AppText = ({ style, children, ...props }: any) => (
  <Text style={[{ fontFamily: "Lexend-Bold" }, style]} {...props}>
    {children}
  </Text>
);

const Landingpage = () => {
  const [muted, setMuted] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);
  const currentPageRef = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [statusBarStyle, setStatusBarStyle] = useState<"light-content" | "dark-content">("dark-content");
  const [isDarkHeader, setIsDarkHeader] = useState(true);

  // Load fonts
  const [loaded] = useFonts({
    "Lexend-Bold": require("@/assets/fonts/Lexend-Bold.ttf"),
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  // Go to previous page
  const goBack = () => {
    const newPage = Math.max(0, currentPageRef.current - 1);
    currentPageRef.current = newPage;

    scrollViewRef.current?.scrollTo({
      y: newPage * height,
      animated: true,
    });
  };

  // Play song
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

  // Play first song on mount
  useEffect(() => {
    playSongForPage(0);
    return () => {
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, []);

  // Mute/unmute
  useEffect(() => {
    if (soundRef.current) soundRef.current.setIsMutedAsync(muted);
  }, [muted]);

  // Detect scroll
  const handleScroll = (event: { nativeEvent: { contentOffset: { y: any } } }) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / height);

    const whitePages = [0, 3, 4];
    setIsDarkHeader(!whitePages.includes(index));

    if (index !== currentPageRef.current) {
      currentPageRef.current = index;

      // Change status bar
      setStatusBarStyle(whitePages.includes(index) ? "dark-content" : "light-content");

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

      <TopHeader
        isDarkBackground={isDarkHeader}
        muted={muted}
        onBack={goBack}
        onToggleMute={() => setMuted(!muted)}
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
          <AppText style={styles.title}>We're ready for you, Kije.</AppText>
          <AppText style={{ marginTop: 10 }}>Come on Down.</AppText>

          <View style={styles.bigNumberContainer}>
            <AppText style={styles.bigNumber}>2025</AppText>
          </View>
        </View>

        {/* PAGE 2 */}
        <View style={[styles.page, { backgroundColor: "#222" }]}>
          <AppText style={styles.pageTitle}>You listened.</AppText>
          <AppText style={{ color: "white", fontSize: 32, lineHeight: 28 }}>
            We counted.
          </AppText>
        </View>

        {/* PAGE 3 */}
        <View style={[styles.page, { backgroundColor: "#222" }]}>
          <AppText style={styles.bigNumberPage3}>10,992</AppText>
          <AppText style={styles.pageText}>
            You Listened for <AppText>10,992</AppText> minutes.
          </AppText>
          <AppText style={styles.shareButton}>Share this story</AppText>
        </View>

        {/* PAGE 4 */}
        <View style={[styles.page, { backgroundColor: "#fff" }]}>
          <AppText style={styles.page4Title}>
            Taste like yours can't be defined. But let's try anyway.
          </AppText>
          <AppText style={styles.pageText}>
            You Listened to <AppText>156</AppText> genres.
          </AppText>
        </View>

        {/* PAGE 5 */}
        <View style={[styles.page, { backgroundColor: "#fff" }]}>
          <AppText style={{ fontSize: 24, textAlign: "center" }}>Your top genres</AppText>
          {topGenres.map((genre) => (
            <View key={genre.rank} style={styles.genreRow}>
              <AppText style={styles.genreRank}>{genre.rank}</AppText>
              <AppText style={styles.genreName}>{genre.name}</AppText>
            </View>
          ))}

          <View style={{ alignItems: "center", marginTop: 20 }}>
            <AppText style={styles.shareButtonBlack}>Share this story</AppText>
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
  title: {
    fontSize: 40,
    textAlign: "center",
    lineHeight: 46,
  },
  bigNumberContainer: { position: "absolute", bottom: 40 },
  bigNumber: {
    fontSize: 210,
    color: "orangered",
    letterSpacing: -30,
  },
  pageTitle: { fontSize: 32, color: "white" },
  bigNumberPage3: {
    fontSize: 110,
    color: "#DDA0FF",
    textShadowColor: "white",
    textShadowOffset: { width: 6, height: 3 },
    textShadowRadius: 6,
  },
  pageText: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    maxWidth: 300,
    textAlign: "center",
  },
  shareButton: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 14,
    textAlign: "center",
  },
  page4Title: {
    fontSize: 28,
    color: "#222",
    textAlign: "center",
    lineHeight: 30,
  },
  genreRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    width: 350,
  },
  genreRank: { fontSize: 22, width: 40 },
  genreName: {
    fontSize: 50,
    backgroundColor: "black",
    letterSpacing: -4,
    color: "white",
    flex: 1,
    paddingVertical: 1,
  },
  shareButtonBlack: {
    backgroundColor: "#000",
    marginTop: 10,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 14,
    textAlign: "center",
    color: "white",
  },
});
