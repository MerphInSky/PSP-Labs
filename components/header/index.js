// components/header/index.js

/**
 * Компонент Header с кнопкой "Домой"
 */
export class HeaderComponent {
    /**
     * Конструктор класса HeaderComponent
     * @param {HTMLElement} parent - Родительский элемент для вставки
     * @param {Function} onHomeClick - Колбэк при клике на кнопку "Домой"
     */
    constructor(parent, onHomeClick) {
        this.parent = parent;
        this.onHomeClick = onHomeClick;
    }

    /**
     * Генерация HTML-разметки хедера
     * @returns {string} HTML-строка
     */
    getHTML() {
        return `
            <header class="header">
                <div class="header-content">
                    <h1 class="header-title">D&D Классы</h1>
                    <button id="home-button" class="home-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Домой
                    </button>
                </div>
            </header>
        `;
    }

    /**
     * Рендер компонента
     */
    render() {
        this.parent.insertAdjacentHTML('afterbegin', this.getHTML());
        
        // Навешиваем обработчик на кнопку
        const homeButton = this.parent.querySelector('#home-button');
        homeButton.addEventListener('click', this.onHomeClick);
    }
}