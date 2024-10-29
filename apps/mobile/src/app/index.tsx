import { isLoaded,useFonts } from "expo-font";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React,{ useCallback,useEffect,useState } from "react";
import { ActivityIndicator,Animated,Text,View } from "react-native";
import BootSplash from "react-native-bootsplash";

// Define the minimum splash duration in milliseconds
const MIN_SPLASH_DURATION = 4000; // 3 seconds

type AnimatedBootSplashProps = {
  onAnimationEnd: () => void;
};

const AnimatedBootSplash = ({ onAnimationEnd }: AnimatedBootSplashProps) => {
  const [scale] = useState(() => new Animated.Value(1));
  const [logoOpacity] = useState(() => new Animated.Value(1));
  const [contentOpacity] = useState(() => new Animated.Value(0));

  const { container,logo } = BootSplash.useHideAnimation({
    manifest: require("../../assets/bootsplash/manifest.json"),
    logo: require("../../assets/bootsplash/logo.png"),
    statusBarTranslucent: true,
    navigationBarTranslucent: false,
    animate: () => {
      Animated.parallel([
        Animated.timing(scale,{
          useNativeDriver: true,
          toValue: 1.5,
          duration: 3000,
        }),
        Animated.timing(logoOpacity,{
          useNativeDriver: true,
          toValue: 0,
          duration: 3000,
        }),
        Animated.timing(contentOpacity,{
          useNativeDriver: true,
          toValue: 1,
          duration: 1500,
          delay: 2000,
        }),
      ]).start(() => {
        onAnimationEnd();
      });
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View {...container} style={[container.style]}>
        <LinearGradient
          colors={['rgba(210, 66, 56, 1)','rgba(107, 0, 18, 1)']}
          style={{ position: 'absolute',left: 0,right: 0,top: 0,bottom: 0 }}
        />
        <Animated.Image
          {...logo}
          style={[
            logo.style,
            {
              transform: [{ scale }],
              opacity: logoOpacity
            }
          ]}
        />
      </Animated.View>
      <Animated.View
        style={[
          {
            opacity: contentOpacity,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }
        ]}
      >
        <View className="flex-row items-center justify-center gap-2">
          <Text className="text-white text-2xl font-ggMedium">HoneyRoots</Text>
          <ActivityIndicator size="small" color={'white'} />
        </View>
      </Animated.View>
    </View>
  );
};

function StartPage() {
  const [visible,setVisible] = useState(true);
  const [showDelayMessage,setShowDelayMessage] = useState(false);
  const [showTimeoutMessage,setShowTimeoutMessage] = useState(false);
  const delayMessageOpacity = useState(new Animated.Value(0))[0];
  const timeoutMessageOpacity = useState(new Animated.Value(0))[0];
  const [isRouterReady,setIsRouterReady] = useState(false);
  const router = useRouter();

  // Load fonts
  const [fontsLoaded] = useFonts({
    // Add your font families here, for example:
    // 'Inter-Bold': require('./assets/fonts/Inter-Bold.otf'),
  });




  const init = useCallback(async () => {

    if (!fontsLoaded) {
      return;
    }


    const startTime = Date.now();
    const delayMessageTimeout = setTimeout(() => {
      console.log("Showing delay message");
      setShowDelayMessage(true);
      Animated.timing(delayMessageOpacity,{
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    },10000);

    const timeoutMessageTimeout = setTimeout(() => {
      console.log("Showing timeout message");
      Animated.timing(delayMessageOpacity,{
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowDelayMessage(false);
        setShowTimeoutMessage(true);
        Animated.timing(timeoutMessageOpacity,{
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    },30000);

    try {
      // Artificially delay the route change for testing
      // const artificialDelay = 35000; // 35 seconds
      // await new Promise(resolve => setTimeout(resolve, artificialDelay));

      // Determine the route
      const route = "/start/home";

      // Wait for the minimum splash duration
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0,MIN_SPLASH_DURATION - elapsedTime);
      await new Promise(resolve => setTimeout(resolve,remainingTime));

      // Set router as ready
      setIsRouterReady(true);

      // Navigate to the appropriate route
      router.replace(route);

      // Hide the splash screen only after navigation is complete
      setVisible(false);
      setShowDelayMessage(false);
      setShowTimeoutMessage(false);
      clearTimeout(delayMessageTimeout);
      clearTimeout(timeoutMessageTimeout);
      console.log("Splash screen hidden");
    } catch (error) {
      console.error("Navigation error:",error);
      setVisible(false);
      setShowDelayMessage(false);
      setShowTimeoutMessage(false);
      clearTimeout(delayMessageTimeout);
      clearTimeout(timeoutMessageTimeout);
    }
  },[
    router,
    fontsLoaded,

  ]);

  useEffect(() => {
    init();
  },[init]);

  return (
    <View style={{ flex: 1 }}>
      {/* Your app content will go here */}
      {(visible || !isRouterReady) && (
        <AnimatedBootSplash
          onAnimationEnd={() => {
            // Do nothing here, we'll control visibility based on router readiness
          }}
        />
      )}
      {showDelayMessage && (
        <Animated.View
          style={[
            {
              opacity: delayMessageOpacity,
              position: 'absolute',
              top: '50%', // Center vertically
              left: 0,
              right: 0,
              alignItems: 'center',
              transform: [{ translateY: 30 }], // Adjust for centering
            }
          ]}
        >
          <Text className="text-white text-center font-ggRegular  text-lg ">
            This is taking longer than usual, please wait...
          </Text>
        </Animated.View>
      )}
      {showTimeoutMessage && (
        <Animated.View
          style={[
            {
              opacity: timeoutMessageOpacity,
              position: 'absolute',
              top: '50%', // Center vertically
              left: 0,
              right: 0,
              alignItems: 'center',
              transform: [{ translateY: 30 }], // Adjust for centering
            }
          ]}
        >
          <Text className="text-white font-ggRegular text-center text-lg ">
            Please close and restart the app or check your internet.
          </Text>
        </Animated.View>
      )}
    </View>
  );
}

export default StartPage;
