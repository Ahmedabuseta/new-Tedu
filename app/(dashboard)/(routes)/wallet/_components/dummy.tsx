type TransactionType = 'CREDIT' | 'DEBIT';
type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

interface Transaction {
  walletId: number;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  description: string;
  createdAt: Date;
}

export function generateDummyTransactions(walletId: number, count: number): Transaction[] {
  const transactions: Transaction[] = [];
  const transactionTypes: TransactionType[] = ['CREDIT', 'DEBIT'];
  const transactionStatuses: TransactionStatus[] = ['PENDING', 'COMPLETED', 'FAILED'];
  const descriptions: string[] = ['Referral commission', 'Withdrawal', 'Bonus', 'Failed Withdrawal'];

  for (let i = 0; i < count; i++) {
    const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    const status = transactionStatuses[Math.floor(Math.random() * transactionStatuses.length)];
    const amount = parseFloat((Math.random() * 200).toFixed(2)); // Random amount between 0 and 200
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const createdAt = new Date();

    transactions.push({
      walletId,
      type,
      amount,
      status,
      description,
      createdAt,
    });
  }

  return transactions;
}
