import { IBlock } from "./Block";
import { ITransaction } from "./Transaction";

export interface IBlockchain {
  chain: IBlock[];
  difficulty: number;
  pendingTransactions: ITransaction[];

  createGenesisBlock(): IBlock;
  getLatestBlock(): IBlock;
  addBlock(block: IBlock): void;
  isChainValid(): boolean;
  minePendingTransactions(miningRewardAddress: string): void;
}
