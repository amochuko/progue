const { sha256 } = require('ethereum-cryptography/sha256');
const { toHex, utf8ToBytes } = require('ethereum-cryptography/utils');
const secp = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');

// the possible colors that the hash could represent
const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

/**
 * @dev A function that accept a hash input and
 * brute-forces a list of color to get it hash
 * @param {*} hash Array of colors
 * @returns color
 */
function findColor(hash) {
  let hashed;

  for (let i = 0; i < COLORS.length; i++) {
    hashed = sha256(utf8ToBytes(COLORS[i]));

    if (toHex(hashed) == toHex(hash)) {
      return COLORS[i];
    }
  }
}

findColor(COLORS);