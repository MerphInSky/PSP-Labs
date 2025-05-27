import {CharacterComponent} from "../../components/character-card-enlarged/index.js"
import {BackButtonComponent} from "../../components/back-button/index.js"
import {MainPage} from "../main/index.js"
import { characterURLs } from "../../modules/characterURLs.js"

export class RedactCharacterPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    get pageRoot() {
        return document.getElementById('redact_page')
    }

    async getData() {
        if(this.id==-1) this.renderData({
            src: "https://th.bing.com/th/id/R.c057941b609ab015ece7957ba4fc2908?rik=Mpv8DKgmmU%2bMxA&pid=ImgRaw&r=0",
            title: "Название класса",
            text: "Описание класса",
            games: 0
        })
        else try{const response = await fetch(characterURLs.getCharacterById(this.id))
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        this.renderData(data)
        } catch(e){
        console.error('Failed to get character data:', e)
        }
    }

    getHTML() {
        return (
            `
                <div id="redact_page"></div>
            `
        )
    }

    renderData(item) {
        const character = new CharacterComponent(this.pageRoot)
        character.render(item)
        document.getElementById("title_inp").value=item.title
        document.getElementById("src_inp").value=item.src
        document.getElementById("text_inp").value=item.te
        document.getElementById("games_inp").value=item.games
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const ui_html = `
                <div class="inp_form" style="width: 600px; margin: 10px">
                    <div class="line">
                        <p class="plain_text"> Название класса:  </p>
                        <input type="text" class="input" id="title_inp" placeholder="название" style="width: 250px">
                    </div>
                    <div class="line">
                        <p class="plain_text"> Ссылка на изображение:  </p>
                        <input type="url" class="input" id="src_inp" placeholder="ссылка" style="width: 250px">
                    </div>
                    <div class="line">
                        <p class="plain_text"> Описание класса:  </p>
                        <textarea class="input" id="text_inp" placeholder="описание" style="width: 250px"></textarea>
                    </div>
                    <div class="line">
                        <p class="plain_text"> Количество игр:  </p>
                        <input type="number" class="input" id="games_inp" placeholder="количество" min="0">
                    </div>
                    <button class="btn" id="save">Сохранить</button>
                    </div>
            `
        this.parent.insertAdjacentHTML('beforeend', ui_html)
    
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        const saveButton = document.getElementById("save")
        saveButton.addEventListener("click", this.saveData.bind(this))

        this.getData()
    }

    async saveData(){
        const titleInp = document.getElementById("title_inp")
        const srcInp = document.getElementById("src_inp")
        const textInp = document.getElementById("text_inp")
        const gamesInp = document.getElementById("games_inp")

        const data = {
            src: srcInp.value,
            title: titleInp.value,
            text: textInp.value,
            games: gamesInp.value==""? 0 : gamesInp.value
        }

        if(this.id == -1) try{
            const response = await fetch(characterURLs.getCharacters())
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const json = await response.json()
            const new_index = json.length>0? json[json.length-1].id+1 : 1
            const response_post = await fetch(characterURLs.createCharacter(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: new_index, ...data})
            });
            if (!response_post.ok) {
                throw new Error(`HTTP error! Status: ${response_post.status}`)
            }
            this.id = new_index
            this.render()
        } catch(e){
            console.error('Failed to add new character:', e)
        }
        else try{
            const response_patch = await fetch(characterURLs.updateCharacterById(this.id), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
            if (!response_patch.ok) {
                throw new Error(`HTTP error! Status: ${response_patch.status}`)
            }
            this.render()
        } catch(e){
            console.error('Failed to update character data:', e)
        }
    }
}