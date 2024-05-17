async function main() {
  const IdentityManagement = await ethers.getContractFactory(
    "IdentityManagement"
  );
  const identityManagement = await IdentityManagement.deploy();
  await identityManagement.deployed();
  console.log("IdentityManagement deployed to:", identityManagement.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
