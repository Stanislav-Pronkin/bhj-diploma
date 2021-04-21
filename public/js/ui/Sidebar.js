/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector(".sidebar-mini");

    sidebarToggle.addEventListener('click', (event) => {
      event.preventDefault();
      sidebar.classList.toggle("sidebar-open");
      sidebar.classList.toggle("sidebar-collapse");
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const button = Array.from(document.getElementsByClassName("menu-item"));

    button.forEach(item => {
      item.addEventListener('click', (event) => {
        const on = event.target.closest(".menu-item");

        if (on.classList.contains("menu-item_login")) {
          App.getModal('login').open();
        } else if (on.classList.contains("menu-item_register")) {
          App.getModal('register').open();
        } else if (on.classList.contains("menu-item_logout")) {
          User.logout(null, (err, response) => {
            if (response.success === true) {
              App.setState('init');
            }
          })
        }
      })
    })
  }
}