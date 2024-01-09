// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

contract PartySpliter {
    uint256 public rsvpAmount;
    mapping(address friend => uint256 numberIn) public attendance;
    address[] members;

    constructor(uint256 _amount) payable {
        rsvpAmount = _amount;
    }

    modifier alreadyRsvp() {
        require(attendance[msg.sender] == 0, "Can not enter twice");
        _;
    }

    function rsvp() external payable alreadyRsvp {
        require(msg.value == rsvpAmount, "Not enough amount");
 
        members.push(msg.sender);
        attendance[msg.sender] = members.length;
    }

    function payBill(address _venue, uint256 _amount) external {
        // get remaining balance paying venue 
        uint256 balance = address(this).balance - _amount;
        
        // pay the venue fee
        (bool s,) = _venue.call{value: _amount}("");
        require(s, "Failed to send pyament!");

        uint256 remainderShare = balance / members.length;

        for (uint256 i = 0; i < members.length; i++) {
            (bool su,) = members[i].call{value: remainderShare}("");
            require(su, "Not sent");
        }
    }
}
