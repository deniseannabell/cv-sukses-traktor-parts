const whatsappNumber = "62895411041825";

const productsData = [
    {
        id: "P1",
        name: "Hydraulic Parts & Components",
        category: "HYDRAULIC SYSTEM",
        image: "images/hydraulic.jpeg",
        fallbackImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
        description: "Hydraulic pumps, cylinders, main valves, and custom seal kits for excavators.",
        items: [
            "Hydraulic Main Pump",
            "Control Valve",
            "Swing Motor",
            "Travel Motor",
            "Boom Cylinder",
            "Arm Cylinder",
            "Bucket Cylinder",
            "Main Seal Kit",
            "Pilot Valve Assembly",
            "Hydraulic Hose & Piping"
        ]
    },
    {
        id: "P2",
        name: "Undercarriage Parts",
        category: "UNDERCARRIAGE SYSTEM",
        image: "images/undercarriage.jpeg",
        fallbackImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80",
        description: "Track rollers, sprockets, track chains, idlers, and shoes engineered for mining.",
        items: [
            "Top Roller",
            "Bolt Track Shoe",
            "Sprocket Segment",
            "Track Roller",
            "Spring",
            "Kuku Bucket",
            "Track Link",
            "Track Shoe",
            "Swamp Track Shoe",
            "Bucket Adapters",
            "Idlers",
            "Cutting Edge"
        ]
    },
    {
        id: "P3",
        name: "Engine Parts & Filters",
        category: "ENGINE SYSTEM",
        image: "images/engine.jpeg",
        fallbackImage: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
        description: "Engine overhaul kits, liners, pistons, fuel injectors, and high-efficiency filters.",
        items: [
            "Overhaul Gasket Kit",
            "Piston & Piston Ring",
            "Cylinder Liner",
            "Fuel Injector Common Rail",
            "Turbocharger Assembly",
            "Water Pump & Oil Pump",
            "Crankshaft & Camshaft",
            "Oil Filter & Fuel Filter",
            "Air Cleaner Filter",
            "Engine Bearing Set"
        ]
    },
    {
        id: "P4",
        name: "Pins, Bushings & General Components",
        category: "GENERAL COMPONENTS",
        image: "images/pin.jpeg",
        fallbackImage: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=600&q=80",
        description: "Bucket pins, bushings, tooth adapters, and hardware built for heavy machinery durability.",
        items: [
            "Bucket Pin & Bushing",
            "Boom & Arm Pins",
            "Tooth Adapter",
            "Side Cutter",
            "Shim & Spacer",
            "Track Bolt & Nut",
            "O-Ring Kit & Oil Seal",
            "Grease Fitting & Pipe"
        ]
    }
];

let currentCategory = "ALL";
let currentSearch = "";

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".cat-btn");

function switchCategoryTab(targetCategory) {
    currentCategory = targetCategory;
    
    categoryButtons.forEach(btn => {
        if (btn.dataset.category === targetCategory) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    renderProducts();
    document.getElementById("products").scrollIntoView({ behavior: 'smooth' });
}

function renderProducts() {
    if (!productList) return;
    productList.innerHTML = "";

    const filtered = productsData.filter(item => {
        const matchCat = (currentCategory === "ALL") || (item.category === currentCategory);
        const matchSearch = item.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                            item.description.toLowerCase().includes(currentSearch.toLowerCase()) ||
                            item.category.toLowerCase().includes(currentSearch.toLowerCase()) ||
                            item.items.some(i => i.toLowerCase().includes(currentSearch.toLowerCase()));
        return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
        productList.innerHTML = `<p style="grid-column: 1/-1; color: #737779; font-size: 13px;">No spare parts found matching your criteria.</p>`;
        return;
    }

    if (currentCategory === "ALL") {
        productList.className = "product-list grid-mode";

        filtered.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image" onclick="switchCategoryTab('${product.category}')" loading="lazy" onerror="this.onerror=null; this.src='${product.fallbackImage}';">
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="card-actions">
                        <button class="more-btn" onclick="switchCategoryTab('${product.category}')">MORE...</button>
                    </div>
                </div>
            `;
            productList.appendChild(card);
        });

    } else {
        productList.className = "product-list";

        filtered.forEach(product => {
            const block = document.createElement("div");
            block.className = "category-block";

            let itemsHtml = "";
            product.items.forEach(item => {
                itemsHtml += `<div class="item-bullet">${item}</div>`;
            });

            const waMsg = encodeURIComponent(`Halo CV SUKSES TRAKTOR PARTS, saya ingin bertanya ketersediaan & harga produk kategori ${product.name}.`);

            block.innerHTML = `
                <div class="category-info-full">
                    <h3>${product.name}</h3>
                    <p class="category-desc">${product.description}</p>
                    <div class="category-items-grid">
                        ${itemsHtml}
                    </div>
                    <a href="https://wa.me/${whatsappNumber}?text=${waMsg}" target="_blank" rel="noopener" class="inquire-btn-wa">
                        INQUIRE ${product.name.toUpperCase()} VIA WHATSAPP ↗
                    </a>
                </div>
                <div class="category-image-box">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null; this.src='${product.fallbackImage}';">
                </div>
            `;

            productList.appendChild(block);
        });
    }
}

if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        currentSearch = e.target.value;
        renderProducts();
    });
}

categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        switchCategoryTab(btn.dataset.category);
    });
});

renderProducts();