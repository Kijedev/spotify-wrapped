import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Tabs } from "expo-router";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* Explore / Search Tab */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} color={color} name="search-outline"></Ionicons>
          ),
        }}
      />

      {/* Library Tab */}
      <Tabs.Screen
        name="library"
        options={{
          title: "Your Library",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="music.note.list" color={color} />
          ),
        }}
      />

      {/* Premium Tab */}
      <Tabs.Screen
        name="premium"
        options={{
          title: "Premium",
          tabBarIcon: ({ color }) => (
            <Icon name="spotify" size={28} color={color} />
          ),
        }}
      />

      {/* Create Tab */}
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="plus.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
