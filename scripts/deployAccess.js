async function main() {
  const AccessManagement = await ethers.getContractFactory("AccessManagement");
  const accessManagement = await AccessManagement.deploy();
  await accessManagement.deployed();
  console.log("AccessManagement deployed to:", accessManagement.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
