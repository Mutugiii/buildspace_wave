// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
  uint256 totalWaves;
  
  // struct with waver specific data
  struct waverData {
    uint256 count;
    uint256 timestamp;
  }
  // mapping address to waver data 
  mapping(address => waverData) waver;

  constructor () {
    console.log("This is the smart contract :)");
  }

  function wave() public {
    totalWaves += 1;
    // Count the individual waves and block timestamps
    waver[msg.sender].count += 1;
    waver[msg.sender].timestamp = block.timestamp;

    console.log("%s has waved", msg.sender);
    console.log("%s has cumulatively waved %d time(s). The block timestamep when they waved was %s", msg.sender, waver[msg.sender].count, waver[msg.sender].timestamp);
  }

  function getTotalWaves() public view returns (uint256) {
    console.log("We have %d total waves!", totalWaves);
    return totalWaves;
  }
}