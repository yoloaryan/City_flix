// ==============================================================================
// CITYFLIX - Client Application Logic
// ==============================================================================

const GLOBAL_CITIES = [
    {
        name: "Barcelona",
        country: "Spain",
        image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1000&q=80",
        temp: "26°C",
        condition: "Clear Sky",
        desc: "Mediterranean jewel famous for Sagrada Familia, vibrant coastlines, and thriving culture."
    },
    {
        name: "Tokyo",
        country: "Japan",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
        temp: "22°C",
        condition: "Partly Cloudy",
        desc: "The hyper-modern metropolis blending neon-lit skyscrapers with historic temples and culinary artistry."
    },
    {
        name: "New York",
        country: "United States",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1000&q=80",
        temp: "19°C",
        condition: "Breezy",
        desc: "The iconic global capital of finance, culture, and non-stop energy from Manhattan to Brooklyn."
    },
    {
        name: "Paris",
        country: "France",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
        temp: "18°C",
        condition: "Light Rain",
        desc: "The City of Light renowned for haute cuisine, art museums, fashion, and romantic boulevards."
    },
    {
        name: "London",
        country: "United Kingdom",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80",
        temp: "16°C",
        condition: "Overcast",
        desc: "Historic Thames-side metropolis featuring royal landmarks, modern fintech, and global theater."
    },
    {
        name: "Dubai",
        country: "United Arab Emirates",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
        temp: "35°C",
        condition: "Sunny",
        desc: "Ultra-luxury oasis featuring record-breaking skyscrapers, desert dunes, and global shopping hubs."
    },
    {
        name: "Mumbai",
        country: "India",
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80",
        temp: "31°C",
        condition: "Tropical Humid",
        desc: "The financial engine of India, teeming with Bollywood glamour, heritage architecture, and coastal spirit."
    },
    {
        name: "Singapore",
        country: "Singapore",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80",
        temp: "29°C",
        condition: "Scattered Clouds",
        desc: "The futuristic garden city known for Marina Bay, sustainable architecture, and culinary diversity."
    }
];

// App State
let activeCity = GLOBAL_CITIES[0];
let chatHistory = [];
let pendingApproval = null;

// DOM Elements
const navbar = document.getElementById("navbar");
const heroBillboard = document.getElementById("hero");
const heroCityTitle = document.getElementById("heroCityTitle");
const heroWeatherBadge = document.getElementById("heroWeatherBadge");
const heroWeatherText = document.getElementById("heroWeatherText");
const heroSynopsis = document.getElementById("heroSynopsis");
const heroAskBtn = document.getElementById("heroAskBtn");
const heroInfoBtn = document.getElementById("heroInfoBtn");

const citiesCarousel = document.getElementById("citiesCarousel");
const newsCarousel = document.getElementById("newsCarousel");
const weatherCarousel = document.getElementById("weatherCarousel");

const citySearchInput = document.getElementById("citySearchInput");
const apiStatusBadge = document.getElementById("apiStatusBadge");
const apiStatusText = document.getElementById("apiStatusText");

const agentDrawer = document.getElementById("agentDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");
const openDrawerBtn = document.getElementById("openDrawerBtn");
const closeDrawerBtn = document.getElementById("closeDrawerBtn");
const drawerMessages = document.getElementById("drawerMessages");
const approvalContainer = document.getElementById("approvalContainer");
const agentChatForm = document.getElementById("agentChatForm");
const agentInput = document.getElementById("agentInput");

// ==============================================================================
// Initialization
// ==============================================================================
document.addEventListener("DOMContentLoaded", () => {
    checkApiStatus();
    renderCitiesCarousel();
    setHeroCity(activeCity);
    fetchCityOverview(activeCity.name);
    setupEventListeners();
});

// Navbar scroll blur effect
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ==============================================================================
// API Status Checker
// ==============================================================================
async function checkApiStatus() {
    try {
        const res = await fetch("/api/status");
        const data = await res.json();
        if (data.ready) {
            apiStatusText.textContent = "AI Agent Connected";
        } else {
            apiStatusText.textContent = "Partial API Keys";
            apiStatusBadge.style.color = "#f59e0b";
            apiStatusBadge.style.borderColor = "rgba(245, 158, 11, 0.4)";
        }
    } catch (e) {
        apiStatusText.textContent = "Offline Mode";
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
}

// ==============================================================================
// Carousel Rendering
// ==============================================================================
function renderCitiesCarousel() {
    citiesCarousel.innerHTML = "";
    GLOBAL_CITIES.forEach(city => {
        const card = document.createElement("div");
        card.className = "city-card";
        card.innerHTML = `
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
        card.addEventListener("click", () => {
            setHeroCity(city);
            fetchCityOverview(city.name);
            window.scrollTo({ top: 0, behavior: "smooth" });
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
        <div class="weather-card">
            <div class="weather-header">
                <div class="weather-city">${city}</div>
                <div class="weather-condition">Satellite Sensor</div>
            </div>
            <div class="weather-temp-huge">Live</div>
            <div style="font-size: 0.9rem; color: #cbd5e1;">${weatherText}</div>
            <div class="weather-details-grid">
                <div>Source: OpenWeatherMap</div>
                <div>Status: Real-time</div>
            </div>
        </div>
    `;

    // Also populate adjacent reference cards for comparison
    GLOBAL_CITIES.filter(c => c.name !== city).slice(0, 3).forEach(c => {
        const card = document.createElement("div");
        card.className = "weather-card";
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
                <div class="news-card-title">Live intelligence monitoring active for ${city}. Query the agent for instant briefings.</div>
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
        card.innerHTML = `
            <div class="news-card-badge">🔴 TAVILY BREAKING #${idx + 1}</div>
            <div class="news-card-title">${escapeHtml(block.replace(/URL:.*$/m, ''))}</div>
            <div class="news-card-footer">
                <span>Cityflix Intelligence</span>
                <span style="color: #38bdf8;">Ask Agent &rarr;</span>
            </div>
        `;
        card.addEventListener("click", () => {
            openDrawer();
            sendUserMessage(`Tell me more about the latest news in ${city}`);
        });
        newsCarousel.appendChild(card);
    });
}

// ==============================================================================
// Drawer & Agent Chat Handlers
// ==============================================================================
function openDrawer() {
    agentDrawer.classList.add("open");
    drawerOverlay.classList.add("open");
    agentInput.focus();
}

function closeDrawer() {
    agentDrawer.classList.remove("open");
    drawerOverlay.classList.remove("open");
}

function setupEventListeners() {
    openDrawerBtn.addEventListener("click", openDrawer);
    closeDrawerBtn.addEventListener("click", closeDrawer);
    drawerOverlay.addEventListener("click", closeDrawer);

    heroAskBtn.addEventListener("click", () => {
        openDrawer();
        sendUserMessage(`What is the current weather and top news in ${activeCity.name}?`);
    });

    heroInfoBtn.addEventListener("click", () => {
        openDrawer();
        sendUserMessage(`Provide a comprehensive live intelligence briefing for ${activeCity.name}.`);
    });

    // Search bar handler
    citySearchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const query = citySearchInput.value.trim();
            if (query) {
                // Find matching or create custom city
                const existing = GLOBAL_CITIES.find(c => c.name.toLowerCase() === query.toLowerCase());
                if (existing) {
                    setHeroCity(existing);
                } else {
                    setHeroCity({
                        name: query,
                        country: "Global",
                        image: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1000&q=80",
                        temp: "--",
                        condition: "Monitoring",
                        desc: `Real-time intelligence and weather monitoring for ${query}.`
                    });
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
