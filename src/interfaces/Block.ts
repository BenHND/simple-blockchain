import { ITransaction } from "./Transaction";

export interface IBlock {
  index: number;
  timestamp: Date;
  transactions: ITransaction[];
  previousHash: string;
  hash: string;
  nonce: number;
  merkleRoot: string;

  calculateHash(): string;
  buildMerkleTree(): string[];
  getMerkleRoot(): string;
  getProof(transaction: ITransaction): string[];
  verify(proof: string[], root: string, transaction: ITransaction): boolean;
}
