// ==============================================================================
// CITYFLIX - Client Application Logic
// Enhanced with Indian Hubs, Dark/Light Mode, and Mobile/Tablet Responsiveness
// ==============================================================================

const GLOBAL_CITIES = [
    // --- Incredible India Metros & Cultural Hubs ---
    {
        name: "Mumbai",
        country: "India",
        category: "india",
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
        temp: "31°C",
        condition: "Coastal Breeze",
        desc: "The financial powerhouse of India and home of Bollywood, defined by Marine Drive, Victorian heritage, and unstoppable coastal energy."
    },
    {
        name: "Delhi",
        country: "India",
        category: "india",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
        temp: "29°C",
        condition: "Warm Haze",
        desc: "India's historic capital blending Mughal grandeur like the Red Fort and India Gate with the bustling political and cultural heartbeat of the nation."
    },
    {
        name: "Ghaziabad",
        country: "India",
        category: "india",
        image: "ghaziabad.jpg",
        temp: "29°C",
        condition: "Hazy Sun",
        desc: "Gateway of Uttar Pradesh in Delhi-NCR, powered by the cutting-edge Namo Bharat Rapid Rail (RRTS), Hindon civil enclave, and thriving industrial corridors."
    },
    {
        name: "Bengaluru",
        country: "India",
        category: "india",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
        temp: "24°C",
        condition: "Pleasant Breezes",
        desc: "The Silicon Valley of India and Garden City, boasting premier tech hubs, lush parks, innovative startups, and pleasant high-altitude weather."
    },
    {
        name: "Kolkata",
        country: "India",
        category: "india",
        image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80",
        temp: "30°C",
        condition: "Humid Sunshine",
        desc: "The City of Joy and cultural capital of India, adorned with colonial architecture, the magnificent Howrah Bridge, and rich literary heritage."
    },
    {
        name: "Chennai",
        country: "India",
        category: "india",
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
        temp: "32°C",
        condition: "Tropical Warmth",
        desc: "Gateway to South India renowned for Marina Beach, vibrant classical Carnatic arts, ancient Dravidian temples, and automotive industry."
    },
    {
        name: "Jaipur",
        country: "India",
        category: "india",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
        temp: "27°C",
        condition: "Sunny & Dry",
        desc: "The Pink City of Rajasthan, adorned with Hawa Mahal, Amber Palace, rich Rajputana folklore, and vibrant artisan bazaars."
    },
    {
        name: "Goa",
        country: "India",
        category: "india",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
        temp: "28°C",
        condition: "Sunny Coast",
        desc: "India's tropical coastal paradise celebrated for golden Arabian Sea beaches, Portuguese baroque churches, and vibrant susegad lifestyle."
    },
    {
        name: "Varanasi",
        country: "India",
        category: "india",
        image: "varanasi.jpg",
        temp: "28°C",
        condition: "Gentle Haze",
        desc: "One of the oldest continuously inhabited cities on Earth, featuring sacred Ganga ghats, devotional evening aartis, and profound spiritual roots."
    },

    // --- Global Metropolitan Capitals ---
    {
        name: "Barcelona",
        country: "Spain",
        category: "global",
        image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
        temp: "26°C",
        condition: "Clear Sky",
        desc: "Mediterranean jewel famous for Sagrada Familia, vibrant coastlines, and thriving culture."
    },
    {
        name: "Tokyo",
        country: "Japan",
        category: "global",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
        temp: "22°C",
        condition: "Partly Cloudy",
        desc: "The hyper-modern metropolis blending neon-lit skyscrapers with historic temples and culinary artistry."
    },
    {
        name: "New York",
        country: "United States",
        category: "global",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
        temp: "19°C",
        condition: "Breezy",
        desc: "The iconic global capital of finance, culture, and non-stop energy from Manhattan to Brooklyn."
    },
    {
        name: "London",
        country: "United Kingdom",
        category: "global",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
        temp: "16°C",
        condition: "Overcast",
        desc: "Historic Thames-side metropolis featuring royal landmarks, modern fintech, and global theater."
    },
    {
        name: "Paris",
        country: "France",
        category: "global",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
        temp: "18°C",
        condition: "Light Rain",
        desc: "The City of Light renowned for haute cuisine, art museums, fashion, and romantic boulevards."
    },
    {
        name: "Dubai",
        country: "United Arab Emirates",
        category: "global",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
        temp: "35°C",
        condition: "Sunny",
        desc: "Ultra-luxury oasis featuring record-breaking skyscrapers, desert dunes, and global shopping hubs."
    },
    {
        name: "Singapore",
        country: "Singapore",
        category: "global",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
        temp: "29°C",
        condition: "Scattered Clouds",
        desc: "The futuristic garden city known for Marina Bay, sustainable architecture, and culinary diversity."
    },
    {
        name: "Sydney",
        country: "Australia",
        category: "global",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
        temp: "21°C",
        condition: "Ocean Breeze",
        desc: "Australia's harbor city famed for the Opera House, Bondi Beach surf, and relaxed coastal sophistication."
    }
];

// App State
let activeCity = GLOBAL_CITIES[0]; // Defaults to Mumbai (first Indian hub)
let activeCategory = "all";
let chatHistory = [];
let pendingApproval = null;

// DOM Elements
const navbar = document.getElementById("navbar");
const heroBillboard = document.getElementById("hero");
const heroCityTitle = document.getElementById("heroCityTitle");
const heroWeatherBadge = document.getElementById("heroWeatherBadge");
const heroWeatherText = document.getElementById("heroWeatherText");
const heroRegionTag = document.getElementById("heroRegionTag");
const heroSynopsis = document.getElementById("heroSynopsis");
const heroAskBtn = document.getElementById("heroAskBtn");
const heroInfoBtn = document.getElementById("heroInfoBtn");

const trendingRowTitle = document.getElementById("trendingRowTitle");
const cityCategoryTabs = document.getElementById("cityCategoryTabs");
const citiesCarousel = document.getElementById("citiesCarousel");
const newsCarousel = document.getElementById("newsCarousel");
const weatherCarousel = document.getElementById("weatherCarousel");

const citiesCarouselPrev = document.getElementById("citiesCarouselPrev");
const citiesCarouselNext = document.getElementById("citiesCarouselNext");
const newsCarouselPrev = document.getElementById("newsCarouselPrev");
const newsCarouselNext = document.getElementById("newsCarouselNext");
const weatherCarouselPrev = document.getElementById("weatherCarouselPrev");
const weatherCarouselNext = document.getElementById("weatherCarouselNext");

const citySearchInput = document.getElementById("citySearchInput");
const apiStatusBadge = document.getElementById("apiStatusBadge");
const apiStatusText = document.getElementById("apiStatusText");
const themeToggleBtn = document.getElementById("themeToggleBtn");

const agentDrawer = document.getElementById("agentDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");
const openDrawerBtn = document.getElementById("openDrawerBtn");
const closeDrawerBtn = document.getElementById("closeDrawerBtn");
const drawerMessages = document.getElementById("drawerMessages");
const approvalContainer = document.getElementById("approvalContainer");
const agentChatForm = document.getElementById("agentChatForm");
const agentInput = document.getElementById("agentInput");

// Mobile Bottom Nav Elements
const mobNavHome = document.getElementById("mobNavHome");
const mobNavIndia = document.getElementById("mobNavIndia");
const mobNavHubs = document.getElementById("mobNavHubs");
const mobNavWeather = document.getElementById("mobNavWeather");
const mobNavTerminal = document.getElementById("mobNavTerminal");
const navIndia = document.getElementById("navIndia");

// ==============================================================================
// Initialization
// ==============================================================================
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    checkApiStatus();
    renderCitiesCarousel();
    setHeroCity(activeCity);
    fetchCityOverview(activeCity.name);
    setupEventListeners();
    setupCarouselNavButtons();
    setupCategoryTabs();
    setupMobileNav();
});

// Navbar scroll blur effect
window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ==============================================================================
// Dark / Light Mode System
// ==============================================================================
function initTheme() {
    const savedTheme = localStorage.getItem("cityflix_theme") || 
        (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    applyTheme(savedTheme);

    // Listen to OS theme changes if user hasn't explicitly set a custom theme in this session
    if (window.matchMedia) {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
            if (!localStorage.getItem("cityflix_theme_user_locked")) {
                applyTheme(e.matches ? "dark" : "light");
            }
        });
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("cityflix_theme", theme);

    const metaColor = document.getElementById("metaThemeColor");
    if (metaColor) {
        metaColor.setAttribute("content", theme === "light" ? "#f8fafc" : "#141414");
    }

    if (themeToggleBtn) {
        themeToggleBtn.setAttribute("aria-label", `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("cityflix_theme_user_locked", "true");
    applyTheme(newTheme);
}

// ==============================================================================
// API Status Checker
// ==============================================================================
async function checkApiStatus() {
    try {
        const res = await fetch("/api/status");
        const data = await res.json();
        if (data.ready) {
            if (apiStatusText) apiStatusText.textContent = "AI Agent Connected";
        } else {
            if (apiStatusText) apiStatusText.textContent = "Partial API Keys";
            if (apiStatusBadge) {
                apiStatusBadge.style.color = "#f59e0b";
                apiStatusBadge.style.borderColor = "rgba(245, 158, 11, 0.4)";
            }
        }
    } catch (e) {
        if (apiStatusText) apiStatusText.textContent = "Offline Mode";
    }
}

// ==============================================================================
// Hero Billboard & City Switching
// ==============================================================================
function setHeroCity(cityData) {
    activeCity = cityData;
    heroCityTitle.textContent = cityData.name;
    heroSynopsis.textContent = cityData.desc;
    heroWeatherText.textContent = `${cityData.temp} ${cityData.condition}`;
    heroBillboard.style.backgroundImage = `url('${cityData.image}')`;
    
    if (heroRegionTag) {
        if (cityData.category === "india" || cityData.country.toLowerCase() === "india") {
            heroRegionTag.textContent = "🇮🇳 INCREDIBLE INDIA";
            heroRegionTag.style.borderColor = "rgba(255, 153, 51, 0.6)";
            heroRegionTag.style.color = "var(--india-accent)";
        } else {
            heroRegionTag.textContent = `${cityData.country.toUpperCase()} HUB`;
            heroRegionTag.style.borderColor = "var(--border-light)";
            heroRegionTag.style.color = "var(--text-secondary)";
        }
    }
}

// ==============================================================================
// Category Tabs & Filtering
// ==============================================================================
function setupCategoryTabs() {
    if (!cityCategoryTabs) return;

    const tabs = cityCategoryTabs.querySelectorAll(".category-tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");

            activeCategory = tab.getAttribute("data-category");
            updateRowTitle();
            renderCitiesCarousel();
        });
    });
}

function updateRowTitle() {
    if (!trendingRowTitle) return;
    if (activeCategory === "india") {
        trendingRowTitle.textContent = "🇮🇳 Incredible India Hubs & Metros";
    } else if (activeCategory === "global") {
        trendingRowTitle.textContent = "🌍 Global Metros & World Capitals";
    } else {
        trendingRowTitle.textContent = "Featured Metropolitan Hubs";
    }
}

function selectCategoryFilter(category) {
    activeCategory = category;
    if (cityCategoryTabs) {
        const tabs = cityCategoryTabs.querySelectorAll(".category-tab");
        tabs.forEach(tab => {
            const match = tab.getAttribute("data-category") === category;
            tab.classList.toggle("active", match);
            tab.setAttribute("aria-selected", match ? "true" : "false");
        });
    }
    updateRowTitle();
    renderCitiesCarousel();
}

// ==============================================================================
// Carousel Rendering
// ==============================================================================
function renderCitiesCarousel() {
    citiesCarousel.innerHTML = "";

    const filtered = GLOBAL_CITIES.filter(city => {
        if (activeCategory === "all") return true;
        return city.category === activeCategory;
    });

    filtered.forEach(city => {
        const card = document.createElement("div");
        card.className = "city-card";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `Select ${city.name}, ${city.country}`);

        const isIndia = city.category === "india" || city.country.toLowerCase() === "india";
        const badgeHtml = isIndia 
            ? `<div class="city-card-badge-top india"><span>🇮🇳</span> India Special</div>`
            : `<div class="city-card-badge-top"><span>🌍</span> ${city.country}</div>`;

        card.innerHTML = `
            ${badgeHtml}
            <img src="${city.image}" alt="${city.name}" class="city-card-img" loading="lazy">
            <div class="city-card-overlay">
                <div class="city-card-name">${city.name}</div>
                <div class="city-card-country">${city.country}</div>
                <div class="city-card-stats">
                    <span class="card-temp-pill">${city.temp}</span>
                    <span>${city.condition}</span>
                </div>
            </div>
        `;

        const selectHandler = () => {
            setHeroCity(city);
            fetchCityOverview(city.name);
            window.scrollTo({ top: 0, behavior: "smooth" });
        };

        card.addEventListener("click", selectHandler);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectHandler();
            }
        });

        citiesCarousel.appendChild(card);
    });
}

// Fetch real-time weather & headlines for selected city
async function fetchCityOverview(cityName) {
    try {
        const res = await fetch(`/api/city-overview?city=${encodeURIComponent(cityName)}`);
        const data = await res.json();

        // Update hero weather with live data if available
        if (data.weather && !data.weather.startsWith("Error")) {
            const parts = data.weather.split(":");
            if (parts.length > 1) {
                heroWeatherText.textContent = parts[1].trim();
            }
        }

        renderWeatherSection(data.city, data.weather);
        renderNewsSection(data.city, data.news);
    } catch (err) {
        console.error("Overview fetch error:", err);
    }
}

function renderWeatherSection(city, weatherText) {
    weatherCarousel.innerHTML = `
        <div class="weather-card" tabindex="0" role="region" aria-label="Current Live Weather for ${city}">
            <div class="weather-header">
                <div class="weather-city">${city}</div>
                <div class="weather-condition">Satellite Telemetry</div>
            </div>
            <div class="weather-temp-huge">Live</div>
            <div style="font-size: 0.9rem; color: var(--text-secondary);">${weatherText}</div>
            <div class="weather-details-grid">
                <div>Source: OpenWeather</div>
                <div>Status: Real-time</div>
            </div>
        </div>
    `;

    // Also populate adjacent reference cards for comparison
    GLOBAL_CITIES.filter(c => c.name.toLowerCase() !== city.toLowerCase()).slice(0, 4).forEach(c => {
        const card = document.createElement("div");
        card.className = "weather-card";
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `Switch to ${c.name}`);
        card.innerHTML = `
            <div class="weather-header">
                <div class="weather-city">${c.name}</div>
                <div class="weather-condition">${c.condition}</div>
            </div>
            <div class="weather-temp-huge">${c.temp}</div>
            <div class="weather-details-grid">
                <div>Country: ${c.country}</div>
                <div>Region: Metro</div>
            </div>
        `;
        card.addEventListener("click", () => {
            setHeroCity(c);
            fetchCityOverview(c.name);
        });
        weatherCarousel.appendChild(card);
    });
}

function renderNewsSection(city, newsText) {
    newsCarousel.innerHTML = "";
    
    // Parse items from news text
    const lines = (newsText || "").split("\n\n").filter(b => b.trim().length > 0);
    
    if (lines.length === 0 || newsText.includes("No news found")) {
        newsCarousel.innerHTML = `
            <div class="news-card">
                <div class="news-card-badge">🔴 TAVILY RADAR</div>
                <div class="news-card-title">Live intelligence monitoring active for ${city}. Query the terminal agent for instant briefings.</div>
                <div class="news-card-footer">
                    <span>Verified Search</span>
                    <span>Just Now</span>
                </div>
            </div>
        `;
        return;
    }

    lines.forEach((block, idx) => {
        const card = document.createElement("div");
        card.className = "news-card";
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.innerHTML = `
            <div class="news-card-badge">🔴 TAVILY BREAKING #${idx + 1}</div>
            <div class="news-card-title">${escapeHtml(block.replace(/URL:.*$/m, ''))}</div>
            <div class="news-card-footer">
                <span>Cityflix Intelligence</span>
                <span style="color: #38bdf8; font-weight: 600;">Ask Agent &rarr;</span>
            </div>
        `;
        card.addEventListener("click", () => {
            openDrawer();
            sendUserMessage(`Tell me more about this recent news in ${city}: ${block.substring(0, 100)}`);
        });
        newsCarousel.appendChild(card);
    });
}

// ==============================================================================
// Carousel Navigation Controls
// ==============================================================================
function setupCarouselNavButtons() {
    const attachNav = (prevBtn, nextBtn, track) => {
        if (!prevBtn || !nextBtn || !track) return;
        const scrollAmount = 350;
        prevBtn.addEventListener("click", () => {
            track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });
        nextBtn.addEventListener("click", () => {
            track.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    };

    attachNav(citiesCarouselPrev, citiesCarouselNext, citiesCarousel);
    attachNav(newsCarouselPrev, newsCarouselNext, newsCarousel);
    attachNav(weatherCarouselPrev, weatherCarouselNext, weatherCarousel);
}

// ==============================================================================
// Mobile Bottom Nav Setup
// ==============================================================================
function setupMobileNav() {
    if (mobNavHome) {
        mobNavHome.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            updateActiveMobNav(mobNavHome);
        });
    }

    if (mobNavIndia) {
        mobNavIndia.addEventListener("click", (e) => {
            e.preventDefault();
            selectCategoryFilter("india");
            document.getElementById("trending-section")?.scrollIntoView({ behavior: "smooth" });
            updateActiveMobNav(mobNavIndia);
        });
    }

    if (mobNavHubs) {
        mobNavHubs.addEventListener("click", (e) => {
            e.preventDefault();
            selectCategoryFilter("all");
            document.getElementById("trending-section")?.scrollIntoView({ behavior: "smooth" });
            updateActiveMobNav(mobNavHubs);
        });
    }

    if (mobNavWeather) {
        mobNavWeather.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("weather-section")?.scrollIntoView({ behavior: "smooth" });
            updateActiveMobNav(mobNavWeather);
        });
    }

    if (mobNavTerminal) {
        mobNavTerminal.addEventListener("click", () => {
            openDrawer();
        });
    }

    // Top navbar "India Special" link
    if (navIndia) {
        navIndia.addEventListener("click", (e) => {
            e.preventDefault();
            selectCategoryFilter("india");
            document.getElementById("trending-section")?.scrollIntoView({ behavior: "smooth" });
        });
    }
}

function updateActiveMobNav(activeItem) {
    document.querySelectorAll(".mob-nav-item").forEach(item => item.classList.remove("active"));
    if (activeItem) activeItem.classList.add("active");
}

// ==============================================================================
// Drawer & Agent Chat Handlers
// ==============================================================================
function openDrawer() {
    agentDrawer.classList.add("open");
    drawerOverlay.classList.add("open");
    setTimeout(() => {
        agentInput.focus();
    }, 200);
}

function closeDrawer() {
    agentDrawer.classList.remove("open");
    drawerOverlay.classList.remove("open");
}

function setupEventListeners() {
    if (openDrawerBtn) openDrawerBtn.addEventListener("click", openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", toggleTheme);
    }

    if (heroAskBtn) {
        heroAskBtn.addEventListener("click", () => {
            openDrawer();
            sendUserMessage(`What is the current weather and top news in ${activeCity.name}?`);
        });
    }

    if (heroInfoBtn) {
        heroInfoBtn.addEventListener("click", () => {
            openDrawer();
            sendUserMessage(`Provide a comprehensive live intelligence briefing for ${activeCity.name}.`);
        });
    }

    // Search bar handler
    citySearchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const query = citySearchInput.value.trim();
            if (query) {
                // Find matching in existing catalog or create temporary card
                const existing = GLOBAL_CITIES.find(c => c.name.toLowerCase() === query.toLowerCase());
                if (existing) {
                    setHeroCity(existing);
                } else {
                    const isIndianQuery = /mumbai|delhi|ghaziabad|bengaluru|bangalore|hyderabad|chennai|kolkata|jaipur|pune|ahmedabad|varanasi|noida|gurugram|lucknow|chandigarh/i.test(query);
                    const newCity = {
                        name: query.charAt(0).toUpperCase() + query.slice(1),
                        country: isIndianQuery ? "India" : "Global",
                        category: isIndianQuery ? "india" : "global",
                        image: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80",
                        temp: "--",
                        condition: "Monitoring",
                        desc: `Real-time satellite and news telemetry active for ${query}.`
                    };
                    setHeroCity(newCity);
                }
                fetchCityOverview(query);
                citySearchInput.value = "";
                openDrawer();
                sendUserMessage(`What is the weather and top headlines in ${query}?`);
            }
        }
    });

    // Chat form submit
    agentChatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = agentInput.value.trim();
        if (text && !pendingApproval) {
            agentInput.value = "";
            sendUserMessage(text);
        }
    });

    // Close drawer on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && agentDrawer.classList.contains("open")) {
            closeDrawer();
        }
    });
}

// ==============================================================================
// Real-Time Chat & Human-in-the-Loop Logic
// ==============================================================================
function appendMessage(role, content) {
    const row = document.createElement("div");
    row.className = `msg-row ${role}`;
    
    const avatar = document.createElement("div");
    avatar.className = `msg-avatar ${role}`;
    avatar.textContent = role === "bot" ? "N" : "YOU";

    const bubble = document.createElement("div");
    bubble.className = "msg-bubble";
    bubble.innerHTML = formatMarkdown(content);

    row.appendChild(avatar);
    row.appendChild(bubble);
    drawerMessages.appendChild(row);
    drawerMessages.scrollTop = drawerMessages.scrollHeight;
}

function showTypingIndicator() {
    const id = "typing-" + Date.now();
    const row = document.createElement("div");
    row.className = "msg-row bot";
    row.id = id;
    row.innerHTML = `
        <div class="msg-avatar bot">N</div>
        <div class="msg-bubble">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    drawerMessages.appendChild(row);
    drawerMessages.scrollTop = drawerMessages.scrollHeight;
    return id;
}

function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

async function sendUserMessage(text) {
    appendMessage("user", text);
    const typingId = showTypingIndicator();

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonPayload({ message: text, history: chatHistory })
        });

        const data = await res.json();
        removeTypingIndicator(typingId);

        if (data.error) {
            appendMessage("bot", `⚠️ Error: ${data.error}`);
            return;
        }

        chatHistory = data.history || chatHistory;

        if (data.status === "approval_required") {
            // Display Human in the Loop approval card
            renderApprovalCards(data.tool_calls);
        } else if (data.status === "complete") {
            appendMessage("bot", data.content);
        }
    } catch (e) {
        removeTypingIndicator(typingId);
        appendMessage("bot", `⚠️ Connection failed: ${e.message}`);
    }
}

// Render Netflix-styled tool approval card
function renderApprovalCards(toolCalls) {
    if (!toolCalls || toolCalls.length === 0) return;
    
    // Lock input until decision is made
    agentInput.disabled = true;
    approvalContainer.innerHTML = "";

    toolCalls.forEach((tc) => {
        const card = document.createElement("div");
        card.className = "approval-card";
        card.innerHTML = `
            <div class="approval-title">
                <span>⚠️</span>
                <span>HUMAN-IN-THE-LOOP APPROVAL REQUIRED</span>
            </div>
            <div class="approval-details">
                <strong>Tool Request:</strong> <code>${tc.name}</code><br>
                <strong>Arguments:</strong> <code>${JSON.stringify(tc.args)}</code>
            </div>
            <div class="approval-actions">
                <button class="btn-approve" id="approve-${tc.id}">✅ Approve & Execute</button>
                <button class="btn-deny" id="deny-${tc.id}">❌ Deny Call</button>
            </div>
        `;

        approvalContainer.appendChild(card);

        document.getElementById(`approve-${tc.id}`).addEventListener("click", () => {
            handleApprovalDecision(tc, true);
        });

        document.getElementById(`deny-${tc.id}`).addEventListener("click", () => {
            handleApprovalDecision(tc, false);
        });
    });

    drawerMessages.scrollTop = drawerMessages.scrollHeight;
}

async function handleApprovalDecision(toolCall, approved) {
    approvalContainer.innerHTML = "";
    agentInput.disabled = false;

    // Show status in chat
    const notice = approved ? `Approved tool call: \`${toolCall.name}\`` : `Denied tool call: \`${toolCall.name}\``;
    appendMessage("bot", `<em>${notice}...</em>`);

    const typingId = showTypingIndicator();

    try {
        const res = await fetch("/api/approve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: jsonPayload({
                approved: approved,
                tool_call: toolCall,
                history: chatHistory
            })
        });

        const data = await res.json();
        removeTypingIndicator(typingId);

        if (data.error) {
            appendMessage("bot", `⚠️ Execution error: ${data.error}`);
            return;
        }

        chatHistory = data.history || chatHistory;

        // If tool was executed, show tool result box
        if (data.tool_result) {
            const toolBox = document.createElement("div");
            toolBox.className = "tool-result-box";
            toolBox.innerHTML = `<strong>🛠️ Output (${toolCall.name}):</strong><br>${escapeHtml(data.tool_result.substring(0, 300))}`;
            drawerMessages.appendChild(toolBox);
        }

        // If next tool call is requested
        if (data.status === "approval_required") {
            renderApprovalCards(data.tool_calls);
        } else if (data.status === "complete") {
            appendMessage("bot", data.content);
        }
    } catch (e) {
        removeTypingIndicator(typingId);
        appendMessage("bot", `⚠️ Tool execution error: ${e.message}`);
    }
}

// Helpers
function jsonPayload(obj) {
    return JSON.stringify(obj);
}

function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

function formatMarkdown(text) {
    if (!text) return "";
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
}
