// pages/main/index.js
import { HeaderComponent } from "../../components/header/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product-page/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = this.getProducts();
    }

    getProducts() {
        const products = [
            {
                id: 1,
                src: "https://dnd.su/gallery/articles/88_3_1551514352.jpg",
                title: "Бард",
                description: "Плетёт магию из слов и музыки",
                games: 21
            },
            {
                id: 2,
                src: "https://dnd.su/gallery/articles/87_3_1551514499.jpg",
                title: "Варвар",
                description: "Необузданный, неугасимый и бездумный гнев",
                games: 19
            },
            {
                id: 3,
                src: "https://dnd.su/gallery/articles/91_1_1551515073.jpg",
                title: "Воин",
                description: "Мастерски владеют оружием, доспехами, и приёмами ведения боя.",
                games: 4
            },
            {
                id: 4,
                src: "https://dnd.su/gallery/articles/105_2_1551515339.jpg",
                title: "Волшебник",
                description: "Адепты высшей магии, объединяющиеся по типу своих заклинаний.",
                games: 44
            },
            {
                id: 5,
                src: "https://dnd.su/gallery/articles/90_1_1557350940.jpg",
                title: "Друид",
                description: "Воплощают незыблемость, приспособляемость и гнев природы.",
                games: 13
            },
            {
                id: 6,
                src: "https://dnd.su/gallery/articles/89_4_1633030922.jpg",
                title: "Жрец",
                description: "Посредники между миром смертных и далёкими мирами богов.",
                games: 3
            },
            {
                id: 7,
                src: "https://dnd.su/gallery/articles/90_1_1615203584.jpeg",
                title: "Дриуд",
                description: "Воплощают хрупкость, технологии и отвращение к природе.",
                games: 8
            },
            {
                id: 8,
                src: "https://dnd.su/gallery/articles/91_1_1602016494.jpg",
                title: "Ниво",
                description: "Плохо владеют оружием, доспехами, и приёмами ведения боя.",
                games: 4
            }
        ];
        return { data: products };
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" class="main-page">
                <div class="controls">
                    <button id="add-card-btn" class="control-btn">Добавить карточку</button>
                    
                    <div class="filter-control">
                        <label for="games-filter">Фильтр по играм:</label>
                        <select id="games-filter" class="form-control">
                            <option value="all">Все</option>
                            <option value="0-10">0-10 игр</option>
                            <option value="11-20">11-20 игр</option>
                            <option value="21-30">21-30 игр</option>
                            <option value="31+">31+ игр</option>
                        </select>
                    </div>
                </div>
                <div class="gallery"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent, () => {
            this.render();
        });
        header.render();
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        const gallery = this.pageRoot.querySelector('.gallery');
        
        this.data.data.forEach(item => {
            const card = new ProductCardComponent(gallery);
            card.render(item, this.onClickCard.bind(this), this.deleteCard.bind(this));
        });
        const addCardBtn = this.pageRoot.querySelector('#add-card-btn');
        addCardBtn.addEventListener('click', this.addCard.bind(this));
        
        const gamesFilter = this.pageRoot.querySelector('#games-filter');
        gamesFilter.addEventListener('change', (e) => {
            this.filterByGames(e.target.value);
        });
    }

    deleteCard(id) {
        this.data.data = this.data.data.filter(item => item.id !== id);
        const cardToRemove = 
        this.pageRoot.querySelector(`.product-card[data-id="${id}"]`);
        if (cardToRemove) {
            cardToRemove.remove();
        }
    }

    filterByGames(range) {
        const gallery = this.pageRoot.querySelector('.gallery');
        gallery.innerHTML = ''; 
        let filteredData = [];
        switch(range) {
            case '0-10':
                filteredData = this.data.data.filter(item => item.games >= 0 && item.games <= 10);
                break;
            case '11-20':
                filteredData = this.data.data.filter(item => item.games >= 11 && item.games <= 20);
                break;
            case '21-30':
                filteredData = this.data.data.filter(item => item.games >= 21 && item.games <= 30);
                break;
            case '31+':
                filteredData = this.data.data.filter(item => item.games >= 31);
                break;
            default:
                filteredData = [...this.data.data]; 
        }
        filteredData.forEach(item => {
            const card = new ProductCardComponent(gallery);
            card.render(item, this.onClickCard.bind(this), this.deleteCard.bind(this));
        });
    }
    addCard() {
        if (this.data.data.length === 0) return;
        const maxId = Math.max(...this.data.data.map(item => item.id));
        const newCardData = {
            ...this.data.data[0],
            id: maxId + 1 
        };
        this.data.data.push(newCardData);
        const gallery = this.pageRoot.querySelector('.gallery');
        const card = new ProductCardComponent(gallery);
        card.render
        (newCardData, this.onClickCard.bind(this), this.deleteCard.bind(this));
    }
    onClickCard(id) {
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }
}