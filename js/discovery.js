/**
 * Discovery Wizard Logic
 * - Filter-based matching engine (Static JSON)
 * - Zero PII storage
 */

const schemesData = [
    // Central Schemes
    {
        name: "PM-Kisan Samman Nidhi",
        state: "all",
        occ: "farmer",
        needs: ["finance"],
        cat: "Agriculture",
        url: "pm-kisan-detail.html",
        benefit: "₹6,000 / year"
    },
    {
        name: "Ayushman Bharat PM-JAY",
        state: "all",
        occ: "any",
        needs: ["health"],
        cat: "Health",
        url: "ayushman-detail.html",
        benefit: "₹5 Lakh cover"
    },
    {
        name: "Mission Indradhanush",
        state: "all",
        occ: "any",
        needs: ["health"],
        cat: "Health",
        url: "mission-indradhanush-detail.html",
        benefit: "Free full vaccination"
    },
    {
        name: "PM Mudra Yojana",
        state: "all",
        occ: "entrepreneur",
        needs: ["finance"],
        cat: "Finance",
        url: "mudra-detail.html",
        benefit: "Up to ₹10 Lakh loan"
    },
    {
        name: "Skill India Mission",
        state: "all",
        occ: "worker",
        needs: ["education"],
        cat: "Employment",
        url: "skill-india-detail.html",
        benefit: "Free certification & training"
    },
    {
        name: "National Scholarship Portal",
        state: "all",
        occ: "student",
        needs: ["education"],
        cat: "Education",
        url: "scholarship-detail.html",
        benefit: "Varies by scheme"
    },
    {
        name: "MGNREGA",
        state: "all",
        occ: "worker",
        needs: ["finance"],
        cat: "Employment",
        url: "mgnrega-detail.html",
        benefit: "100 days job guarantee"
    },

    // State Specific Schemes (Populated from state-detail logic)
    {
        name: "Kanya Sumangala Yojana",
        state: "up",
        occ: "any",
        needs: ["education", "finance"],
        cat: "Women & Child",
        url: "kanya-sumangala-detail.html",
        benefit: "₹15,000 grant"
    },
    {
        name: "Amma Vodi",
        state: "andhra",
        occ: "any",
        needs: ["education"],
        cat: "Education",
        url: "scholarship-detail.html",
        benefit: "₹15,000 for mothers"
    },
    {
        name: "Mukhyamantri Kanya Utthan",
        state: "bihar",
        occ: "any",
        needs: ["education", "finance"],
        cat: "Women",
        url: "placeholder-detail.html",
        benefit: "₹50,000 for graduation"
    },
    {
        name: "Ladli Scheme",
        state: "delhi",
        occ: "any",
        needs: ["education", "finance"],
        cat: "Women",
        url: "placeholder-detail.html",
        benefit: "Financial aid for girl child"
    },
    {
        name: "Vahli Dikri Yojana",
        state: "gujarat",
        occ: "any",
        needs: ["education", "finance"],
        cat: "Women",
        url: "placeholder-detail.html",
        benefit: "₹1.1 Lakh for daughter"
    },
    {
        name: "Gruha Lakshmi",
        state: "karnataka",
        occ: "any",
        needs: ["finance"],
        cat: "Women",
        url: "placeholder-detail.html",
        benefit: "₹2,000 monthly for women"
    },
    {
        name: "Karunya Health",
        state: "kerala",
        occ: "any",
        needs: ["health"],
        cat: "Health",
        url: "ayushman-detail.html",
        benefit: "Critical illness insurance"
    },
    {
        name: "Laadli Behna Yojana",
        state: "madhya",
        occ: "any",
        needs: ["finance"],
        cat: "Women",
        url: "placeholder-detail.html",
        benefit: "₹1,250 monthly grant"
    },
    {
        name: "Majhi Ladki Bahin",
        state: "maharashtra",
        occ: "any",
        needs: ["finance"],
        cat: "Women",
        url: "placeholder-detail.html",
        benefit: "₹1,500 monthly grant"
    },
    {
        name: "Pudhumai Penn",
        state: "tamil",
        occ: "student",
        needs: ["education"],
        cat: "Education",
        url: "scholarship-detail.html",
        benefit: "₹1,000 monthly for students"
    },
    {
        name: "Rythu Bandhu",
        state: "telangana",
        occ: "farmer",
        needs: ["finance"],
        cat: "Agriculture",
        url: "pm-kisan-detail.html",
        benefit: "₹10,000 per acre/year"
    },
    {
        name: "Kanyashree Prakalpa",
        state: "west",
        occ: "student",
        needs: ["education"],
        cat: "Education",
        url: "scholarship-detail.html",
        benefit: "Annual scholarship"
    }
];

document.getElementById('findSchemesBtn')?.addEventListener('click', () => {
    const state = document.getElementById('stateSelect').value;
    const occ = document.getElementById('occSelect').value;
    const selectedNeeds = Array.from(document.querySelectorAll('input[name="need"]:checked')).map(el => el.value);

    const matches = schemesData.filter(s => {
        const stateMatch = s.state === "all" || s.state === state;
        const occMatch = s.occ === "any" || s.occ === occ;
        const needMatch = selectedNeeds.length === 0 || selectedNeeds.some(n => s.needs.includes(n));
        return stateMatch && occMatch && needMatch;
    });

    // Sort: Specific matches first, then generic 'all' or 'any'
    matches.sort((a, b) => {
        if (a.state === state && b.state !== state) return -1;
        if (b.state === state && a.state !== state) return 1;
        if (a.occ === occ && b.occ !== occ) return -1;
        if (b.occ === occ && a.occ !== occ) return 1;
        return 0;
    });

    // Dynamic Header Updates
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsSubtitle = document.getElementById('resultsSubtitle');

    if (matches.length > 0) {
        resultsTitle.innerText = `${matches.length} Matching Schemes Found`;
        resultsSubtitle.innerText = `Showing results for ${state.charAt(0).toUpperCase() + state.slice(1)} residents in ${occ} category.`;
    }

    displayResults(matches);
});

function displayResults(matches) {
    const grid = document.getElementById('resultsGrid');
    const area = document.getElementById('resultsArea');
    grid.innerHTML = '';

    if (matches.length === 0) {
        grid.innerHTML = '<p class="text-center">No exact matches found. Try broadening your criteria.</p>';
    } else {
        matches.forEach(m => {
            const card = document.createElement('article');
            card.className = 'scheme-card';
            card.innerHTML = `
                <div class="card-header">
                    <span class="category-tag">${m.cat}</span>
                    <h3>${m.name}</h3>
                </div>
                <ul class="quick-eligibility">
                    <li><strong>Benefit:</strong> ${m.benefit}</li>
                </ul>
                <div class="card-footer">
                    <a href="${m.url}" class="btn btn-primary btn-sm">Read More</a>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    area.style.display = 'block';
    area.scrollIntoView({ behavior: 'smooth' });
}
