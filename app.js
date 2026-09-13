// ==============================================================================
// CITYFLIX - Client Application Logic
// Enhanced with Section Focus & Translucency Mode, Mobile UX, and Indian Hubs
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
let activeCity = GLOBAL_CITIES[0]; // Mumbai
let activeCategory = "all";
let chatHistory = [];
let pendingApproval = null;
let currentFocusedSection = null;

const ALL_SECTIONS = ["hero", "trending-section", "top10-section", "news-section", "weather-section"];

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
const heroPrevBtn = document.getElementById("heroPrevBtn");
const heroNextBtn = document.getElementById("heroNextBtn");
const heroIndicators = document.getElementById("heroIndicators");
const heroRankPill = document.getElementById("heroRankPill");

const trendingRowTitle = document.getElementById("trendingRowTitle");
const cityCategoryTabs = document.getElementById("cityCategoryTabs");
const citiesCarousel = document.getElementById("citiesCarousel");
const top10Carousel = document.getElementById("top10Carousel");
const newsCarousel = document.getElementById("newsCarousel");
const weatherCarousel = document.getElementById("weatherCarousel");

const citiesCarouselPrev = document.getElementById("citiesCarouselPrev");
const citiesCarouselNext = document.getElementById("citiesCarouselNext");
const top10CarouselPrev = document.getElementById("top10CarouselPrev");
const top10CarouselNext = document.getElementById("top10CarouselNext");
const newsCarouselPrev = document.getElementById("newsCarouselPrev");
const newsCarouselNext = document.getElementById("newsCarouselNext");
const weatherCarouselPrev = document.getElementById("weatherCarouselPrev");
const weatherCarouselNext = document.getElementById("weatherCarouselNext");

// Hover Preview Card Elements
const hoverPreviewCard = document.getElementById("hoverPreviewCard");
const hoverCardImg = document.getElementById("hoverCardImg");
const hoverCardTopBadge = document.getElementById("hoverCardTopBadge");
const hoverCardTitle = document.getElementById("hoverCardTitle");
const hoverPlayBtn = document.getElementById("hoverPlayBtn");
const hoverTerminalBtn = document.getElementById("hoverTerminalBtn");
const hoverLikeBtn = document.getElementById("hoverLikeBtn");
const hoverMoreInfoBtn = document.getElementById("hoverMoreInfoBtn");
const hoverCardMatch = document.getElementById("hoverCardMatch");
const hoverCardCountry = document.getElementById("hoverCardCountry");
const hoverCardTemp = document.getElementById("hoverCardTemp");
const hoverCardTags = document.getElementById("hoverCardTags");

const citySearchInput = document.getElementById("citySearchInput");
const apiStatusBadge = document.getElementById("apiStatusBadge");
const apiStatusText = document.getElementById("apiStatusText");
const themeToggleBtn = document.getElementById("themeToggleBtn");

// Mobile Search Elements
const mobSearchBtn = document.getElementById("mobSearchBtn");
const mobSearchBar = document.getElementById("mobSearchBar");
const mobCitySearchInput = document.getElementById("mobCitySearchInput");
const mobSearchCloseBtn = document.getElementById("mobSearchCloseBtn");

// Focus & Translucency Elements
const focusResetBar = document.getElementById("focusResetBar");
const focusResetLabel = document.getElementById("focusResetLabel");
const focusResetBtn = document.getElementById("focusResetBtn");

// Agent Drawer Elements
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

// Hero Rotating Carousel List
const HERO_CITIES = [
    GLOBAL_CITIES[0], // Mumbai
    GLOBAL_CITIES[2], // Ghaziabad
    GLOBAL_CITIES[1], // Delhi
    GLOBAL_CITIES[8], // Varanasi
    GLOBAL_CITIES[3], // Bengaluru
    GLOBAL_CITIES[10], // Tokyo
    GLOBAL_CITIES[12], // London
    GLOBAL_CITIES[13], // Paris
    GLOBAL_CITIES[11], // New York
];

let heroCurrentIndex = 0;
let heroAutoTimer = null;
const HERO_INTERVAL_MS = 3000; // 3 seconds carousel duration as requested

// Hover Card State
let hoverShowTimer = null;
let hoverHideTimer = null;
let currentHoveredCity = null;

const CITY_TAGS_MAP = {
    "Mumbai": ["Financial Capital", "Coastal Skyline", "Bollywood Hub"],
    "Delhi": ["Capital Metropolis", "Mughal Heritage", "Political Heart"],
    "Ghaziabad": ["Rapid Rail RRTS", "Delhi-NCR Gateway", "Hindon Enclave"],
    "Bengaluru": ["Silicon Valley", "Garden City", "Startups"],
    "Kolkata": ["City of Joy", "Howrah Heritage", "Culture & Arts"],
    "Chennai": ["Marina Coast", "Carnatic Arts", "Auto Corridor"],
    "Jaipur": ["Pink City", "Rajputana Forts", "Royal Bazaars"],
    "Goa": ["Arabian Coast", "Portuguese Baroque", "Susegad Life"],
    "Varanasi": ["Sacred Ghats", "Ancient Ganga", "Spiritual Cradle"],
    "Tokyo": ["Futuristic Metro", "Neon Skylines", "Culinary Capital"],
    "London": ["Thames Heritage", "Royal History", "Global Finance"],
    "Paris": ["City of Light", "Haute Couture", "Art & Architecture"],
    "New York": ["Empire State", "Manhattan Energy", "Cultural Icon"],
    "Dubai": ["Futuristic Oasis", "Burj Khalifa", "Luxury Shopping"],
    "Singapore": ["Garden Metropolis", "Marina Bay", "Sustainability"],
    "Barcelona": ["Mediterranean Jewel", "Gaudi Heritage", "Coastal Charm"],
    "Sydney": ["Harbour City", "Opera House", "Coastal Surf"]
};

// ==============================================================================
// Initialization
// ==============================================================================
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    checkApiStatus();
    renderCitiesCarousel();
    renderTop10Carousel();
    setupHeroCarousel();
    setupHoverPreviewCard();
    setHeroCity(activeCity);
    fetchCityOverview(activeCity.name);
    setupEventListeners();
    setupCarouselNavButtons();
    setupCategoryTabs();
    setupMobileNav();
    setupNavigationFocus();
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
// Section Focus & Translucency Logic
// When a header link is clicked, the target section stays sharp while all other
// sections become softly blurred and translucent.
// ==============================================================================
function focusSection(targetId) {
    if (!targetId || targetId === "hero" || targetId === "all") {
        resetSectionFocus();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    currentFocusedSection = targetId;

    // Dim all other sections with smooth translucency
    ALL_SECTIONS.forEach(secId => {
        const el = document.getElementById(secId);
        if (!el) return;
        if (secId === targetId) {
            el.classList.add("section-focused");
            el.classList.remove("section-translucent");
        } else {
            el.classList.add("section-translucent");
            el.classList.remove("section-focused");
        }
    });

    // Update floating reset indicator
    if (focusResetBar) {
        if (focusResetLabel) {
            let sectionName = "Focused View";
            if (targetId === "weather-section") sectionName = "Weather Radar Active";
            else if (targetId === "news-section") sectionName = "Top Intelligence Active";
            else if (targetId === "top10-section") sectionName = "Top 10 India Active";
            else if (targetId === "trending-section") sectionName = "City Hubs Active";
            focusResetLabel.textContent = sectionName;
        }
        focusResetBar.classList.add("active");
    }

    // Smoothly scroll to the target section with fixed navbar offset
    const navHeight = navbar ? navbar.offsetHeight : 64;
    const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navHeight - 12;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

function resetSectionFocus() {
    currentFocusedSection = null;
    ALL_SECTIONS.forEach(secId => {
        const el = document.getElementById(secId);
        if (el) {
            el.classList.remove("section-translucent");
            el.classList.remove("section-focused");
        }
    });

    if (focusResetBar) {
        focusResetBar.classList.remove("active");
    }

    // Update active nav links
    document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
    const homeLink = document.getElementById("navHome");
    if (homeLink) homeLink.classList.add("active");
    updateActiveMobNav(mobNavHome);
}

function setupNavigationFocus() {
    // Top desktop navigation links
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            const targetSection = link.getAttribute("data-target-section");
            const filterClick = link.getAttribute("data-filter-click");

            if (filterClick) {
                selectCategoryFilter(filterClick);
            }

            if (targetSection === "hero") {
                resetSectionFocus();
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else if (targetSection) {
                focusSection(targetSection);
            }
        });
    });

    // Reset button in floating pill
    if (focusResetBtn) {
        focusResetBtn.addEventListener("click", () => {
            resetSectionFocus();
        });
    }

    // Allow clicking on any dimmed section to restore full view
    ALL_SECTIONS.forEach(secId => {
        const el = document.getElementById(secId);
        if (el) {
            el.addEventListener("click", (e) => {
                if (el.classList.contains("section-translucent")) {
                    focusSection(secId);
                }
            });
        }
    });
}

// ==============================================================================
// Dark / Light Mode System
// ==============================================================================
function initTheme() {
    const savedTheme = localStorage.getItem("cityflix_theme") || 
        (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    applyTheme(savedTheme);

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
// Hero Billboard & City Switching with Auto-Running Carousel
// ==============================================================================
function setHeroCity(cityData, updateSlide = true) {
    activeCity = cityData;
    if (heroCityTitle) heroCityTitle.textContent = cityData.name;
    if (heroSynopsis) heroSynopsis.textContent = cityData.desc;
    if (heroWeatherText) heroWeatherText.textContent = `${cityData.temp} ${cityData.condition}`;
    
    const heroSliderTrack = document.getElementById("heroSliderTrack");
    if (!heroSliderTrack && heroBillboard) {
        heroBillboard.style.backgroundImage = `url('${cityData.image}')`;
    }
    
    if (heroRegionTag) {
        if (cityData.category === "india" || (cityData.country && cityData.country.toLowerCase() === "india")) {
            heroRegionTag.textContent = "🇮🇳 INCREDIBLE INDIA";
            heroRegionTag.style.borderColor = "rgba(255, 153, 51, 0.6)";
            heroRegionTag.style.color = "var(--india-accent)";
        } else {
            heroRegionTag.textContent = `${(cityData.country || 'GLOBAL').toUpperCase()} HUB`;
            heroRegionTag.style.borderColor = "var(--border-light)";
            heroRegionTag.style.color = "var(--text-secondary)";
        }
    }

    const heroRankSubtextEl = document.getElementById("heroRankSubtext") || heroRankPill;
    const heroIdx = HERO_CITIES.findIndex(c => c.name.toLowerCase() === cityData.name.toLowerCase());
    if (heroIdx !== -1) {
        heroCurrentIndex = heroIdx;
        if (heroRankSubtextEl) heroRankSubtextEl.textContent = `#${heroIdx + 1} in Trending Hubs`;
        if (updateSlide) {
            goToHeroSlide(heroIdx, false);
        }
    } else {
        if (heroRankSubtextEl) heroRankSubtextEl.textContent = `Featured Hub`;
        if (heroSliderTrack) {
            const curSlide = heroSliderTrack.children[heroCurrentIndex];
            if (curSlide) curSlide.style.backgroundImage = `url('${cityData.image}')`;
        }
    }
}

function setupHeroCarousel() {
    // Populate sliding background track for ultra smooth 60fps GPU slide transition
    const heroSliderTrack = document.getElementById("heroSliderTrack");
    if (heroSliderTrack) {
        heroSliderTrack.innerHTML = "";
        HERO_CITIES.forEach((city) => {
            const slide = document.createElement("div");
            slide.className = "hero-slide";
            slide.style.backgroundImage = `url('${city.image}')`;
            heroSliderTrack.appendChild(slide);
        });
    }

    if (!heroIndicators) return;

    // Populate segmented indicator dashes with inner white-to-red progress fill
    heroIndicators.innerHTML = "";
    HERO_CITIES.forEach((city, idx) => {
        const dash = document.createElement("div");
        dash.className = `hero-indicator-dash ${idx === 0 ? "active" : ""}`;
        dash.setAttribute("data-index", idx);
        dash.setAttribute("role", "button");
        dash.setAttribute("tabindex", "0");
        dash.setAttribute("aria-label", `Switch hero slide to ${city.name}`);

        const fill = document.createElement("div");
        fill.className = "hero-indicator-fill";
        dash.appendChild(fill);

        dash.addEventListener("click", () => {
            goToHeroSlide(idx, true);
        });

        heroIndicators.appendChild(dash);
    });

    if (heroPrevBtn) {
        heroPrevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const prevIdx = (heroCurrentIndex - 1 + HERO_CITIES.length) % HERO_CITIES.length;
            goToHeroSlide(prevIdx, true);
        });
    }

    if (heroNextBtn) {
        heroNextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const nextIdx = (heroCurrentIndex + 1) % HERO_CITIES.length;
            goToHeroSlide(nextIdx, true);
        });
    }

    // Touch swipe support on mobile devices
    const heroEl = document.getElementById("hero");
    if (heroEl) {
        let touchStartX = 0;
        heroEl.addEventListener("touchstart", (e) => {
            if (e.touches && e.touches.length > 0) touchStartX = e.touches[0].clientX;
        }, { passive: true });
        heroEl.addEventListener("touchend", (e) => {
            if (e.changedTouches && e.changedTouches.length > 0) {
                const diffX = touchStartX - e.changedTouches[0].clientX;
                if (Math.abs(diffX) > 40) {
                    if (diffX > 0) {
                        goToHeroSlide((heroCurrentIndex + 1) % HERO_CITIES.length, true);
                    } else {
                        goToHeroSlide((heroCurrentIndex - 1 + HERO_CITIES.length) % HERO_CITIES.length, true);
                    }
                }
            }
        }, { passive: true });
    }

    // Pause on hover over framed billboard
    const outerFrame = document.querySelector(".hero-outer-frame") || heroBillboard;
    if (outerFrame) {
        outerFrame.addEventListener("mouseenter", pauseHeroTimer);
        outerFrame.addEventListener("mouseleave", resumeHeroTimer);
    }

    // Initialize slide 0 and start timer
    goToHeroSlide(0, false);
    startHeroTimer();
}

function updateHeroIndicators(idx, animate = true) {
    if (!heroIndicators) return;
    const dashes = heroIndicators.querySelectorAll(".hero-indicator-dash");
    dashes.forEach((d, i) => {
        const fill = d.querySelector(".hero-indicator-fill");
        d.classList.remove("active", "completed");
        
        if (fill) {
            fill.style.animation = "none";
            void fill.offsetWidth; // Force reflow to cleanly restart CSS keyframe animation
        }

        if (i < idx) {
            d.classList.add("completed");
            if (fill) {
                fill.style.width = "100%";
            }
        } else if (i === idx) {
            d.classList.add("active");
            if (fill) {
                fill.style.width = "0%";
                if (animate) {
                    fill.style.animation = `heroProgressFill ${HERO_INTERVAL_MS}ms linear forwards`;
                }
            }
        } else {
            if (fill) {
                fill.style.width = "0%";
            }
        }
    });
}

function goToHeroSlide(index, manualTrigger = false) {
    heroCurrentIndex = (index + HERO_CITIES.length) % HERO_CITIES.length;
    const targetCity = HERO_CITIES[heroCurrentIndex];

    // Hardware accelerated smooth sliding of background track
    const heroSliderTrack = document.getElementById("heroSliderTrack");
    if (heroSliderTrack) {
        heroSliderTrack.style.transform = `translateX(-${heroCurrentIndex * 100}%)`;
    }

    // Text reveal transition
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
        heroContent.classList.remove("slide-transition");
        void heroContent.offsetWidth;
        heroContent.classList.add("slide-transition");
    }

    setHeroCity(targetCity, false);
    updateHeroIndicators(heroCurrentIndex, true);

    if (manualTrigger) {
        startHeroTimer();
    }
}

function startHeroTimer() {
    pauseHeroTimer();
    heroAutoTimer = setInterval(() => {
        const nextIdx = (heroCurrentIndex + 1) % HERO_CITIES.length;
        goToHeroSlide(nextIdx, false);
    }, HERO_INTERVAL_MS);
}

function pauseHeroTimer() {
    if (heroAutoTimer) {
        clearInterval(heroAutoTimer);
        heroAutoTimer = null;
    }
}

function resumeHeroTimer() {
    startHeroTimer();
    if (heroIndicators) {
        const activeDash = heroIndicators.querySelector(".hero-indicator-dash.active .hero-indicator-fill");
        if (activeDash) {
            activeDash.style.animation = "none";
            void activeDash.offsetWidth;
            activeDash.style.animation = `heroProgressFill ${HERO_INTERVAL_MS}ms linear forwards`;
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
    if (!citiesCarousel) return;
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
        card.setAttribute("data-city-name", city.name);

        const isIndia = city.category === "india" || (city.country && city.country.toLowerCase() === "india");
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
                <div class="card-hover-actions">
                    <button class="card-hover-btn play" title="Feature in Hero" aria-label="Feature ${city.name}">
                        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                    <button class="card-hover-btn circle" title="Ask Agent" aria-label="Ask Agent about ${city.name}">
                        <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    </button>
                    <span class="card-hover-match">99% MATCH</span>
                </div>
            </div>
        `;

        const selectHandler = () => {
            setHeroCity(city);
            fetchCityOverview(city.name);
            resetSectionFocus();
            window.scrollTo({ top: 0, behavior: "smooth" });
        };

        const playBtn = card.querySelector(".card-hover-btn.play");
        if (playBtn) {
            playBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                selectHandler();
            });
        }

        const terminalBtn = card.querySelector(".card-hover-btn.circle");
        if (terminalBtn) {
            terminalBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                openDrawer();
                sendUserMessage(`What is the current weather and top news in ${city.name}?`);
            });
        }

        card.addEventListener("click", selectHandler);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectHandler();
            }
        });

        attachCardHoverListener(card, city, false);

        citiesCarousel.appendChild(card);
    });
}

// ==============================================================================
// Netflix Signature "Top 10 Cities in India Today" Carousel
// ==============================================================================
function renderTop10Carousel() {
    if (!top10Carousel) return;
    top10Carousel.innerHTML = "";

    const indianCities = GLOBAL_CITIES.filter(c => c.category === "india" || (c.country && c.country.toLowerCase() === "india"));

    indianCities.forEach((city, idx) => {
        const rank = idx + 1;
        const card = document.createElement("div");
        card.className = "top10-card";
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `Rank #${rank}: ${city.name}, India`);
        card.setAttribute("data-city-name", city.name);

        card.innerHTML = `
            <div class="top10-rank">${rank}</div>
            <div class="top10-poster-wrap">
                <div class="top10-badge-red">TOP 10</div>
                <img src="${city.image}" alt="${city.name}" class="top10-poster-img" loading="lazy">
                <div class="top10-poster-overlay">
                    <div class="top10-city-name">${city.name}</div>
                    <div class="top10-status-pill">${city.temp} • ${city.condition}</div>
                    <div class="card-hover-actions">
                        <button class="card-hover-btn play" title="Feature in Hero" aria-label="Feature ${city.name}">
                            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </button>
                        <button class="card-hover-btn circle" title="Ask Agent" aria-label="Ask Agent about ${city.name}">
                            <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                        </button>
                        <span class="card-hover-match">99% MATCH</span>
                    </div>
                </div>
            </div>
        `;

        const selectHandler = () => {
            setHeroCity(city);
            fetchCityOverview(city.name);
            resetSectionFocus();
            window.scrollTo({ top: 0, behavior: "smooth" });
        };

        const playBtn = card.querySelector(".card-hover-btn.play");
        if (playBtn) {
            playBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                selectHandler();
            });
        }

        const terminalBtn = card.querySelector(".card-hover-btn.circle");
        if (terminalBtn) {
            terminalBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                openDrawer();
                sendUserMessage(`What is the current weather and top news in ${city.name}?`);
            });
        }

        card.addEventListener("click", selectHandler);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectHandler();
            }
        });

        attachCardHoverListener(card, city, true);

        top10Carousel.appendChild(card);
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
    const isError = !weatherText || weatherText.startsWith("Error");
    const displayWeather = isError ? "Telemetry Syncing (OpenWeather Sensor Active)" : weatherText;

    weatherCarousel.innerHTML = `
        <div class="weather-card" tabindex="0" role="region" aria-label="Current Live Weather for ${city}">
            <div class="weather-header">
                <div class="weather-city">${city}</div>
                <div class="weather-condition">Satellite Telemetry</div>
            </div>
            <div class="weather-temp-huge">Live</div>
            <div style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.4;">${displayWeather}</div>
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
    const isError = !newsText || newsText.startsWith("Error fetching news") || newsText.includes("No news found");
    const lines = isError ? [] : newsText.split("\n\n").filter(b => b.trim().length > 0);
    
    if (lines.length === 0) {
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
    attachNav(top10CarouselPrev, top10CarouselNext, top10Carousel);
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
            resetSectionFocus();
            window.scrollTo({ top: 0, behavior: "smooth" });
            updateActiveMobNav(mobNavHome);
        });
    }

    if (mobNavIndia) {
        mobNavIndia.addEventListener("click", (e) => {
            e.preventDefault();
            selectCategoryFilter("india");
            focusSection("trending-section");
            updateActiveMobNav(mobNavIndia);
        });
    }

    if (mobNavHubs) {
        mobNavHubs.addEventListener("click", (e) => {
            e.preventDefault();
            selectCategoryFilter("all");
            focusSection("trending-section");
            updateActiveMobNav(mobNavHubs);
        });
    }

    if (mobNavWeather) {
        mobNavWeather.addEventListener("click", (e) => {
            e.preventDefault();
            focusSection("weather-section");
            updateActiveMobNav(mobNavWeather);
        });
    }

    if (mobNavTerminal) {
        mobNavTerminal.addEventListener("click", () => {
            openDrawer();
        });
    }
}

function updateActiveMobNav(activeItem) {
    document.querySelectorAll(".mob-nav-item").forEach(item => item.classList.remove("active"));
    if (activeItem) activeItem.classList.add("active");
}

// ==============================================================================
// Search Handler (Shared between Desktop & Mobile)
// ==============================================================================
function handleCitySearch(query) {
    if (!query) return;
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
    resetSectionFocus();
    openDrawer();
    sendUserMessage(`What is the weather and top headlines in ${query}?`);
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

    // Desktop search bar handler
    if (citySearchInput) {
        citySearchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const query = citySearchInput.value.trim();
                citySearchInput.value = "";
                handleCitySearch(query);
            }
        });
    }

    // Mobile search icon toggle
    if (mobSearchBtn && mobSearchBar) {
        mobSearchBtn.addEventListener("click", () => {
            mobSearchBar.classList.toggle("open");
            if (mobSearchBar.classList.contains("open")) {
                mobCitySearchInput?.focus();
            }
        });
    }

    if (mobSearchCloseBtn && mobSearchBar) {
        mobSearchCloseBtn.addEventListener("click", () => {
            mobSearchBar.classList.remove("open");
        });
    }

    if (mobCitySearchInput) {
        mobCitySearchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const query = mobCitySearchInput.value.trim();
                mobCitySearchInput.value = "";
                mobSearchBar?.classList.remove("open");
                handleCitySearch(query);
            }
        });
    }

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
        if (e.key === "Escape") {
            if (agentDrawer.classList.contains("open")) closeDrawer();
            if (mobSearchBar?.classList.contains("open")) mobSearchBar.classList.remove("open");
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

        if (data.tool_result) {
            const toolBox = document.createElement("div");
            toolBox.className = "tool-result-box";
            toolBox.innerHTML = `<strong>🛠️ Output (${toolCall.name}):</strong><br>${escapeHtml(data.tool_result.substring(0, 300))}`;
            drawerMessages.appendChild(toolBox);
        }

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

// ==============================================================================
// Netflix Upmarket Hover Preview Card Controller
// ==============================================================================
function getCityTags(cityName) {
    if (CITY_TAGS_MAP[cityName]) {
        return CITY_TAGS_MAP[cityName];
    }
    return ["Metropolitan Hub", "Live Telemetry", "Culture & Buzz"];
}

function setupHoverPreviewCard() {
    if (!hoverPreviewCard) return;

    // Feature / Play Button (White circle ▶)
    if (hoverPlayBtn) {
        hoverPlayBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (currentHoveredCity) {
                setHeroCity(currentHoveredCity);
                fetchCityOverview(currentHoveredCity.name);
                resetSectionFocus();
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
            hideHoverCard(true);
        });
    }

    // Terminal Quick Prompt Button (+ circle)
    if (hoverTerminalBtn) {
        hoverTerminalBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (currentHoveredCity) {
                openDrawer();
                sendUserMessage(`What is the current weather and top news in ${currentHoveredCity.name}?`);
            }
            hideHoverCard(true);
        });
    }

    // Bookmark / Like Button (Thumbs up)
    if (hoverLikeBtn) {
        hoverLikeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            hoverLikeBtn.classList.toggle("liked");
            const isLiked = hoverLikeBtn.classList.contains("liked");
            hoverLikeBtn.style.borderColor = isLiked ? "var(--netflix-red)" : "rgba(255, 255, 255, 0.45)";
            const svg = hoverLikeBtn.querySelector("svg");
            if (svg) svg.style.fill = isLiked ? "var(--netflix-red)" : "#ffffff";
        });
    }

    // Deep Telemetry / More Info Button (Chevron ⌄)
    if (hoverMoreInfoBtn) {
        hoverMoreInfoBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (currentHoveredCity) {
                setHeroCity(currentHoveredCity);
                fetchCityOverview(currentHoveredCity.name);
                focusSection("weather-section");
            }
            hideHoverCard(true);
        });
    }

    // Keep preview visible while mouse is hovered inside it
    hoverPreviewCard.addEventListener("mouseenter", () => {
        if (hoverHideTimer) {
            clearTimeout(hoverHideTimer);
            hoverHideTimer = null;
        }
    });

    hoverPreviewCard.addEventListener("mouseleave", () => {
        hideHoverCard(false);
    });
}

function attachCardHoverListener(cardEl, city, isTop10 = false) {
    if (!hoverPreviewCard) return;

    const onEnter = () => {
        // Disable on touch devices and small mobile viewports
        if (window.innerWidth <= 768) return;

        if (hoverHideTimer) {
            clearTimeout(hoverHideTimer);
            hoverHideTimer = null;
        }

        if (hoverShowTimer) clearTimeout(hoverShowTimer);

        hoverShowTimer = setTimeout(() => {
            showHoverCard(cardEl, city, isTop10);
        }, 150);
    };

    const onLeave = () => {
        if (hoverShowTimer) {
            clearTimeout(hoverShowTimer);
            hoverShowTimer = null;
        }
        hideHoverCard(false);
    };

    cardEl.addEventListener("mouseenter", onEnter);
    cardEl.addEventListener("pointerenter", onEnter);
    cardEl.addEventListener("mouseleave", onLeave);
    cardEl.addEventListener("pointerleave", onLeave);
}

function showHoverCard(cardEl, city, isTop10) {
    if (!hoverPreviewCard || window.innerWidth <= 768) return;
    currentHoveredCity = city;

    // Populate data
    if (hoverCardImg) {
        hoverCardImg.src = city.image;
        hoverCardImg.alt = city.name;
    }
    if (hoverCardTitle) hoverCardTitle.textContent = city.name.toUpperCase();
    if (hoverCardTopBadge) {
        hoverCardTopBadge.textContent = isTop10 ? "TOP 10" : "FEATURED";
        hoverCardTopBadge.style.background = isTop10 ? "var(--netflix-red)" : "rgba(30, 41, 59, 0.9)";
    }
    if (hoverCardMatch) {
        const matches = ["99% Match", "98% Match", "97% Match", "96% Match"];
        const matchIdx = (city.name.length) % matches.length;
        hoverCardMatch.textContent = matches[matchIdx];
    }
    if (hoverCardCountry) {
        hoverCardCountry.textContent = city.country.toUpperCase();
    }
    if (hoverCardTemp) {
        hoverCardTemp.textContent = city.temp;
    }
    if (hoverCardTags) {
        const tags = getCityTags(city.name);
        hoverCardTags.innerHTML = tags.map((t, i) => `<span>${t}</span>${i < tags.length - 1 ? '<span>•</span>' : ''}`).join('');
    }

    // Reset like button style
    if (hoverLikeBtn) {
        hoverLikeBtn.classList.remove("liked");
        hoverLikeBtn.style.borderColor = "rgba(255, 255, 255, 0.45)";
        const svg = hoverLikeBtn.querySelector("svg");
        if (svg) svg.style.fill = "#ffffff";
    }

    // Calculate position
    const rect = cardEl.getBoundingClientRect();
    const cardWidth = 320;
    const cardHeight = 310;

    let left = rect.left + (rect.width / 2) - (cardWidth / 2);
    let top = rect.top + (rect.height / 2) - (cardHeight / 2);

    // Keep within viewport boundaries
    left = Math.max(16, Math.min(window.innerWidth - cardWidth - 16, left));
    top = Math.max(70, Math.min(window.innerHeight - cardHeight - 20, top));

    hoverPreviewCard.style.left = `${left}px`;
    hoverPreviewCard.style.top = `${top}px`;
    hoverPreviewCard.classList.add("visible");
    hoverPreviewCard.setAttribute("aria-hidden", "false");
}

function hideHoverCard(immediate = false) {
    if (!hoverPreviewCard) return;

    if (immediate) {
        if (hoverHideTimer) clearTimeout(hoverHideTimer);
        hoverPreviewCard.classList.remove("visible");
        hoverPreviewCard.setAttribute("aria-hidden", "true");
        currentHoveredCity = null;
        return;
    }

    if (hoverHideTimer) clearTimeout(hoverHideTimer);
    hoverHideTimer = setTimeout(() => {
        hoverPreviewCard.classList.remove("visible");
        hoverPreviewCard.setAttribute("aria-hidden", "true");
        currentHoveredCity = null;
    }, 180);
}
