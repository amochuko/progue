// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

error NotOwner(string);

contract Faucet {
    uint256 private x;

    address payable public owner;
    address public charity;

    constructor(uint256 _x, address _charity) {
        x = _x;
        owner = payable(msg.sender);
        charity = _charity;
    }

    function modifyToLeet() public {
        x = 1337;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert NotOwner("Only owner cal call!");
        }
        // require(owner == msg.sender, "Only owner cal call!");
        _;
    }

    function getX() public view returns (uint256) {
        // console.log("runner %o and %s", block.timestamp, msg.data);
        return x;
    }

    function withdraw(uint256 _amount) external payable {
        // users can only withdraw .1 ETH at a time
        require(_amount <= 100000000000000000);
        // payable(msg.sender).transfer(_amount);

        // (bool s,) = payable(msg.sender).call{value: address(this).balance}("");
        (bool s,) = owner.call{value: _amount}("");
        require(s, "Failed to withdraw");
    }

    function withdrawAll() external payable onlyOwner {
        // payable(msg.sender).transfer(_amount);
        (bool s,) = payable(msg.sender).call{value: address(this).balance}("");

        require(s, "Failed to withdraw");
    }

    function destroyFaucet() public onlyOwner {
        selfdestruct(owner);
    }

    function donate() external payable {
        (bool s,) = charity.call{value: address(this).balance}("");
        require(s, "Faild to send");
        // selfdestruct(payable(charity)); // destroys a contract and sends balance to args (address)
    }

    function tip() external payable {
        (bool s,) = owner.call{value: msg.value}("");
        require(s, "Failed to cash out");
    }

    // fallback function
    receive() external payable {}

    fallback() external {
        // Do something with function signature mistake
        // console.log(msg.data);
    }

    function check() external payable {
        if (msg.value < 1 ether) {
            revert("Below buget");
        }
    }
}

contract Hero {
    Ambush public ambush;

    struct Ambush {
        bool alerted;
        uint256 enemies;
        bool armed;
    }

    uint256 public lastContact;

    function alert(uint256 enemies, bool armed) external {
        ambush = Ambush(true, enemies, armed);
    }

    fallback() external {
        // this is trigged whenever any function signature
        // called doesn't exist
        lastContact = block.timestamp;
    }
}

// Manual contract call using calldata
contract SidekickA {
    function sendAlert(address hero) external {
        // TODO: fill in the function signature
        bytes4 signature = bytes4(keccak256("alert()"));

        (bool success,) = hero.call(abi.encodePacked(signature));

        require(success);
    }
}

// Encoding with Signature
contract SidekickB {
    function sendAlert(address hero, uint256 enemies, bool armed) external {
        (bool success,) = hero.call(
            /* TODO: alert the hero with the proper calldata! */
            abi.encodeWithSignature("alert(uint256,bool)", enemies, armed)
        );

        require(success);
    }

    // accepting calldata as params (function signature to be executed in another contract)
    function relay(address hero, bytes memory data) external {
        // send all of the data as calldata to the hero contract
        (bool s,) = hero.call(data);
        require(s);
    }

    function makeContact(address hero) external {
        // TODO: trigger the hero's fallback function!
        (bool s,) = hero.call(abi.encodeWithSignature("tell(uint256)", 23));
        require(s);
    }
}

// Auto contract call (calldata) using Contract's Interface
interface IHero {
    function alert() external;
}

contract SidekickC {
    function sendAlert(address hero) external {
        // TODO: alert the hero using the IHero interface
        IHero(hero).alert();
    }
}
