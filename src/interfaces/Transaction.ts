export interface ITransaction {
  from: string;
  to: string;
  value: number;
  hash: string;

  calculateHash(): string;
}
