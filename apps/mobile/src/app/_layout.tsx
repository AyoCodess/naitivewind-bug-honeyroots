import "@bacons/text-decoder/install";
import "../global.css";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { ToastProvider } from "react-native-toastier";
import { Slot,useNavigationContainerRef } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as Updates from "expo-updates";

import "react-native-get-random-values";

import React,{ useCallback,useEffect } from "react";
import { LogLevel,OneSignal } from "react-native-onesignal";
import { isRunningInExpoGo } from "expo";
import { useFonts } from "expo-font";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// SplashScreen.preventAutoHideAsync();
// Prevent the splash screen from auto-hiding before App component is mounted

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string,value: string) {
    try {
      return SecureStore.setItemAsync(key,value);
    } catch (err) {
      return;
    }
  },
};

//* one signal
// Remove this method to stop OneSignal Debugging
// OneSignal.Debug.setLogLevel(LogLevel.Verbose);
// OneSignal Initialization
OneSignal.initialize("9e4455d0-9bb2-49d7-9c61-1d984880e588");

function Root() {
  const [fontsLoaded,fontError] = useFonts({
    ggBlack: require("../../assets/fonts/GalanoGrotesqueAltBlack.otf"),
    ggBold: require("../../assets/fonts/GalanoGrotesqueAltBold.otf"),
    ggBoldItalic: require("../../assets/fonts/GalanoGrotesqueAltBoldItalic.otf"),
    ggExtraBold: require("../../assets/fonts/GalanoGrotesqueAltExtraBold.otf"),
    ggExtraLight: require("../../assets/fonts/GalanoGrotesqueAltExtraLight.otf"),
    ggLight: require("../../assets/fonts/GalanoGrotesqueAltLight.otf"),
    ggMedium: require("../../assets/fonts/GalanoGrotesqueAltMedium.otf"),
    ggMediumItalic: require("../../assets/fonts/GalanoGrotesqueAltMediumItalic.otf"),
    ggRegular: require("../../assets/fonts/GalanoGrotesqueAltRegular.otf"),
    ggSemiBold: require("../../assets/fonts/GalanoGrotesqueAltSemiBold.otf"),
    ggSemiBoldItalic: require("../../assets/fonts/GalanoGrotesqueAltSemiBoldItalic.otf"),
    ggThin: require("../../assets/fonts/GalanoGrotesqueAltThin.otf"),
    ggItalic: require("../../assets/fonts/GalanoGrotesqueAltItalic.otf"),
  });

  //* Capture the NavigationContainer ref
  const ref = useNavigationContainerRef();

  useEffect(() => {
    if (ref) {
      // Register navigation container ref
    }
  },[ref]);

  useEffect(() => { },[]);

  //* load fonts
  const onLayoutRootView = useCallback(async () => {
    if (fontError) {
      // Handle font error
    }
  },[fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (

    <GestureHandlerRootView
      onLayout={onLayoutRootView}
      style={{ flex: 1 }}
    >
      <ToastProvider>
        <KeyboardProvider>
          <Slot />
        </KeyboardProvider>
      </ToastProvider>
    </GestureHandlerRootView>

  );
}

export default Root;
