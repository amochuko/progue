const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY =
  BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
  // TODO: add transaction to mempool
  mempool.push(transaction);
}

function mine() {
  // TODO: mine a block
  const block = {};
  let hash;

  block.id = blocks.length;
  block.transactions = [];

  while (MAX_TRANSACTIONS > block.transactions.length && mempool.length > 0) {
    block.transactions.push(mempool.splice(0, 1));
  }
  block.nonce = 0;

  while (true) {
    hash = SHA256(JSON.stringify(block));

    if (BigInt(`0x${hash}`) < TARGET_DIFFICULTY) {
      break;
    }
    block.nonce++;
  }

  blocks.push({
    ...block,
    hash,
  });
}

module.exports = {
  TARGET_DIFFICULTY,
  MAX_TRANSACTIONS,
  addTransaction,
  mine,
  blocks,
  mempool,
};
