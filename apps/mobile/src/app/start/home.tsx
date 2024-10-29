import React from 'react';
import { View,Text,ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Home screen component that displays the main landing page of the app
 * Uses SafeAreaView to handle device notches and system UI elements
 */
function Home() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          {/* Header Section */}
          <View className="mb-8">
            <Text className="text-3xl font-ggBold text-gray-900">Welcome</Text>
            <Text className="text-base font-ggRegular text-gray-600 mt-2">
              Let's get started with HoneyRoots
            </Text>
          </View>

          {/* Main Content Section */}
          <View className="space-y-6">
            {/* Quick Actions Card */}
            <View className="bg-gray-50 p-4 rounded-xl">
              <Text className="text-xl font-ggMedium text-gray-800 mb-4">
                Quick Actions
              </Text>
              <View className="space-y-3">
                <View className="bg-white p-4 rounded-lg shadow-sm">
                  <Text className="text-gray-800 font-ggMedium">Start Here</Text>
                </View>
                <View className="bg-white p-4 rounded-lg shadow-sm">
                  <Text className="text-gray-800 font-ggMedium">Explore</Text>
                </View>
              </View>
            </View>

            {/* Recent Activity Section */}
            <View className="bg-gray-50 p-4 rounded-xl">
              <Text className="text-xl font-ggMedium text-gray-800 mb-4">
                Recent Activity
              </Text>
              <View className="bg-white p-4 rounded-lg shadow-sm">
                <Text className="text-gray-600 font-ggRegular">
                  No recent activity
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
