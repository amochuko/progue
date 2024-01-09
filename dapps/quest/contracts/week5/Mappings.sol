// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Mapping {
    mapping(address user => bool) members;

    function addMember(address _user) external {
        members[_user] = false;
    }

    function isMember(address _user) external view returns (bool) {
        return members[_user];
    }

    function removeMember(address _user) external {
        members[_user] = false;
    }
}

contract Market {
    struct Collectible {
        address owner;
        bool forSale;
        uint256 price;
    }

    struct User {
        uint256 balance;
        bool isActive;
    }

    mapping(uint256 id => Collectible) IdToCollectible;
    mapping(address => User) public users;

    function createUser() external {
        require(!users[msg.sender].isActive, "New user only!");

        User storage u = users[msg.sender];
        u.balance = 100;
        u.isActive = true;
    }

    function transfer(address _receipient, uint _amount) external {
        require(users[_receipient].isActive, 'Only active user!');
        require(users[msg.sender].balance >= _amount, 'Low balance');

        users[msg.sender].balance -= _amount;
        users[_receipient].balance += _amount;
    }

    function purchase(uint256 _id) external payable {
        Collectible storage c = IdToCollectible[_id];

        require(msg.value >= c.price, "Can not pay less!");
        c.owner = msg.sender;
        c.forSale = false;
    }
}


// Nested mapping
contract NestedMapping {
    enum ConnectionTypes {
        Unacquainted,
        Friend,
        Family
    }

    mapping(address => mapping(address => ConnectionTypes)) public connections;

    function connectWith(address _other, ConnectionTypes connectionType) external {
        connections[msg.sender][_other] = connectionType;
    }
}