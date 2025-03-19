import { Block } from "./Block";
import { Transaction } from "./Transaction";

import { IBlockchain } from "../interfaces/Blockchain";
import { IBlock } from "../interfaces/Block";
import { ITransaction } from "../interfaces/Transaction";
import { ProofOfWork } from "./ProofOfWork";

export class Blockchain implements IBlockchain {
  readonly chain: IBlock[] = [];
  readonly difficulty: number;
  public pendingTransactions: ITransaction[] = [];

  constructor(difficulty: number) {
    this.difficulty = difficulty;
    const genesisBlock = this.createGenesisBlock();
    this.chain.push(genesisBlock);
  }

  createGenesisBlock(): IBlock {
    const genesisBlock = new Block(0, [], "0");
    genesisBlock.hash = genesisBlock.calculateHash();
    return genesisBlock;
  }

  addBlock(block: IBlock): void {
    this.chain.push(block);
  }

  getLatestBlock(): IBlock {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(transaction: ITransaction) {
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions(): void {
    const validator = new ProofOfWork();
    const newBlock = validator.mineBlock(
      new Block(
        this.chain.length,
        this.pendingTransactions,
        this.getLatestBlock().hash
      ),
      this
    );
    this.addBlock(newBlock);
    this.pendingTransactions = [];
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Check if the block's hash is valid
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      // Check if the block points to the correct previous block
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      // Verify all transactions in the block using the Merkle root
      const merkleRoot = currentBlock.getMerkleRoot();
      for (const transaction of currentBlock.transactions) {
        const proof = currentBlock.getProof(transaction);
        if (!currentBlock.verify(proof, merkleRoot, transaction)) {
          return false;
        }
      }
    }
    return true;
  }
}
