/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Элемент не существует');
    }
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const button = Array.from(document.getElementsByClassName("btn-block"));

    button.forEach(item => {
      item.addEventListener('click', (event) => {

        const on = event.target.closest(".btn-block");

        if (on.classList.contains("create-income-button")) {
          App.getModal('newIncome').open();
        } else if (on.classList.contains("create-expense-button")) {
          App.getModal('newExpense').open();
        }
      })
    })
  }
}
