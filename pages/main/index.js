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

    concatenate(arr, separator) {
        return arr.join(separator);
    }

    fillArray(count, value) {
        return Array(count).fill(value);
    }

    mergeAndSortArrays(...arrays) {
        const merged = [].concat(...arrays);
        
        const numbers = merged.filter(item => typeof item === 'number');
        
        const sorted = numbers.sort((a, b) => b - a);
        
        return sorted.join(' ');
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" class="main-page">
                <div class="controls">
                    <button id="add-card-btn" class="control-btn">Добавить карточку</button>
                    <button id="remove-card-btn" class="control-btn">Удалить карточку</button>
                    <button id="check-anagrams-btn" class="control-btn">Проверить анаграммы</button>
                </div>
                
                <div>
                    <h3>Функция Concatenate</h3>
                    <div class="form-group">
                        <label for="array-input">Введите элементы массива (каждый с новой строки):</label>
                        <textarea id="array-input" class="form-control" rows="4" placeholder="Я\nУчусь\nна\nлучшей\nкафедре"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="separator-input">Введите разделитель:</label>
                        <input type="text" id="separator-input" class="form-control" value=" " placeholder=" ">
                    </div>
                    <button id="run-concatenate-btn" class="btn control-btn">Выполнить concatenate</button>
                    <div class="concatenate-result mt-3"></div>
                </div>

                 <div>
                    <h3>Функция Fill Array</h3>
                    <div class="form-group">
                        <label for="fill-count">Количество элементов:</label>
                        <input type="number" id="fill-count" class="form-control" value="3" min="1">
                    </div>
                    <div class="form-group">
                        <label for="fill-value">Значение для заполнения:</label>
                        <input type="text" id="fill-value" class="form-control" value="a" placeholder="Введите значение">
                    </div>
                    <button id="run-fill-array-btn" class="btn control-btn">Создать массив</button>
                    <div class="fill-array-result mt-3"></div>
                </div>

                <div>
                    <h3>Объединение и сортировка массивов</h3>
                    <div class="form-group">
                        <label>Введите массивы чисел (каждый массив на новой строке, числа через запятую):</label>
                        <textarea id="arrays-input" class="form-control" rows="4" placeholder="1, 2, 3\n-1, -10, 20"></textarea>
                    </div>
                    <button id="run-merge-arrays-btn" class="btn control-btn">Объединить и отсортировать</button>
                    <div class="merge-arrays-result mt-3"></div>
                </div>
                
                <div class="gallery"></div>
                <div class="anagram-info"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        const header = new HeaderComponent(this.parent, () => {
            // Логика при клике на "Домой" (перезагрузка страницы)
            this.render();
        });
        header.render();
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        const gallery = this.pageRoot.querySelector('.gallery');
        
        this.data.data.forEach(item => {
            const card = new ProductCardComponent(gallery);
            card.render(item, this.onClickCard.bind(this));
        });
        
        const addCardBtn = this.pageRoot.querySelector('#add-card-btn');
        const removeCardBtn = this.pageRoot.querySelector('#remove-card-btn');
        const checkAnagramsBtn = this.pageRoot.querySelector('#check-anagrams-btn');
        const runConcatenateBtn = this.pageRoot.querySelector('#run-concatenate-btn');
        const runFillArrayBtn = this.pageRoot.querySelector('#run-fill-array-btn');
        const runMergeArraysBtn = this.pageRoot.querySelector('#run-merge-arrays-btn');
        
        addCardBtn.addEventListener('click', this.addCard.bind(this));
        removeCardBtn.addEventListener('click', this.removeCard.bind(this));
        checkAnagramsBtn.addEventListener('click', this.checkAnagrams.bind(this));
        runConcatenateBtn.addEventListener('click', this.executeConcatenate.bind(this));
        runFillArrayBtn.addEventListener('click', this.executeFillArray.bind(this));
        runMergeArraysBtn.addEventListener('click', this.executeMergeArrays.bind(this));
        
        const anagramGroupContainer = this.pageRoot.querySelector('.anagram-info');
        this.showAnagramGroups(anagramGroupContainer);
        

    }

    executeMergeArrays() {
        const arraysInput = this.pageRoot.querySelector('#arrays-input').value;
        
        if (!arraysInput.trim()) {
            this.showMergeArraysResult('Ошибка: введите хотя бы один массив', true);
            return;
        }
        
        try {
            const arrayStrings = arraysInput.split('\n').filter(line => line.trim() !== '');
            
            const arrays = arrayStrings.map(str => {
                return str.split(',')
                         .map(item => parseFloat(item.trim()))
                         .filter(item => !isNaN(item)); // Фильтруем только числа
            });
            
            if (arrays.length === 0) {
                this.showMergeArraysResult('Ошибка: не найдено корректных чисел', true);
                return;
            }
            const result = this.mergeAndSortArrays(...arrays);
            this.showMergeArraysResult(result, false, arrays);
        } catch (error) {
            this.showMergeArraysResult(`Ошибка: ${error.message}`, true);
        }
    }

    showMergeArraysResult(result, isError = false, inputArrays = []) {
        const resultContainer = this.pageRoot.querySelector('.merge-arrays-result');
        
        if (isError) {
            resultContainer.innerHTML = `
                <div class="form">
                    ${result}
                </div>
            `;
        } else {
            let arraysInfo = '';
            if (inputArrays.length > 0) {
                arraysInfo = `
                    <div class="form-control">
                        <strong>Входные массивы:</strong><br>
                        ${inputArrays.map((arr, i) => 
                            `Массив ${i+1}: [${arr.join(', ')}]`).join('<br>')}
                    </div>
                `;
            }
            
            resultContainer.innerHTML = `
                ${arraysInfo}
                <div class="form-control">
                    <strong>Результат:</strong> "${result}"
                </div>
                <div class="form-control">
                    <strong>Количество чисел:</strong> ${result.split(' ').length}
                </div>
            `;
        }
    }

    executeFillArray() {
        const countInput = parseInt(this.pageRoot.querySelector('#fill-count').value);
        const valueInput = this.pageRoot.querySelector('#fill-value').value;
        
        if (isNaN(countInput)) {
            this.showFillArrayResult('Ошибка: введите корректное число', true);
            return;
        }
        
        if (countInput < 1) {
            this.showFillArrayResult('Ошибка: количество должно быть больше 0', true);
            return;
        }
        
        const result = this.fillArray(countInput, valueInput);
        this.showFillArrayResult(result);
    }

    showFillArrayResult(result, isError = false) {
        const resultContainer = this.pageRoot.querySelector('.fill-array-result');
        
        if (isError) {
            resultContainer.innerHTML = `
                <div class="form-control">
                    ${result}
                </div>
            `;
        } else {
            resultContainer.innerHTML = `
                <div class="form-control">
                    <strong>Результат:</strong> [${result.map(item => `"${item}"`).join(', ')}]
                </div>
                <div class="form-control">
                    <strong>Длина массива:</strong> ${result.length} элементов
                </div>
            `;
        }
    }
    executeConcatenate() {
        const arrayInput = this.pageRoot.querySelector('#array-input').value;
        const separatorInput = this.pageRoot.querySelector('#separator-input').value;
        

        let array = arrayInput.split('\n')
                            .filter(item => item.trim() !== '');
        
        if (array.length === 0) {

            array = this.data.data.map(item => item.title);
            this.showConcatenateResult(
                this.concatenate(array, separatorInput), 
                false,
                true 
            );
        } else {
            const result = this.concatenate(array, separatorInput);
            this.showConcatenateResult(result);
        }
    }
    showConcatenateResult(result, isError = false, usedDefault = false) {
        const resultContainer = this.pageRoot.querySelector('.concatenate-result');
        
        if (isError) {
            resultContainer.innerHTML = `
                <div class="form-control">
                    ${result}
                </div>
            `;
        } else {
            let infoMessage = '';
            if (usedDefault) {
                infoMessage = `
                    <div class="form-control">
                        <strong>Информация:</strong> Использованы названия карточек, так как массив был пустым
                    </div>
                `;
            }
            
            resultContainer.innerHTML = `
                ${infoMessage}
                <div class="form-control">
                    <strong>Результат:</strong> "${result}"
                </div>
                <div class="form-control">
                    <strong>Длина строки:</strong> ${result.length} символов
                </div>
            `;
        }
    }


    addCard() {
        if (this.data.data.length > 0) {
            const newCardData = { ...this.data.data[0], id: this.data.data.length + 1 };
            this.data.data.push(newCardData);
            const gallery = this.pageRoot.querySelector('.gallery');
            const card = new ProductCardComponent(gallery);
            card.render(newCardData, this.onClickCard.bind(this));
        }
    }

    removeCard() {
        if (this.data.data.length > 1) {
            this.data.data.pop();
            const gallery = this.pageRoot.querySelector('.gallery');
            gallery.lastElementChild.remove();
        }
    }

    onClickCard(id) {
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }

    checkAnagrams() {
        const gallery = this.pageRoot.querySelector('.gallery');
        const cards = gallery.querySelectorAll('.product-card');
        
        this.data.data.forEach((item, index) => {
            const isAnagram = this.isAnagram(item.title);
            const card = cards[index];
            
            const existingBadge = card.querySelector('.anagram-badge');
            if (existingBadge) {
                existingBadge.remove();
            }
            
            if (isAnagram) {
                const badge = document.createElement('div');
                badge.className = 'anagram-badge';
                badge.innerHTML = '✓ Анаграмма';
                card.querySelector('.card-body').appendChild(badge);
            }
        });
        
        const anagramGroupContainer = this.pageRoot.querySelector('.anagram-info');
        this.showAnagramGroups(anagramGroupContainer);
    }

    showAnagramGroups(container) {
        const titles = this.data.data.map(product => product.title);
        const anagramGroups = this.findAnagrams(titles);
        container.innerHTML = '';
        if (anagramGroups.length > 0) {
            container.innerHTML = `<p>Группы анаграмм среди классов: ${anagramGroups.join('; ')}</p>`;
        } else {
            container.innerHTML = `<p>Группы анаграмм среди классов не найдены.</p>`;
        }
    }

    findAnagrams(words) {
        const anagrams = {};
        for (let word of words) {
            const sortedWord = word.toLowerCase().split('').sort().join('');
            if (!anagrams[sortedWord]) {
                anagrams[sortedWord] = [];
            }
            anagrams[sortedWord].push(word);
        }
        return Object.values(anagrams)
            .filter(group => group.length >= 2)
            .map(group => group.sort().join(', '))
            .sort();
    }

    isAnagram(title) {
        const sortedTitle = title.toLowerCase().split('').sort().join('');
        const anagrams = this.findAnagrams(this.data.data.map(product => product.title));
        return anagrams.some(group => group.split(', ').includes(title));
    }


}