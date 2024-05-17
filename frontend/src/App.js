import React from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import IdentityManagement from "./components/IdentityManagement";
import AccessManagement from "./components/AccessManagement"; // Assuming you have this component

const App = () => {
  const identityManagementAddress =
    "0x381Aa0560715Bc6b7555D7793feB549DFFc04AAD";
  const accessManagementAddress = "0xFdcDB29aEeC0d606fcc81010fABF15a37E1ef9AA";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <IdentityManagement contractAddress={identityManagementAddress} />
        <AccessManagement contractAddress={accessManagementAddress} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export default App;
