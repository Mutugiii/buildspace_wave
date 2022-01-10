// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
  uint256 totalWaves;
  uint256 private seed;

  event NewWave(
    address indexed from,
    uint256 timestamp,
    string message
  );

  struct Wave {
    address waver;
    string message;
    uint256 timestamp;
  }
  
  // struct with waver specific data
  struct waverData {
    uint256 count;
    uint256 timestamp;
  }

  Wave[] waves;

  // Mapping last time user waved to prevent spam
  mapping(address => uint256) public lastWavedAt;

  // mapping address to waver data 
  mapping(address => waverData) waver;

  constructor () payable {
    // Set the initial seed
    seed = (block.timestamp + block.difficulty) % 100;
  }

  function wave(string memory _message) public {
    require(lastWavedAt[msg.sender] + 45 seconds < block.timestamp, "Wait 45 seconds before retrying");

    lastWavedAt[msg.sender] = block.timestamp;

    totalWaves += 1;
    console.log("%s waved w/ message %s", msg.sender, _message);

    waves.push(Wave(msg.sender, _message, block.timestamp));

    // Generate new seed for next user that sends a wave
    seed =(block.difficulty + block.timestamp + seed) % 100;
    console.log("Random # generated: %d", seed);

    // 50-50 chance to win prize
    if(seed <= 50) {
      console.log("%s won!", msg.sender);

      uint256 prizeAmount = 0.0001 ether;
      require(
        prizeAmount <= address(this).balance,
        "Trying to withdraw more money than the contract has."
      );

      (bool success, ) = (msg.sender).call{value: prizeAmount}("");
      require(success, "Failed to withdraw money from contract.");
    }

    emit NewWave(msg.sender, block.timestamp, _message);

    // Count the individual waves and block timestamps
    waver[msg.sender].count += 1;
    waver[msg.sender].timestamp = block.timestamp;

    console.log("%s has waved", msg.sender);
    console.log("%s has cumulatively waved %d time(s). The block timestamep when they waved was %s", msg.sender, waver[msg.sender].count, waver[msg.sender].timestamp);
  }

  function getAllWaves() public view returns (Wave[] memory) {
    return waves;
  }

  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d total waves!", totalWaves);
    return totalWaves;
  }
}