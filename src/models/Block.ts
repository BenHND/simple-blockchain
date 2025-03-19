import crypto from "crypto";
import { MerkleTree } from "merkletreejs";

import { IBlock } from "../interfaces/Block";
import { ITransaction } from "../interfaces/Transaction";

export class Block implements IBlock {
  readonly index: number;
  readonly timestamp: Date;
  readonly transactions: ITransaction[];
  readonly previousHash: string;
  hash: string;
  nonce: number;
  merkleRoot: string;
  tree: MerkleTree;

  constructor(
    index: number,
    transactions: ITransaction[],
    previousHash: string
  ) {
    this.index = index;
    this.timestamp = new Date();
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = "";
    this.tree = new MerkleTree([]);
    this.merkleRoot = "";

    this.buildMerkleTree();
  }

  SHA256(data: any) {
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  calculateHash(): string {
    const data = JSON.stringify({
      index: this.index,
      timestamp: this.timestamp.toISOString(),
      transactions: this.transactions,
      previousHash: this.previousHash,
      nonce: this.nonce,
      merkleRoot: this.merkleRoot,
    });
    return this.SHA256(data);
  }

  buildMerkleTree(): string[] {
    const leaves = this.transactions.map((transaction) =>
      this.SHA256(JSON.stringify(transaction))
    );
    this.tree = new MerkleTree(leaves, this.SHA256);
    this.merkleRoot = this.tree.getRoot().toString("hex");
    return leaves;
  }

  getMerkleRoot(): string {
    return this.merkleRoot;
  }

  getProof(transaction: ITransaction): any[] {
    const leaf = this.SHA256(JSON.stringify(transaction));
    const proof = this.tree.getProof(leaf);
    return proof;
  }

  verify(proof: any[], root: string, transaction: ITransaction): boolean {
    const leaf = this.SHA256(JSON.stringify(transaction));
    return this.tree.verify(proof, leaf, root);
  }
}
