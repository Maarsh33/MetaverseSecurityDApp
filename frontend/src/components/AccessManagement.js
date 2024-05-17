import React, { useState } from "react";
import { ethers } from "ethers";
import AccessManagementABI from "../artifacts/contracts/AccessManagement.sol/AccessManagement.json";

const AccessManagement = ({ contractAddress }) => {
  const [fingerprint, setFingerprint] = useState("");
  const [attributeKey, setAttributeKey] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const handleAddAttribute = async () => {
    if (!fingerprint || !attributeKey || !attributeValue || !timestamp) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      AccessManagementABI.abi,
      signer
    );

    await contract.addAttribute(
      fingerprint,
      attributeKey,
      attributeValue,
      timestamp
    );
    alert("Attribute added successfully");
  };

  return (
    <div>
      <h2>Add User Attribute</h2>
      <input
        type="text"
        placeholder="Fingerprint"
        value={fingerprint}
        onChange={(e) => setFingerprint(e.target.value)}
      />
      <input
        type="text"
        placeholder="Attribute Key"
        value={attributeKey}
        onChange={(e) => setAttributeKey(e.target.value)}
      />
      <input
        type="text"
        placeholder="Attribute Value"
        value={attributeValue}
        onChange={(e) => setAttributeValue(e.target.value)}
      />
      <input
        type="text"
        placeholder="Timestamp"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
      />
      <button onClick={handleAddAttribute}>Add Attribute</button>
    </div>
  );
};

export default AccessManagement;
