import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    let outcome = 0;

    const income =
      this.transactions.length > 0
        ? this.transactions
            .filter(x => x.type === 'income')
            .map(x => x.value)
            .reduce((a, b) => a + b)
        : 0;

    const outcomeTransactions = this.transactions.filter(
      x => x.type === 'outcome',
    );

    if (outcomeTransactions.length > 0) {
      outcome = outcomeTransactions.map(x => x.value).reduce((a, b) => a + b);
    }

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
