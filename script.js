document.addEventListener("DOMContentLoaded", function () {
    const productsData = {
        "ALL": [
            {
                category: "HYDRAULIC SYSTEM",
                title: "Hydraulic Parts & Components",
                desc: "Hydraulic pumps, cylinders, main valves, and custom seal kits for excavators.",
                image: "images/hydraulic.jpg",
                fallbackImage: "images/hydraulic.png",
                catKey: "HYDRAULIC SYSTEM"
            },
            {
                category: "UNDERCARRIAGE SYSTEM",
                title: "Undercarriage Parts",
                desc: "Track rollers, sprockets, track chains, idlers, and shoes engineered for mining.",
                image: "images/undercarriage.jpg",
                fallbackImage: "images/undercarriage.png",
                catKey: "UNDERCARRIAGE SYSTEM"
            },
            {
                category: "ENGINE SYSTEM",
                title: "Engine Parts & Filters",
                desc: "Engine overhaul kits, liners, pistons, fuel injectors, and high efficiency filters.",
                image: "images/engine.jpg",
                fallbackImage: "images/engine.png",
                catKey: "ENGINE SYSTEM"
            },
            {
                category: "GENERAL COMPONENTS",
                title: "Pins, Bushings & General Components",
                desc: "Bucket pins, bushings, tooth adapters, and hardware built for heavy machinery durability.",
                image: "images/pin.jpg",
                fallbackImage: "images/pin.png",
                catKey: "GENERAL COMPONENTS"
            }
        ],
        "HYDRAULIC SYSTEM": {
            title: "Hydraulic Parts & Components",
            desc: "Hydraulic pumps, cylinders, main valves, and custom seal kits for excavators.",
            image: "images/hydraulic.jpg",
            fallbackImage: "images/hydraulic.png",
            items: [
                "Hydraulic Main Pump", "Control Valve",
                "Swing Motor", "Travel Motor",
                "Boom Cylinder", "Arm Cylinder",
                "Bucket Cylinder", "Main Seal Kit",
                "Pilot Valve Assembly", "Hydraulic Hose & Piping"
            ],
            waText: "Halo CV SUKSES TRAKTOR PARTS, saya ingin bertanya mengenai Hydraulic Parts & Components."
        },
        "UNDERCARRIAGE SYSTEM": {
            title: "Undercarriage Parts",
            desc: "Track rollers, sprockets, track chains, idlers, and shoes engineered for mining.",
            image: "images/undercarriage.jpg",
            fallbackImage: "images/undercarriage.png",
            items: [
                "Track Roller", "Carrier Roller",
                "Front Idler", "Sprocket",
                "Track Chain Link", "Track Shoe",
                "Recoil Spring", "Track Adjuster"
            ],
            waText: "Halo CV SUKSES TRAKTOR PARTS, saya ingin bertanya mengenai Undercarriage Parts."
        },
        "ENGINE SYSTEM": {
            title: "Engine Parts & Filters",
            desc: "Engine overhaul kits, liners, pistons, fuel injectors, and high efficiency filters.",
            image: "images/engine.jpg",
            fallbackImage: "images/engine.png",
            items: [
                "Engine Overhaul Kit", "Piston & Liner Set",
                "Fuel Injector", "Turbocharger",
                "Water Pump", "Oil & Fuel Filters",
                "Air Filter", "Gasket Kit"
            ],
            waText: "Halo CV SUKSES TRAKTOR PARTS, saya ingin bertanya mengenai Engine Parts & Filters."
        },
        "GENERAL COMPONENTS": {
            title: "Pins, Bushings & General Components",
            desc: "Bucket pins, bushings, tooth adapters, and hardware built for heavy machinery durability.",
            image: "images/pin.jpg",
            fallbackImage: "images/pin.png",
            items: [
                "Bucket Pin", "Bucket Bushing",
                "Tooth Adapter", "Bucket Teeth",
                "Side Cutter", "H-Link & Side Link",
                "Bolt & Nut High Strength", "Shim & O-Ring Set"
            ],
            waText: "Halo CV SUKSES TRAKTOR PARTS, saya ingin bertanya mengenai Pins, Bushings & General Components."
        }
    };

    const productList = document.getElementById("productList");
    const searchInput = document.getElementById("searchInput");
    const categoryButtons = document.querySelectorAll(".cat-btn");

    function renderView(categoryKey) {
        if (!productList) return;
        productList.innerHTML = "";

        // Update tombol tab aktif
        categoryButtons.forEach(btn => {
            if (btn.getAttribute("data-category") === categoryKey) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        if (categoryKey === "ALL") {
            // Tampilan Grid 4 Kotak
            productList.className = "product-list grid-mode";
            const cards = productsData["ALL"];
            cards.forEach(item => {
                const card = document.createElement("div");
                card.className = "product-card";
                card.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="product-image" onerror="this.onerror=null; this.src='${item.fallbackImage}'; this.onerror=function(){ this.src='images/gambar.png'; };">
                    <div class="product-info">
                        <span class="product-category">${item.category}</span>
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                        <div class="card-actions">
                            <button class="more-btn" data-category="${item.catKey}">MORE...</button>
                        </div>
                    </div>
                `;
                productList.appendChild(card);
            });

            // Event listener tombol MORE...
            const moreBtns = productList.querySelectorAll(".more-btn");
            moreBtns.forEach(btn => {
                btn.addEventListener("click", function () {
                    const targetCat = this.getAttribute("data-category");
                    renderView(targetCat);
                    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                });
            });

        } else {
            // Tampilan Detail Kategori Spesifik (Bullet List)
            productList.className = "product-list detail-mode";
            const detail = productsData[categoryKey];
            if (!detail) return;

            const listItemsHTML = detail.items.map(item => `<li><i class="fa-solid fa-circle-dot"></i> ${item}</li>`).join("");

            const detailCard = document.createElement("div");
            detailCard.className = "product-detail-card";
            detailCard.innerHTML = `
                <div class="detail-header">
                    <h2>${detail.title}</h2>
                    <p>${detail.desc}</p>
                </div>
                <div class="detail-content">
                    <div class="detail-list-container">
                        <ul class="detail-bullets">
                            ${listItemsHTML}
                        </ul>
                    </div>
                    <div class="detail-image-container">
                        <img src="${detail.image}" alt="${detail.title}" onerror="this.onerror=null; this.src='${detail.fallbackImage}'; this.onerror=function(){ this.src='images/gambar.png'; };">
                    </div>
                </div>
                <a href="https://wa.me/62895411041825?text=${encodeURIComponent(detail.waText)}" target="_blank" rel="noopener" class="detail-wa-btn">
                    INQUIRE ${categoryKey} VIA WHATSAPP ↗
                </a>
            `;
            productList.appendChild(detailCard);
        }
    }

    // Initial Render
    renderView("ALL");

    // Event Listener Filter Buttons
    categoryButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const cat = this.getAttribute("data-category");
            renderView(cat);
        });
    });

    // Search Handler
    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            const query = e.target.value.toLowerCase().trim();
            if (query === "") {
                renderView("ALL");
                return;
            }

            // Cari kategori yang cocok
            let matchedCat = null;
            Object.keys(productsData).forEach(key => {
                if (key === "ALL") return;
                const catData = productsData[key];
                const matchInItems = catData.items.some(i => i.toLowerCase().includes(query));
                if (key.toLowerCase().includes(query) || catData.title.toLowerCase().includes(query) || matchInItems) {
                    matchedCat = key;
                }
            });

            if (matchedCat) {
                renderView(matchedCat);
            }
        });
    }
});