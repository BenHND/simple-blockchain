import crypto from "crypto";

import { ITransaction } from "../interfaces/Transaction";

export class Transaction implements ITransaction {
  readonly from: string;
  readonly to: string;
  readonly value: number;
  readonly hash: string;

  constructor(from: string, to: string, value: number) {
    this.from = from;
    this.to = to;
    this.value = value;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    const data = JSON.stringify({
      from: this.from,
      to: this.to,
      value: this.value,
    });
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    return hash;
  }
}
