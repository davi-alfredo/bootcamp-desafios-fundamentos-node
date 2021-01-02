import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
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
    /** FORMA ENSINADA COM REDUCE */
    // const { income, outcome } = this.transactions.reduce(
    //   (accumulador: Balance, transaction: Transaction) => {
    //     switch (transaction.type) {
    //       case 'income':
    //         accumulador.income += transaction.value;
    //         break;
    //       case 'outcome':
    //         accumulador.outcome += transaction.value;
    //         break;
    //       default:
    //         break;
    //     }
    //     return accumulador;
    //   },
    //   {
    //     income: 0,
    //     outcome: 0,
    //     total: 0,
    //   },
    // );

    let income = 0;
    let outcome = 0;
    this.transactions.filter(transaction => {
      if (transaction.type === 'income') {
        income += transaction.value;
      } else {
        outcome += transaction.value;
      }
      return transaction;
    });

    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
