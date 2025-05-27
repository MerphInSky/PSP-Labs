import {CharacterComponent} from "../../components/character-card-enlarged/index.js"
import {BackButtonComponent} from "../../components/back-button/index.js"
import {MainPage} from "../main/index.js"
import { characterURLs } from "../../modules/characterURLs.js"

export class CharacterPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    get pageRoot() {
        return document.getElementById('character_page')
    }

    getHTML() {
        return (
            `
                <div id="character_page"></div>
            `
        )
    }

    async getData() {
        try{
        const response = await fetch(characterURLs.getCharacterById(this.id))
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const data = await response.json()
            this.renderData(data)
        } catch(e){
            console.error('Failed to get character data:', e)
        }
    }

    renderData(item) {
        const character = new CharacterComponent(this.pageRoot)
        character.render(item)
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        this.getData()
    }
}