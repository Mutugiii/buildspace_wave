const main = async () => {
  const [owner, randomAddress, otherAddress] = await hre.ethers.getSigners(); // destructuring 3 wallet addresses
  // Compile and deploy
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();
  
  console.log("Contract deployed to: ", waveContract.address);
  console.log("Contract deployed by: ", owner.address);

  // Wave 1st address - twice
  let waveCount;
  waveCount = await waveContract.getTotalWaves(); // Total waves count
  
  let waveTxn = await waveContract.wave();
  await waveTxn.wait()

  waveCount = await waveContract.getTotalWaves(); // Total waves count

  waveTxn = await waveContract.wave();
  await waveTxn.wait()
  
  waveCount = await waveContract.getTotalWaves(); // Total waves count

  // wave 2nd address
  waveTxn = await waveContract.connect(randomAddress).wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves(); // Total waves count

  // Wave 3rd address 
  waveTxn = await waveContract.connect(otherAddress).wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves(); // Total waves count
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