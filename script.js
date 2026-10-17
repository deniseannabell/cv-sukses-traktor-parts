document.addEventListener("DOMContentLoaded", function () {
    const products = [
        {
            category: "HYDRAULIC SYSTEM",
            title: "Hydraulic Parts & Components",
            desc: "Hydraulic pumps, cylinders, main valves, and custom seal kits for excavators.",
            image: "images/hydraulic.jpg",
            fallbackImage: "images/hydraulic.png",
            waText: "Halo CV SUKSES TRAKTOR PARTS, saya ingin bertanya mengenai Hydraulic Parts."
        },
        {
            category: "UNDERCARRIAGE SYSTEM",
            title: "Undercarriage Parts",
            desc: "Track rollers, sprockets, track chains, idlers, and shoes engineered for mining.",
            image: "images/undercarriage.jpg",
            fallbackImage: "images/undercarriage.png",
            waText: "Halo CV SUKSES TRAKTOR PARTS, saya ingin bertanya mengenai Undercarriage Parts."
        },
        {
            category: "ENGINE SYSTEM",
            title: "Engine Parts & Filters",
            desc: "Engine overhaul kits, liners, pistons, fuel injectors, and high efficiency filters.",
            image: "images/engine.jpg",
            fallbackImage: "images/engine.png",
            waText: "Halo CV SUKSES TRAKTOR PARTS, saya ingin bertanya mengenai Engine Parts."
        },
        {
            category: "GENERAL COMPONENTS",
            title: "Pins, Bushings & General Components",
            desc: "Bucket pins, bushings, tooth adapters, and hardware built for heavy machinery durability.",
            image: "images/pin.jpg",
            fallbackImage: "images/pin.png",
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
                <img src="${item.image}" alt="${item.title}" class="product-image" onerror="this.onerror=null; this.src='${item.fallbackImage}'; this.onerror=function(){ this.src='images/gambar.jpg'; };">
                <div class="product-info">
                    <span class="product-category">${item.category}</span>
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <div class="card-actions">
                        <button class="more-btn" data-category="${item.category}">MORE ↗</button>
                    </div>
                </div>
            `;
            productList.appendChild(card);
        });

        // Event listener untuk tombol MORE ↗ agar langsung filter ke kategori terkait
        const moreButtons = productList.querySelectorAll(".more-btn");
        moreButtons.forEach(btn => {
            btn.addEventListener("click", function () {
                const targetCategory = this.getAttribute("data-category");
                filterCategory(targetCategory);
                
                // Scroll halus ke bagian filter
                const productsSection = document.getElementById("products");
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: "smooth" });
                }
            });
        });
    }

    function filterCategory(categoryName) {
        // Update active class di tombol filter atas
        categoryButtons.forEach(b => {
            if (b.getAttribute("data-category") === categoryName) {
                b.classList.add("active");
            } else {
                b.classList.remove("active");
            }
        });

        // Filter daftar produk
        if (categoryName === "ALL") {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === categoryName);
            renderProducts(filtered);
        }
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
            const category = this.getAttribute("data-category");
            filterCategory(category);
        });
    });
});