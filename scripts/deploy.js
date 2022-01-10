const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();
  console.log("Deployer Balance: ", hre.ethers.utils.formatEther(accountBalance));

  console.log("Deploying contracts with address: ", deployer.address);  

  // Compile and deploy
  const Token = await hre.ethers.getContractFactory("WavePortal");
  const portal = await Token.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });
  await portal.deployed();
  
  let contractBalance = await hre.ethers.provider.getBalance(portal.address);
  console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));
  
  console.log("WavePortal Address: ", portal.address);
}


const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();