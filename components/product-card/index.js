// components/product-card/index.js
export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(data, onClick) {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${data.src}" class="card-img-top" alt="${data.title}">
            <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.description}</p>
                <p class="card-games">Игр сыграно: ${data.games}</p>
                <button class="btn btn-primary">Подробнее</button>
            </div>
        `;
        
        card.querySelector(".btn-primary").addEventListener("click", () => {
            onClick(data.id);
        });
        
        this.parent.appendChild(card);
    }
}