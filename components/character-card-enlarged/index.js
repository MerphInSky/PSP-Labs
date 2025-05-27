export class CharacterComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div class="card enlarged">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${data.src}" class="card_img_enlarged" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card_body">
                                <h5 class="card_title">${data.title}</h5>
                                <p class="card_text" style="max-width:90%;">${data.text}</p>
                                <p class="games_num">Количество игр: ${data.games}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}