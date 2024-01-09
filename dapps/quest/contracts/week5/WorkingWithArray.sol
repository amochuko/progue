// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

// This contract works with Array data types
contract ArrayDataStructure {

    uint[] public evenNumbers;
    address[] public members;

    constructor() {
        members.push(msg.sender);
    }

    function addMember(address _user) external {
           bool member = isMember(msg.sender);
           require(member, 'Only members can push');
        members.push(_user);
    }    

    function isMember(address _user) public view returns (bool) {
        for(uint i = 0; i < members.length; i++) {
            if(members[i] == _user){
                return true;
            }
        }

        return false;
    }

    function removeLastMember() public {
        bool member = isMember(msg.sender);
          require(member, 'Only members can pop');
            members.pop();
      
    }
    function filterEven(uint[] memory arr) external {

        for(uint i=0; i < arr.length; i++){
            if(arr[i] % 2 == 0){
                evenNumbers.push(arr[i]);
            }
        }
    }

// working with memory array index value
   function filterEven(uint[] memory arr) external pure returns(uint[] memory) {

            uint counter;
            for(uint i = 0; i < arr.length; i++) {
                if(arr[i] % 2 == 0) {
                    counter++;
                }
            }


            uint[] memory evenArr = new uint[](counter);
            uint index;
                
            for(uint i = 0; i < arr.length; i++) {
                if(arr[i] % 2 == 0) {
                    evenArr[index] = arr[i];
                    index++;
                }
            }

            return evenArr;
        }

    // accept fixed size array
    function sumFiexdArray(uint256[5] memory arr) external pure returns (uint256) {
        uint256 res;

        for (uint256 i = 0; i < arr.length; i++) {
            res += arr[i];
        }

        return res;
    }

    function sumDynamicArray(uint256[] calldata arr) external pure returns (uint256) {
        uint256 total;

        for (uint256 i = 0; i < arr.length; i++) {
            total += arr[i];
        }

        return total;
    }
}
