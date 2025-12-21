import TopHeader from "@/components/TopHeader";
import { Audio, Video } from "expo-av";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

const songs = [
  require("@/assets/music/CHPTRS_-_Last_Chance_Alt_Version__CeeNaija.com_.mp3"),
  require("@/assets/music/BNXN-In-Jesus-Name-ft-Soweto-Gospel-Choir.mp3"),
  require("@/assets/music/Rema-FUN.mp3"),
  require("@/assets/music/The-Weeknd-Secrets.mp3"),
];

const topGenres = [
  { rank: 1, name: "Afro adura" },
  { rank: 2, name: "Pop Rap" },
  { rank: 3, name: "Melodic Rap" },
  { rank: 4, name: "Indie Folk" },
  { rank: 5, name: "Gospel" },
];

const artists = [
  {
    id: 1,
    songName: "Secrets",
    artistName: "The Weekend",
    image: "https://i.scdn.co/image/ab67616d00001e028ad8f5243d6534e03b656c8b",
  },
  {
    id: 2,
    songName: "FUN",
    artistName: "Rema",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlndfIZUMX-Ii9MetLROVZjH5ei5_7aYipiw&s",
  },
  {
    id: 3,
    songName: "Chandelier",
    artistName: "Monaky",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIpEcks3y4pIxQLseOGDL7YglIDflHZu5sYg&s",
  },
  {
    id: 4,
    songName: "Fi Kan We Kan",
    artistName: "BNXN, Rema",
    image:
      "https://www.xclusiveland.com/wp-content/uploads/2025/05/BNXN-Buju-Fi-kan-We-kan-Ft-Rema.webp",
  },
  {
    id: 5,
    songName: "Stronger",
    artistName: "Young Jonn",
    image:
      "https://images.genius.com/b96b6aa534e0bdc94ce127689377aecf.1000x1000x1.png",
  },
];

// Reusable Text component
const AppText = ({ style, children, ...props }: any) => (
  <Text style={[{ fontFamily: "SpotifyMix-Bold" }, style]} {...props}>
    {children}
  </Text>
);

const Landingpage = () => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);
  const currentPageRef = useRef(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [statusBarStyle, setStatusBarStyle] = useState<
    "light-content" | "dark-content"
  >("dark-content");
  const [isDarkHeader, setIsDarkHeader] = useState(true);

  // Load fonts
  const [loaded] = useFonts({
    "SpotifyMix-Bold": require("@/assets/fonts/SpotifyMix-Bold.ttf"),
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

  const whitePages = new Set([0, 3, 4]);
  const isWhitePage = whitePages.has(currentPageRef.current);

  // const whitePages = new Set([0, 3, 4]);

  // Detect scroll
  const handleScroll = (event: {
    nativeEvent: { contentOffset: { y: number } };
  }) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / height);

    const isWhitePage = whitePages.has(index);

    // Header
    setIsDarkHeader(!isWhitePage);

    // Status bar
    setStatusBarStyle(isWhitePage ? "dark-content" : "light-content");

    if (index !== currentPageRef.current) {
      currentPageRef.current = index;

      // Change song
      if (index % 3 === 0) {
        playSongForPage(index / 3);
      }
    }
  };

  // Share Button
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out my Spotify 2025 Wrapped!",
        url: "https://yourapp.com/wrapped",
      });

      if (result.action === Share.sharedAction) {
        console.log("Shared successfully");
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
    }
  };

  // Go to Landing page
  const goBack = () => {
    if (currentPageRef.current === 0) {
      try {
        router.push("/");
      } catch (e) {
        router.replace("/");
      }
    } else {
      const newPage = Math.max(0, currentPageRef.current - 1);
      currentPageRef.current = newPage;

      scrollViewRef.current?.scrollTo({
        y: newPage * height,
        animated: true,
      });
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isWhitePage ? "#fff" : "#111" },
      ]}
    >
      <StatusBar
        barStyle={isWhitePage ? "dark-content" : "light-content"}
        backgroundColor={isWhitePage ? "#fff" : "#111"}
        translucent={false}
      />

      <TopHeader
        isWhiteBackground={!isDarkHeader}
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
          <Text style={{ marginTop: 20, fontWeight: "light" }}>
            Come on Down.
          </Text>

          <View style={styles.bigNumberContainer}>
            <AppText style={styles.bigNumber}>2025</AppText>
          </View>
        </View>

        {/* PAGE 2 */}
        <View style={[styles.page, { backgroundColor: "#111" }]}>
          <AppText style={styles.pageTitle}>You listened.</AppText>
          <AppText
            style={{
              color: "white",
              fontSize: 32,
              lineHeight: Platform.OS === "ios" ? 30 : 30,
            }}
          >
            We counted.
          </AppText>
        </View>

        {/* PAGE 3 */}
        <View style={[styles.page, { backgroundColor: "#111" }]}>
          <AppText style={styles.bigNumberPage3}>10,992</AppText>
          <Text style={[styles.pageText, { marginBottom: 20, lineHeight: 30 }]}>
            You listened for <Text style={{ fontWeight: "bold" }}>10,992</Text>{" "}
            minutes. That's <Text style={{ fontWeight: "bold" }}>7</Text> days,
            Nice.
          </Text>
          <Text
            style={[styles.shareButton, { fontFamily: "SpotifyMix-Bold" }]}
            onPress={onShare}
          >
            Share this story
          </Text>
        </View>

        {/* PAGE 4 */}
        <View style={[styles.page, { backgroundColor: "#fff" }]}>
          <AppText style={styles.page4Title}>
            Taste like yours can't be defined. But let's try anyway.
          </AppText>
          <Text style={{ marginTop: 10, fontSize: 16, textAlign: "center" }}>
            You listened to <Text style={{ fontWeight: "bold" }}>156</Text>{" "}
            genres.
          </Text>
          <AppText style={styles.pageText}>
            You Listened to <AppText>156</AppText> genres.
          </AppText>
        </View>

        {/* PAGE 5 */}
        <View style={[styles.page, { backgroundColor: "#fff" }]}>
          <Text
            style={{
              fontSize: 36,
              marginBottom: 20,
              textAlign: "center",
              fontFamily: "SpotifyMix-Bold",
            }}
          >
            Your top genres
          </Text>
          {topGenres.map((genre) => (
            <View key={genre.rank} style={styles.genreRow1}>
              <AppText style={styles.genreRank}>{genre.rank}</AppText>
              <AppText style={styles.genreName}>{genre.name}</AppText>
            </View>
          ))}

          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text
              style={[
                styles.shareButton,
                {
                  fontFamily: "SpotifyMix-Bold",
                  backgroundColor: "black",
                  color: "white",
                },
              ]}
              onPress={onShare}
            >
              Share this story
            </Text>
          </View>
        </View>

        {/* PAGE 6 */}
        <View style={[styles.page, { backgroundColor: "#111" }]}>
          <Text
            style={{
              width: 400,
              fontSize: 48,
              textAlign: "center",
              fontFamily: "SpotifyMix-Bold",
              color: "white",
            }}
          >
            Age is just
          </Text>
          <Text
            style={{
              fontSize: 48,
              textAlign: "center",
              fontFamily: "SpotifyMix-Bold",
              marginTop: -20,
              color: "white",
            }}
          >
            a number.
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 16,
              textAlign: "center",
              fontWeight: "light",
              color: "white",
            }}
          >
            So don't take this personally.
          </Text>
        </View>

        {/* PAGE 7 */}
        <View style={[styles.page, { backgroundColor: "#111" }]}>
          <Text
            style={{
              width: 400,
              fontSize: 30,
              textAlign: "center",
              fontFamily: "SpotifyMix-Bold",
              color: "white",
            }}
          >
            Your listening age
          </Text>
          <AppText style={styles.listeningAge}>19</AppText>
          <Text
            style={{
              marginTop: -30,
              fontSize: 16,
              textAlign: "center",
              fontWeight: "light",
              maxWidth: 320,
              lineHeight: 26,
              color: "white",
            }}
          >
            Since you listen to mostly new music. Your taste is trending.
          </Text>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text
              style={[
                styles.shareButton,
                {
                  fontFamily: "SpotifyMix-Bold",
                  backgroundColor: "white",
                  color: "#111",
                },
              ]}
              onPress={onShare}
            >
              Share this story
            </Text>
          </View>
        </View>

        {/* PAGE 8 */}
        <View style={[styles.page, { backgroundColor: "#111" }]}>
          <Text
            style={{
              fontSize: 32,
              fontFamily: "SpotifyMix-Bold",
              color: "white",
              textAlign: "center",
            }}
          >
            You listened to 1,261 songs this year.
          </Text>
          <Text style={{ color: "white", marginTop: 20 }}>
            But can you guess your #1?
          </Text>
        </View>

        {/* PAGE 9 */}
        <View style={[styles.page, { backgroundColor: "#111" }]}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "SpotifyMix-Bold",
              color: "white",
              textAlign: "center",
              marginTop: Platform.OS === "ios" ? -50 : 0,
            }}
          >
            Take your pick.
          </Text>
          {artists.map((artist) => (
            <View key={artist.artistName} style={styles.genreRow}>
              <View>
                <Image
                  source={{ uri: artist.image }}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "SpotifyMix-Bold",
                    marginBottom: 10,
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  {artist.songName}
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    color: "#fff",
                  }}
                >
                  {artist.artistName}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* PAGE 10 */}
        <View style={[styles.page, { backgroundColor: "#111" }]}>
          <View style={styles.videoCard}>
            {/* Video */}
            <Video
              ref={videoRef}
              style={styles.video}
              source={require("@/assets/video/rema.mp4")}
              // resizeMode="cover"
              shouldPlay
              isLooping
              isMuted
            />
          </View>

          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlndfIZUMX-Ii9MetLROVZjH5ei5_7aYipiw&s",
            }}
            style={styles.albumCover}
          />

          {/* Text Section */}
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Text style={styles.videoHeading}>Your top song</Text>
            <Text style={styles.videoSubtitle}>FUN by Rema</Text>
            <Text style={styles.videoCount}>
              You listened <Text style={{ fontWeight: "bold" }}>46</Text> times.
            </Text>
          </View>

          {/* Share Button */}
          <View style={{ marginTop: 30 }}>
            <Text
              style={[styles.shareButton, { fontFamily: "SpotifyMix-Bold" }]}
              onPress={onShare}
            >
              Share this story
            </Text>
          </View>
        </View>

        {/* PAGE 11 */}
        <View style={[styles.page, { backgroundColor: "#111" }]}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "SpotifyMix-Bold",
              color: "#111",
              backgroundColor: "white",
              paddingHorizontal: 20,
              paddingVertical: 5,
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            Your top songs
          </Text>

          {artists.map((artist) => (
            <View key={artist.artistName} style={styles.songRow}>
              <View>
                <Image
                  source={{ uri: artist.image }}
                  style={{
                    width: 80,
                    height: 80,
                    // borderRadius: 10,
                    borderWidth: 3,
                    borderColor: "#fff",
                    marginRight: 10,
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "SpotifyMix-Bold",
                    marginBottom: 0,
                    color: "#fff",
                    fontSize: 26,
                  }}
                >
                  {artist.songName}
                </Text>
                <Text
                  style={{
                    marginBottom: 0,
                    color: "#fff",
                  }}
                >
                  {artist.artistName}
                </Text>
              </View>
            </View>
          ))}

          {/* Share Button */}
          <View style={{ marginTop: 30 }}>
            <Text
              style={[styles.shareButton, { fontFamily: "SpotifyMix-Bold" }]}
              onPress={onShare}
            >
              Share this story
            </Text>
          </View>
        </View>

        {/* PAGE 8 */}
        <View style={[styles.page, { backgroundColor: "#111" }]}>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#fff",
              padding: 0,
              borderRadius: 10,
              width: "90%",
              height: 400,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 50,
                fontFamily: "SpotifyMix-Bold",
                color: "#222",
                textAlign: "center",
              }}
            >
              Your
            </Text>
            <Text
              style={{
                fontSize: 50,
                fontFamily: "SpotifyMix-Bold",
                color: "#222",
                textAlign: "center",
                marginTop: -25,
              }}
            >
              Top Songs
            </Text>
            <View style={{ position: "absolute", bottom: 0 }}>
              <Text
                style={{
                  fontSize: 120,
                  fontFamily: "Spotify-Bold",
                  fontWeight: "bold",
                  color: "#CCCCFF",
                  textAlign: "center",
                  // letterSpacing: 0,
                  fontStyle: "italic",
                }}
              >
                2025
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 35,
              textAlign: "center",
              fontFamily: "SpotifyMix-Bold",
              marginTop: 20,
              lineHeight: 35,
            }}
          >
            We made you a playlist of all your favourites.
          </Text>

          {/* Share Button */}
          <View style={{ marginTop: 30 }}>
            <Text style={styles.videoShareBtn} onPress={onShare}>
              Add to Your Library
            </Text>
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
    fontSize: 30,
    textAlign: "center",
    lineHeight: 30,
    width: 250,
  },
  bigNumberContainer: { position: "absolute", bottom: 60 },
  bigNumber: {
    fontSize: Platform.OS === "ios" ? 130 : 190,
    fontWeight: "bold",
    // fontStyle: "italic",
    color: "orangered",
    letterSpacing: 0,
  },
  pageTitle: { fontSize: 32, color: "white" },
  bigNumberPage3: {
    fontSize: Platform.OS === "ios" ? 100 : 110,
    color: "#CCCCFF",
    textShadowColor: "white",
    textShadowOffset: { width: 4, height: 1 },
    textShadowRadius: 6,
  },
  pageText: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
    maxWidth: 300,
    textAlign: "center",
  },
  listeningAge: {
    marginTop: 0,
    fontSize: 250,
    color: "#93C572",
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 1,
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
    fontSize: 38,
    color: "#222",
    textAlign: "center",
    lineHeight: 38,
  },
  genreRow1: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    width: 350,
  },
  genreRow: {
    borderWidth: 2,
    borderColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#111",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    width: 350,
  },
  genreRank: { fontSize: 22, width: 40 },
  genreName: {
    fontSize: 50,
    backgroundColor: "#111",
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
  videoCard: {
    width: "43%",
    height: 170,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 14,
    overflow: "hidden",
    flexDirection: "row",
    position: "relative",
  },

  video: {
    width: "100%",
  },

  albumCover: {
    width: 100,
    height: 100,
    position: "relative",
    bottom: 70,
    left: 70,
    borderWidth: 3,
    borderColor: "#fff",
  },

  videoHeading: {
    fontSize: 34,
    fontFamily: "SpotifyMix-Bold",
    color: "white",
  },

  videoSubtitle: {
    fontSize: 18,
    fontFamily: "SpotifyMix-Bold",
    marginTop: -5,
    color: "#fff",
  },

  videoCount: {
    fontSize: 14,
    color: "#fff",
    marginTop: 22,
  },

  videoShareBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#111",
  },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
    width: 350,
  },
});
