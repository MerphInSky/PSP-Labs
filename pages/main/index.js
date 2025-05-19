import { CharacterCardComponent } from "../../components/character-card/index.js";
import { CharacterPage } from "../character/index.js";
import { ajax } from "../../modules/ajax.js";
import { characterURLs } from "../../modules/characterURLs.js";
import { RedactCharacterPage } from "../redact/index.js";

export class MainPage {
    constructor(parent, model) {
        this.parent = parent
        this.min_filter = 0
        this.max_filter = 100000
        this.last_index = 4
        this.title_filter = ""
    }

    get pageRoot() {
        return document.getElementById('main_page')
    }

    getHTML() {
        return (
            `
                <div id="main_page" class="main_page">
                    <div class="inp_form">
                    <div style="display: flex; flex-direction: row; gap: 5px;">
                        <p class="plain_text"> Количество сыгранных игр: от </p>
                        <input type="number" class="input" id="min_num" placeholder="минимум" min="0">
                        <p class="plain_text"> до </p>
                        <input type="number" class="input" id="max_num" placeholder="максимум" min="0">
                    </div>
                    <div style="display: flex; flex-direction: row; gap: 5px;">
                        <p class="plain_text"> Поиск по названию класса:</p>
                        <input class="input" id="title_filter" placeholder="Введите название">
                        <button class="btn" id="new_card">Создать новый класс</button>
                    </div>
                    </div>
                    <div class="gallery"></div>
                </div>
            `
        )
    }

    getData() {
        if(!this.title_filter){
            ajax.get(characterURLs.getCharacters(), (data) => {
                this.renderData(data.filter((element)=>{return (element.games>=this.min_filter && element.games<=this.max_filter)}));
         })
        } else{
            ajax.get(characterURLs.getFilteredCharacters(this.title_filter), (data) => {
                this.renderData(data.filter((element)=>{return (element.games>=this.min_filter && element.games<=this.max_filter)}));
            })
        }
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const new_card_btn = document.getElementById("new_card")
        const inp_min = document.getElementById("min_num")
        const inp_max = document.getElementById("max_num")
        const inp_filter = document.getElementById("title_filter")

        inp_min.addEventListener("input", this.updateMin.bind(this))
        inp_max.addEventListener("input", this.updateMax.bind(this))
        new_card_btn.addEventListener('click', this.addCard.bind(this))
        inp_filter.addEventListener("input", this.searchName.bind(this))

        this.getData()
    }

    renderData(items) {
        this.pageRoot.querySelector('.gallery').innerHTML = ""
        items.forEach((item) => {
            const characterCard = new CharacterCardComponent(this.pageRoot.querySelector('.gallery'))
            characterCard.render(item, this.openCard.bind(this), this.removeCard.bind(this), this.redactWindow.bind(this))
        })
    }

    updateMin(e){
        this.min_filter = parseInt(e.target.value)
        if(e.target.value=="") this.min_filter = 0
        this.getData()
    }

    updateMax(e){
        this.max_filter = parseInt(e.target.value)
        if(e.target.value=="") this.max_filter = 100
        this.getData()
    }

    searchName(e){
        this.title_filter = e.target.value
        this.getData()
    }

    openCard(e) {
        const cardId = e.target.dataset.id
        const characterPage = new CharacterPage(this.parent, cardId)
        characterPage.render()
    }

    redactWindow(e){
        const cardId = e.target.dataset.id
        const redactCharacterPage = new RedactCharacterPage(this.parent, cardId)
        redactCharacterPage.render()
    }

    addCard(){
        const redactCharacterPage = new RedactCharacterPage(this.parent, -1)
        redactCharacterPage.render()
    }

    removeCard(e) {
        ajax.delete(characterURLs.removeCharacterById(e.target.dataset.id), () => {})
        e.target.parentNode.parentNode.parentNode.parentNode.remove()
    }
}