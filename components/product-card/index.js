// components/product-card/index.js
export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data, onClick, onDelete) {
        const card = document.createElement("div");
        card.className = "product-card";
        card.setAttribute('data-id', data.id);
        card.innerHTML = `
            <img src="${data.src}" class="card-img-top" alt="${data.title}">
            <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.description}</p>
                <p class="card-games">Игр сыграно: ${data.games}</p>
                <div class="card-buttons">
                    <button class="btn btn-primary">Подробнее</button>
                    <button class="btn btn-danger">Удалить</button>
                </div>
            </div>
        `;
        
        card.querySelector(".btn-primary").addEventListener("click", () => {
            onClick(data.id);
        });
        
        card.querySelector(".btn-danger").addEventListener("click", () => {
            onDelete(data.id);
        });
        
        this.parent.appendChild(card);
    }
}