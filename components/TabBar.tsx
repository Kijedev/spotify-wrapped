import { Feather, Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable, Text } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";

type IconProps = { color: string };

const icon: Record<string, (props: IconProps) => JSX.Element> = {
  index: (props) => <Feather name="home" size={20} {...props} />,
  //   search: (props) => <Ionicons name="search" size={24} {...props} />,
  library: (props) => <Ionicons name="library" size={20} {...props} />,
  premium: (props) => <Ionicons name="diamond" size={20} {...props} />,
  create: (props) => <Feather name="plus" size={20} {...props} />,
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={{ position: "absolute", bottom: 30, left: 20, right: 20 }}>
      <BlurView intensity={20} tint="light" style={styles.tabbar}>
        {state.routes.map((route, index) => {
          const { name, key, params } = route;
          const { options } = descriptors[key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(name, params);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: "tabLongPress", target: key });
          };

          const IconComponent = icon[name];
          const label = options.tabBarLabel ?? options.title ?? name;

          return (
            <PlatformPressable
              key={key}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabbarItem}
            >
              <View
                style={[
                  styles.iconWrapper,
                  isFocused && styles.activeIconWrapper,
                ]}
              >
                {IconComponent && (
                  <IconComponent color={isFocused ? "#fff" : "#777"} />
                )}
              </View>
              <Text style={{ color: isFocused ? "white" : "#777" }}>
                {label}
              </Text>
            </PlatformPressable>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    gap: 20,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeIconWrapper: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
  },
});
