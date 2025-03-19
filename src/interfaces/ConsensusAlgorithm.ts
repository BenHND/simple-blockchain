import { IBlock } from "./Block";
import { IBlockchain } from "./Blockchain";

export interface IConsensusAlgorithm {
  validateBlock(block: IBlock, blockchain: IBlockchain): boolean;
  mineBlock(block: IBlock, blockchain: IBlockchain): IBlock;
}
