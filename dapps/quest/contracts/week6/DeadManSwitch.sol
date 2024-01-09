// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

/**
 * Dead Man's Switch 💀
 * Build a smart contract that will transfer funds to a recipient after a period of inactivity.
 */

contract DeadManSwitch {
    address receipient;
    address owner;
    uint256 lastPing;

    constructor(address _receipient) payable {
        owner = msg.sender;
        receipient = _receipient;
        lastPing = block.timestamp;
    }

    function withdraw() external {
        require((block.timestamp - lastPing) >= 54 weeks, "Too early to call!");
        require(msg.sender == receipient, "Only receipient can call!");

        (bool s,) = receipient.call{value: address(this).balance}("");
        require(s, "Can not send");
    }

    function ping() external {
        require(msg.sender == owner, "Only owner can call");
        lastPing = block.timestamp;
    }
}
