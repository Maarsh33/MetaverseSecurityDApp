import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { ethers } from "ethers";
import IdentityManagementABI from "../artifacts/contracts/IdentityManagement.sol/IdentityManagement.json";
import FingerprintScanner from "react-native-fingerprint-scanner";

const IdentityManagement = ({ contractAddress }) => {
  const [username, setUsername] = useState("");
  const [fingerprint, setFingerprint] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [retrievedIdentity, setRetrievedIdentity] = useState(null);

  const captureFingerprint = async () => {
    try {
      await FingerprintScanner.authenticate({
        description: "Scan your fingerprint to authenticate",
      });
      // This should be replaced with actual fingerprint hash generation
      const simulatedFingerprint =
        "mocked_fingerprint_hash_" + Math.random().toString(36).substr(2, 9);
      setFingerprint(simulatedFingerprint);
      Alert.alert("Fingerprint captured", simulatedFingerprint);
    } catch (error) {
      Alert.alert("Fingerprint capture failed", error.message);
    } finally {
      FingerprintScanner.release();
    }
  };

  const handleAddIdentity = async () => {
    if (!username || !fingerprint || !publicKey) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      IdentityManagementABI.abi,
      signer
    );

    try {
      await contract.addUserIdentity(username, fingerprint, publicKey);
      Alert.alert("Success", "Identity added successfully");
    } catch (error) {
      console.error("Error adding identity:", error);
      Alert.alert("Error", "Failed to add identity");
    }
  };

  const handleGetIdentity = async () => {
    if (!fingerprint) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      IdentityManagementABI.abi,
      signer
    );

    try {
      const identity = await contract.getUserIdentity(fingerprint);
      setRetrievedIdentity(identity);
    } catch (error) {
      console.error("Error retrieving identity:", error);
      Alert.alert("Error", "Failed to retrieve identity");
    }
  };

  const handleRemoveIdentity = async () => {
    if (!fingerprint) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      IdentityManagementABI.abi,
      signer
    );

    try {
      await contract.removeUserIdentity(fingerprint);
      Alert.alert("Success", "Identity removed successfully");
    } catch (error) {
      console.error("Error removing identity:", error);
      Alert.alert("Error", "Failed to remove identity");
    }
  };

  return (
    <View>
      <Text>Add User Identity</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Public Key"
        value={publicKey}
        onChangeText={setPublicKey}
      />
      <Button title="Capture Fingerprint" onPress={captureFingerprint} />
      <Button title="Add Identity" onPress={handleAddIdentity} />

      <Text>Get User Identity</Text>
      <TextInput
        placeholder="Fingerprint"
        value={fingerprint}
        onChangeText={setFingerprint}
      />
      <Button title="Get Identity" onPress={handleGetIdentity} />
      {retrievedIdentity && (
        <View>
          <Text>Username: {retrievedIdentity[0]}</Text>
          <Text>Public Key: {retrievedIdentity[1]}</Text>
        </View>
      )}

      <Text>Remove User Identity</Text>
      <TextInput
        placeholder="Fingerprint"
        value={fingerprint}
        onChangeText={setFingerprint}
      />
      <Button title="Remove Identity" onPress={handleRemoveIdentity} />
    </View>
  );
};

export default IdentityManagement;
