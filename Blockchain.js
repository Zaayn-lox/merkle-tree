/**
 * Seminar 2.1 Blockchain primitive
 */

const SHA256 = require('ethereum-cryptography/sha256').sha256;
const utf8ToBytes = require('ethereum-cryptography/utils').utf8ToBytes;


class Block {
    constructor(data){
        this.data = data;      // Here we simplify data, let it be just a simple string
        this.previousHash = null;
    }

    toHash(){
        const hashBytes = utf8ToBytes(this.data + this.previousHash);
        return SHA256(hashBytes);        // a hash as byte array
    }
}


class Blockchain {
    constructor() {
        this.chain = [new Block("Genesis Block")];
    }

    addBlock(block) {
        const previousBlock = this.chain[this.chain.length - 1];
        block.previousHash = previousBlock.toHash();
        this.chain.push(block);
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const block = this.chain[i];
            const previousBlock = this.chain[i - 1];
            const expectedHash = previousBlock.toHash();

            if (
                !block.previousHash ||
                !Buffer.from(block.previousHash).equals(
                    Buffer.from(expectedHash)
                )
            ) {
                return false;
            }
        }

        return true;
    }
}

module.exports = { Block, Blockchain };
