import { Blockchain } from "./models/Blockchain";
import { Transaction } from "./models/Transaction";

const blockchain = new Blockchain(3);

const transaction1 = new Transaction("John", "Paul", 20);
const transaction2 = new Transaction("Jack", "Steven", 20);
const transaction3 = new Transaction("Paul", "Steven", 10);

blockchain.addTransaction(transaction1);
blockchain.addTransaction(transaction2);
blockchain.addTransaction(transaction3);

blockchain.minePendingTransactions();

const transaction4 = new Transaction("John", "Paul", 20);
const transaction5 = new Transaction("Jack", "Steven", 20);
const transaction6 = new Transaction("Paul", "Steven", 10);

blockchain.addTransaction(transaction4);
blockchain.addTransaction(transaction5);
blockchain.addTransaction(transaction6);

blockchain.minePendingTransactions();

console.log(blockchain);
console.log(blockchain.isChainValid());
