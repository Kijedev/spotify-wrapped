// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { HelloWave } from '@/components/hello-wave';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Link } from 'expo-router';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12',
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <Link href="/modal">
//           <Link.Trigger>
//             <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//           </Link.Trigger>
//           <Link.Preview />
//           <Link.Menu>
//             <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
//             <Link.MenuAction
//               title="Share"
//               icon="square.and.arrow.up"
//               onPress={() => alert('Share pressed')}
//             />
//             <Link.Menu title="More" icon="ellipsis">
//               <Link.MenuAction
//                 title="Delete"
//                 icon="trash"
//                 destructive
//                 onPress={() => alert('Delete pressed')}
//               />
//             </Link.Menu>
//           </Link.Menu>
//         </Link>

//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

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
];

const Home = () => {
  const router = useRouter();

  const [loaded] = useFonts({
    "Lexend-Bold": require("@/assets/fonts/Lexend-Bold.ttf"),
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
          marginTop: 50,
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
              marginBottom: 20,
              backgroundColor: "#333",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={{ uri: artist.image }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  marginRight: 10,
                }}
              />
              <Text
                style={{
                  fontFamily: "Lexend-Bold",
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
            fontFamily: "Lexend-Bold",
            textAlign: "center",
          }}
        >
          Your 2025
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontFamily: "Lexend-Bold",
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
          <Text style={{ color: "black", fontFamily: "Lexend-Bold" }}>
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
