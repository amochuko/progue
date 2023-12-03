const { keccak256 } = require('ethereum-cryptography/keccak');

/**
 * @dev function to get the Ethereum address from a publicKey
 * PublicKey is 32 bytes
 * Ethereum address is last 20 bytes of of hash
 * @param {*} publicKey a Uint8Array
 */
export function getAddressFromPublicKey(publicKey) {
  // slice off first byte (which indicates the format of the key; whether it is in the compressed state or not)
  const slicedPubKey = publicKey.slice(1);

  // get hash of slicedPubKey
  const hashed = keccak256(slicedPubKey);

  // return last 20 byte of hash
  return hashed.slice(-20);
}
