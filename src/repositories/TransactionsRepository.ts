import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balances: Balance = { income: 0, outcome: 0, total: 0 };

    const balance = this.transactions.reduce(
      (prev, transactions: Transaction) => {
        if (transactions.type === 'income') {
          balances.income += transactions.value;
        } else {
          balances.outcome += transactions.value;
        }

        return balances;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    const { income, outcome } = balance;

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
