import { IBlock } from "../interfaces/Block";
import { IBlockchain } from "../interfaces/Blockchain";
import { IConsensusAlgorithm } from "../interfaces/ConsensusAlgorithm";

export class ProofOfWork implements IConsensusAlgorithm {
  validateBlock(block: IBlock, blockchain: IBlockchain): boolean {
    const target = "0".repeat(blockchain.difficulty);
    const isValid = block.hash.startsWith(target);
    return isValid;
  }

  mineBlock(block: IBlock, blockchain: IBlockchain): IBlock {
    while (!this.validateBlock(block, blockchain)) {
      block.nonce++;
      block.hash = block.calculateHash();
    }
    return block;
  }
}
