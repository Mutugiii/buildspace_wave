const main = async () => {
  const [owner, randomAddress, otherAddress] = await hre.ethers.getSigners(); // destructuring 3 wallet addresses
  // Compile and deploy
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  
  console.log("Contract deployed to: ", waveContract.address);
  console.log("Contract deployed by: ", owner.address);

  // Get contract balance
  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));

  // Wave 1st address - twice
  let waveCount;
  waveCount = await waveContract.getTotalWaves(); // Total waves count
  console.log(waveCount.toNumber());
  
  let waveTxn = await waveContract.wave("Message here");
  await waveTxn.wait()

  // waveCount = await waveContract.getTotalWaves(); // Total waves count

  // waveTxn = await waveContract.wave("Trying Again");
  // await waveTxn.wait()
  
  // waveCount = await waveContract.getTotalWaves(); // Total waves count

  // Get contract balance
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));

  // wave 2nd address
  waveTxn = await waveContract.connect(randomAddress).wave("Another One!");
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves(); // Total waves count
  console.log(waveCount.toNumber());

  // Get contract balance
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));

  // // Wave 3rd address 
  // waveTxn = await waveContract.connect(otherAddress).wave();
  // await waveTxn.wait();

  // waveCount = await waveContract.getTotalWaves(); // Total waves count

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
};

runMain();