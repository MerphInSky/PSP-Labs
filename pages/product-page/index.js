import { HeaderComponent } from "../../components/header/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, productId) {
        this.parent = parent;
        this.productId = productId;
        this.mainPage = new MainPage(this.parent);
    }

    getProducts() {
        const products = [
            {
                id: 1,
                src: "https://dnd.su/gallery/articles/88_3_1551514352.jpg",
                title: "Бард",
                description: "Неважно, кем является бард: учёным, скальдом или проходимцем; он плетёт магию из слов и музыки, вдохновляя союзников, деморализуя противников, манипулируя сознанием, создавая иллюзии, и даже исцеляя раны.",
                games: 21
            },
            {
                id: 2,
                src: "https://dnd.su/gallery/articles/87_3_1551514499.jpg",
                title: "Варвар",
                description: "Несмотря на разнообразие, всех варваров объединяет одно — их ярость. Необузданный, неугасимый и бездумный гнев. Не просто эмоция, их ярость как свирепость загнанного в угол хищника, как безжалостный удар урагана, как штормовые валы океана. Ярость некоторых из них проистекает из общения со свирепыми духами животных. Другие черпают её из злости на полную боли и страдания действительность. Но для каждого варвара ярость — это источник не только боевого безумия, но и невероятных рефлексов, стойкости, а также непревзойдённой силы.",
                games: 19
            },
            {
                id: 3,
                src: "https://dnd.su/gallery/articles/91_1_1551515073.jpg",
                title: "Воин",
                description: "Опытный гладиатор сражается на арене и хорошо знает, как использовать свои трезубец и сеть, чтобы опрокинуть противника и обойти его, вызывая ликование публики и получая тактическое преимущество. Меч его противника вспыхивает голубым светом и испускает сверкающую молнию. Все эти герои — воины. Представители, возможно, самого разнообразного класса в мире D&D. Странствующие рыцари, военачальники-завоеватели, королевские чемпионы, элитная пехота, бронированные наёмники и короли разбоя — будучи воинами, все они мастерски владеют оружием, доспехами, и приёмами ведения боя. А еще они хорошо знакомы со смертью — они несут её сами, и часто смотрят в её холодные глаза.",
                games: 4
            },
            {
                id: 4,
                src: "https://dnd.su/gallery/articles/105_2_1551515339.jpg",
                title: "Волшебник",
                description: "Волшебники — адепты высшей магии, объединяющиеся по типу своих заклинаний. Опираясь на тонкие плетения магии, пронизывающей вселенную, волшебники способны создавать заклинания взрывного огня, искрящихся молний, тонкого обмана и грубого контроля над сознанием. Их магия вызывает чудовищ с других планов бытия, предсказывает будущее и обращает поверженных врагов в зомби. Их самые могущественные заклинания могут превращать одно вещество в другое, вызывать метеориты с небес и открывать порталы в другие миры.",
                games: 44
            },
            {
                id: 5,
                src: "https://dnd.su/gallery/articles/90_1_1557350940.jpg",
                title: "Друид",
                description: "Призывая стихии или подражая животным, друиды воплощают незыблемость, приспособляемость и гнев природы. Они ни в коем случае не владыки природы — вместо этого друиды ощущают себя частью её неодолимой воли.",
                games: 13
            },
            {
                id: 6,
                src: "https://dnd.su/gallery/articles/89_4_1633030922.jpg",
                title: "Жрец",
                description: "Жрецы являются посредниками между миром смертных и далёкими мирами богов. Настолько же разные, насколько боги, которым они служат, жрецы воплощают работу своих божеств. В отличие от обычного проповедника, жрец наделён божественной магией.",
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
        return products;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page" class="container mt-3">
                <div class="card">
                    <div class="card-body product-details"></div>
                </div>
            </div>
        `;
    }

    render() {
        // Очищаем и создаем новую структуру
        this.parent.innerHTML = '';
        
        // Добавляем хедер первым элементом
        new HeaderComponent(this.parent, () => {
            this.goBack();
        }).render();
        
        // Добавляем основное содержимое
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        // Находим продукт по ID
        const product = this.getProducts().find(item => item.id === this.productId);
        const productDetailsContainer = this.pageRoot.querySelector('.product-details');
        
        if (product) {
            const isAnagram = this.mainPage.isAnagram(product.title);
            productDetailsContainer.innerHTML = `
                <img src="${product.src}" class="card-img-top mb-3" alt="${product.title}" style="max-height: 400px; object-fit: contain;">
                <h3 class="card-title">${product.title}</h3>
                <p class="card-text">${product.description}</p>
                <p class="text-muted">Игр сыграно: ${product.games}</p>
                ${isAnagram ? '<span class="badge bg-warning">Анаграмма</span>' : ''}
            `;
        } else {
            productDetailsContainer.innerHTML = `
                <div class="alert alert-danger">
                    Класс с ID ${this.productId} не найден
                </div>
            `;
        }


    }

    goBack() {
        new MainPage(this.parent).render();
    }
}