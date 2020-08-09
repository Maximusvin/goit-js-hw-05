'use strict';

const Transaction = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};

// Каждая транзакция это объект со свойствами: id, type и amount
const account = {
  balance: 0, // Текущий балланс
  transactions: [], // История транзакций

  // Метод создает и возвращает объект транзакции. Принимает сумму и тип транзакции
  createTransaction(amount, type) {
    this.transactions.push({ amount, type, id: this.transactions.length + 1 });
  },

  /*
   * Метод отвечающий за добавление суммы к балансу. Принимает сумму транзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */
  deposit(amount) {
    this.balance += amount;
    this.createTransaction(amount, Transaction.DEPOSIT);
  },

  /*
   * Метод отвечающий за снятие суммы с баланса. Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций.
   * Если amount больше чем текущий баланс, выводи сообщение
   * о том, что снятие такой суммы не возможно, недостаточно средств.
   */
  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      this.createTransaction(amount, Transaction.WITHDRAW);
    } else {
      console.log('Снятие такой суммы не возможно, недостаточно средств');
    }
  },

  // Метод возвращает текущий баланс
  getBalance() {
    return `Балланс вашего аккаунта составляет: ${account.balance} грн`;
  },

  // Метод ищет и возвращает объект транзации по id
  getTransactionDetails(id) {
    for (const item of this.transactions) {
      if (id === item.id) {
        return item;
      }
    }
  },

  // * Метод возвращает количество средств определенного типа транзакции из всей истории транзакций
  getTransactionTotal(type) {
    let totalSumoftype = 0;

    for (const item of this.transactions) {
      if (type === item.type) {
        totalSumoftype += item.amount;
      }
    }
    return `Количество средств по транзакции ${type}: ${totalSumoftype} грн`;
  },
};

// Проверка кода
account.deposit(100);
account.withdraw(120);
account.deposit(100);
account.deposit(350);
account.withdraw(100);
account.withdraw(50);

console.table(account.transactions);
console.log(account.getBalance());
console.table(account.getTransactionDetails(2));
console.table(account.getTransactionTotal('withdraw'));
