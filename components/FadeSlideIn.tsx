import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";

export const FadeUp = ({ children, delay = 0 }: any) => (
  <Animated.View entering={FadeInUp.delay(delay).duration(900)}>
    {children}
  </Animated.View>
);

export const FadeDown = ({ children, delay = 0 }: any) => (
  <Animated.View entering={FadeInDown.delay(delay).duration(900)}>
    {children}
  </Animated.View>
);

export const FadeLeft = ({ children, delay = 0 }: any) => (
  <Animated.View entering={FadeInLeft.delay(delay).duration(600)}>
    {children}
  </Animated.View>
);

export const FadeRight = ({ children, delay = 0 }: any) => (
  <Animated.View entering={FadeInRight.delay(delay).duration(600)}>
    {children}
  </Animated.View>
);
