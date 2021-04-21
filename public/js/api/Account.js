/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = '/account';
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback) {
    const newData = { "id": id };

    createRequest({
      url: this.URL,
      method: 'GET',
      responseType: 'json',
      data: newData,
      callback: (err, response) => {
        callback(err, response);
      }
    });
  }
}
