import type { ExpoConfig } from "@expo/config";
import { theme } from "./rawTheme.js";

const packageJson = require("./package.json");




const defineConfig = (): ExpoConfig => {
	return {
		name: "HoneyRoots",
		slug: "honeyroots",
		scheme: "honeyroots",
		orientation: "portrait",
		icon: "./assets/icon.png",
		userInterfaceStyle: "light",
		version: packageJson.version,
		experiments: {
			typedRoutes: true,
		},
		// splash: {
		// 	image: "./assets/splash.png",
		// 	resizeMode: "cover",
		// 	backgroundColor: theme.raw.colors.primary,
		// },
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
			bundleIdentifier: "fgfdgfdg",
			config: {
				usesNonExemptEncryption: false,
			},
			infoPlist: {
				UIBackgroundModes: ["fetch","remote-notification"],
				NSFaceIDUsageDescription: "Allow HoneyRoots to use Face ID.",
				deploymentTarget: "17.0",
				NSMicrophoneUsageDescription:
					"Allow HoneyRoots to access your microphone for audio recording for intercom voice dictation purposes only.",
			},
		},
		android: {
			softwareKeyboardLayoutMode: "pan",
			adaptiveIcon: {
				foregroundImage: "./assets/bootsplash/logo.png",
				backgroundColor: '#C62F2D',
			},
			permissions: ["android.permission.RECORD_AUDIO"],
			package: "fgfdgfdg",
			googleServicesFile:
				process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
		},
		web: {
			favicon: "./assets/favicon.png",
		},
		extra: {
			oneSignalAppId: "sdfdsfds",
			eas: {
				projectId: "dfdsfdsd",
			},
			supportsRTL: true,
		},
		owner: "ayocodes",
		updates: {
			url: "https://u.expo.dev/dsfdsf",
		},
		runtimeVersion: {
			policy: "appVersion",
		},

		plugins: [
			[
				"onesignal-expo-plugin",
				{
					mode: "development",
				},
			],
			[
				"expo-build-properties",
				{
					ios: {
						newArchEnabled: false,
					},
					android: {
						newArchEnabled: false,
					},
				},
			],
			["expo-router"],
			[
				"expo-updates",
				{
					username: "ayocodes",
					enabled: true,
				},
			],
			[
				"expo-local-authentication",
				{
					faceIDPermission: "Allow $(The HoneyRoots App) to use Face ID.",
				},
			],
			["expo-font"],
			[
				"@sentry/react-native/expo",
				{
					url: "https://sentry.io/",
					note: process.env.SENTRY_AUTH_TOKEN ?? "sentry auth token error",
					project: "honeyroots-app",
					organization: "honeyroots",
				},
			],
			["expo-localization"],
			[
				"react-native-bootsplash",
				{
					assetsDir: "assets/bootsplash",
					android: {
						parentTheme: "TransparentStatus",
						darkContentBarsStyle: false,
					},
				},
			],

			// [
			// 	"@intercom/intercom-react-native",
			// 	{
			// 		appId: process.env.INTERCOM_APP_ID,
			// 		androidApiKey: process.env.INTERCOM_ANDROID_API_KEY,
			// 		iosApiKey: process.env.INTERCOM_IOS_API_KEY,
			// 	},
			// ],

			[
				"expo-build-properties",
				{
					android: {
						compileSdkVersion: 34,
						targetSdkVersion: 34,
						buildToolsVersion: "34.0.0",
					},
					ios: {
						deploymentTarget: "16.0",
					},
				},
			],
			[
				"expo-tracking-transparency",
				{
					userTrackingPermission:
						"HoneyRoots ONLY uses app usage tracking to improve your experience. Please allow tracking so we can continually improve our features to best serve you.",
				},
			],
		],
	};
};

export default defineConfig;
