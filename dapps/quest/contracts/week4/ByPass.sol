// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract ByPasser {
    function win(address _ContractB) external {
        (bool s,) = _ContractB.call(abi.encodeWithSignature("attempt()"));

        require(s);
    }
}
