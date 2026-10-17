document.addEventListener("DOMContentLoaded", function () {
    const products = [
        {
            category: "HYDRAULIC SYSTEM",
            title: "Hydraulic Parts & Components",
            desc: "Hydraulic pumps, cylinders, main valves, and custom seal kits for excavators.",
            image: "images/hydraulic.jpg",
            waText: "Halo CV SUKSES TRAKTOR PARTS, saya ingin bertanya mengenai Hydraulic Parts."
        },
        {
            category: "UNDERCARRIAGE SYSTEM",
            title: "Undercarriage Parts",
            desc: "Track rollers, sprockets, track chains, idlers, and shoes engineered for mining.",
            image: "images/undercarriage.jpg",
            waText: "Halo CV SUKSES TRAKTOR PARTS, saya ingin bertanya mengenai Undercarriage Parts."
        },
        {
            category: "ENGINE SYSTEM",
            title: "Engine Parts & Filters",
            desc: "Engine overhaul kits, liners, pistons, fuel injectors, and high efficiency filters.",
            image: "images/engine.jpg",
            waText: "Halo CV SUKSES TRAKTOR PARTS, saya ingin bertanya mengenai Engine Parts."
        },
        {
            category: "GENERAL COMPONENTS",
            title: "Pins, Bushings & General Components",
            desc: "Bucket pins, bushings, tooth adapters, and hardware built for heavy machinery durability.",
            image: "images/general.jpg",
            waText: "Halo CV SUKSES TRAKTOR PARTS, saya ingin bertanya mengenai General Components."
        }
    ];

    const productList = document.getElementById("productList");
    const searchInput = document.getElementById("searchInput");
    const categoryButtons = document.querySelectorAll(".cat-btn");

    function renderProducts(items) {
        if (!productList) return;
        productList.innerHTML = "";

        if (items.length === 0) {
            productList.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777;">Produk tidak ditemukan.</p>`;
            return;
        }

        items.forEach(item => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="product-image" onerror="this.onerror=null; this.src='images/gambar.jpg';">
                <div class="product-info">
                    <span class="product-category">${item.category}</span>
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <div class="card-actions">
                        <a href="https://wa.me/62895411041825?text=${encodeURIComponent(item.waText)}" target="_blank" rel="noopener" class="more-btn">INQUIRE NOW ↗</a>
                    </div>
                </div>
            `;
            productList.appendChild(card);
        });
    }

    renderProducts(products);

    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            const query = e.target.value.toLowerCase();
            const filtered = products.filter(p => 
                p.title.toLowerCase().includes(query) || 
                p.category.toLowerCase().includes(query) ||
                p.desc.toLowerCase().includes(query)
            );
            renderProducts(filtered);
        });
    }

    categoryButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            categoryButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            const category = this.getAttribute("data-category");
            if (category === "ALL") {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.category === category);
                renderProducts(filtered);
            }
        });
    });
});