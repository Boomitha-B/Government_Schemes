/**
 * Category Detail Page Logic
 * - Reads category from URL
 * - Filters schemes based on category
 */

const categoriesData = {
    education: {
        title: "Education & Scholarships",
        description: "Schemes supporting students, research, and institutional development."
    },
    health: {
        title: "Health & Family Welfare",
        description: "Insurance, maternal care, and immunization programs."
    },
    agriculture: {
        title: "Agriculture & Farming",
        description: "Support for farmers, crop insurance, and agricultural technology."
    },
    employment: {
        title: "Employment & Skill Development",
        description: "Job guarantees, vocational training, and startup support."
    }
};

const allSchemes = [
    {
        name: "PM-YUVA Yojana",
        cat: "education",
        benefit: "₹50,000 monthly grant",
        url: "pm-yuva-detail.html"
    },
    {
        name: "National Scholarship Portal",
        cat: "education",
        benefit: "Various Scholarships",
        url: "scholarship-detail.html"
    },
    {
        name: "Ayushman Bharat PM-JAY",
        cat: "health",
        benefit: "₹5 Lakh cover",
        url: "ayushman-detail.html"
    },
    {
        name: "Janani Suraksha Yojana",
        cat: "health",
        benefit: "Cash assistance for delivery",
        url: "janani-detail.html"
    },
    {
        name: "PM-Kisan Samman Nidhi",
        cat: "agriculture",
        benefit: "₹6,000 / year",
        url: "pm-kisan-detail.html"
    },
    {
        name: "PM Fasal Bima Yojana",
        cat: "agriculture",
        benefit: "Crop insurance",
        url: "crop-insurance-detail.html"
    },
    {
        name: "MGNREGA",
        cat: "employment",
        benefit: "100 days guaranteed work",
        url: "mgnrega-detail.html"
    }
];

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const catKey = urlParams.get('cat');

    if (catKey && categoriesData[catKey]) {
        document.getElementById('categoryTitle').textContent = categoriesData[catKey].title;
        document.getElementById('categoryDescription').textContent = categoriesData[catKey].description;

        const filtered = allSchemes.filter(s => s.cat === catKey);
        renderSchemes(filtered);
    } else {
        document.getElementById('categoryTitle').textContent = "All Categories";
        renderSchemes(allSchemes);
    }
}

function renderSchemes(schemes) {
    const grid = document.getElementById('categorySchemesGrid');
    grid.innerHTML = '';

    schemes.forEach(s => {
        const card = document.createElement('article');
        card.className = 'scheme-card';
        card.innerHTML = `
            <div class="card-header">
                <h3>${s.name}</h3>
            </div>
            <ul class="quick-eligibility">
                <li><strong>Benefit:</strong> ${s.benefit}</li>
            </ul>
            <div class="card-footer">
                <a href="${s.url}" class="btn btn-primary btn-sm">Read More</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

init();
