import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const includesTypes = ['income', 'outcome'].includes(type);

    if (!includesTypes) {
      throw new Error('Invalid Type');
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new Error('You do not have enough');
    }

    const transation = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transation;
  }
}

export default CreateTransactionService;
