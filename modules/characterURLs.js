class CharacterURLs {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getCharacters() {
        return `${this.baseUrl}/characters`;
    }

    getFilteredCharacters(filter) {
        return `${this.baseUrl}/characters?title=${filter}`;
    }

    getCharacterById(id) {
        return `${this.baseUrl}/characters/${id}`;
    }

    createCharacter() {
        return `${this.baseUrl}/characters`;
    }

    removeCharacterById(id) {
        return `${this.baseUrl}/characters/${id}`;
    }

    updateCharacterById(id) {
        return `${this.baseUrl}/characters/${id}`;
    }
}

export const characterURLs = new CharacterURLs();