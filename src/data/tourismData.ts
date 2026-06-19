// Tourism mock data matching Power BI dashboards

export const countries = [
  "France", "Spain", "USA", "China", "Italy", "Turkey", "Mexico", "Germany", "Thailand", "UK",
  "India", "Japan", "Australia", "Brazil", "Canada", "Korea", "San Marino", "Ecuador", "Greece", "Singapore", "UAE"
];

// Dashboard 1: Tourism Overview - matching uploaded screenshot
export const tourismArrivals = [
  { country: "Korea, Rep.", arrivals: 10.2 },
  { country: "San Marino", arrivals: 9.8 },
  { country: "Montenegro", arrivals: 9.5 },
  { country: "Australia", arrivals: 9.2 },
  { country: "Ecuador", arrivals: 8.9 },
  { country: "N. Mariana", arrivals: 8.7 },
  { country: "France", arrivals: 9.9 },
  { country: "UK", arrivals: 7.9 },
  { country: "Germany", arrivals: 9.7 },
  { country: "Russia", arrivals: 7.7 },
  { country: "Brazil", arrivals: 8.7 },
  { country: "Ethiopia", arrivals: 6.5 },
  { country: "America", arrivals: 6.3 },
  { country: "India", arrivals: 7.8 },
  { country: "Australia", arrivals: 7.7 },
];

export const topCountriesByVisitors = [
  { country: "Korea, Rep.", visitors: 10.2 },
  { country: "San Marino", visitors: 9.8 },
  { country: "Montenegro", visitors: 9.5 },
  { country: "Australia", visitors: 9.2 },
  { country: "Ecuador", visitors: 8.9 },
  { country: "N. Mariana", visitors: 8.7 },
];

export const visaDistribution = [
  { name: "Visa On Arrival", value: 25.56, fill: "hsl(210, 90%, 45%)" },
  { name: "Tourist Visa", value: 25.5, fill: "hsl(195, 70%, 50%)" },
  { name: "E-Visa", value: 22.3, fill: "hsl(210, 30%, 75%)" },
  { name: "Schengen", value: 26.64, fill: "hsl(220, 80%, 30%)" },
];

// Dashboard 2: Revenue Analysis
export const revenueData = [
  { year: 2005, revenue: 8 },
  { year: 2009, revenue: 9 },
  { year: 2007, revenue: 10 },
  { year: 2003, revenue: 9 },
  { year: 2013, revenue: 12 },
  { year: 2023, revenue: 14 },
  { year: 2011, revenue: 11 },
  { year: 2006, revenue: 10 },
  { year: 2016, revenue: 15 },
  { year: 2015, revenue: 14 },
  { year: 2008, revenue: 11 },
  { year: 2017, revenue: 16 },
  { year: 2019, revenue: 18 },
  { year: 2003, revenue: 9 },
  { year: 2008, revenue: 20 },
  { year: 2014, revenue: 22 },
];

export const revenueByDestination = [
  { destination: "Eiffel Tower", revenue: 95 },
  { destination: "Times Square", revenue: 92 },
  { destination: "Magic Spring", revenue: 88 },
  { destination: "Golden Gate B.", revenue: 85 },
  { destination: "Angkor Vat", revenue: 82 },
  { destination: "Grate-Ruine C.", revenue: 80 },
  { destination: "Musee d'Orsn", revenue: 78 },
  { destination: "Golem Parung", revenue: 75 },
  { destination: "Grand Canyon", revenue: 72 },
  { destination: "Palace of Vers.", revenue: 70 },
  { destination: "Colorteum", revenue: 68 },
  { destination: "Las Vegas Strip", revenue: 65 },
];

export const revenueBudget = [
  { name: "High", value: 33.33, fill: "hsl(210, 90%, 45%)" },
  { name: "Low", value: 33.33, fill: "hsl(195, 70%, 50%)" },
  { name: "Medium", value: 33.33, fill: "hsl(175, 60%, 45%)" },
];

export const estimationStats = [
  { label: "No. of Flights", value: "1,378,334" },
  { label: "No. of Tourists", value: "62,631,942" },
  { label: "No. of Hotels", value: "136,812" },
  { label: "Tourist Satisfaction Score", value: "3,719" },
];

export const gdpContributionScatter = [
  { gdp: 0.5, months: 50.09 },
  { gdp: 0.8, months: 50.01 },
  { gdp: 1.0, months: 50.01 },
  { gdp: 1.2, months: 50.02 },
  { gdp: 1.5, months: 50.03 },
  { gdp: 1.8, months: 50.03 },
  { gdp: 2.0, months: 50.04 },
  { gdp: 2.2, months: 50.04 },
  { gdp: 2.5, months: 50.05 },
  { gdp: 2.8, months: 50.05 },
  { gdp: 3.0, months: 50.06 },
  { gdp: 3.2, months: 50.04 },
  { gdp: 3.5, months: 50.05 },
  { gdp: 3.8, months: 50.03 },
];

// Dashboard 3: Tourism Data Insights
export const gdpData = [
  { year: 2015, gdp: 2.8, visitors: 42 },
  { year: 2016, gdp: 3.1, visitors: 45 },
  { year: 2017, gdp: 3.5, visitors: 50 },
  { year: 2018, gdp: 3.9, visitors: 56 },
  { year: 2019, gdp: 4.2, visitors: 62 },
  { year: 2020, gdp: 1.6, visitors: 18 },
  { year: 2021, gdp: 2.1, visitors: 28 },
  { year: 2022, gdp: 3.4, visitors: 52 },
  { year: 2023, gdp: 3.8, visitors: 58 },
  { year: 2024, gdp: 4.1, visitors: 65 },
];

export const weatherVisitors = [
  { weather: "Clear", visitors: 5200 },
  { weather: "Cloudy", visitors: 4800 },
  { weather: "Drizzle", visitors: 3200 },
  { weather: "Lizzle", visitors: 2800 },
  { weather: "Dusty...", visitors: 2400 },
  { weather: "Sandstm", visitors: 1800 },
  { weather: "Foggy", visitors: 3600 },
  { weather: "Smutty", visitors: 2000 },
];

export const covidEffectsOnLocation = [
  { location: "Africa", full: 8000, partial: 5000 },
  { location: "Australasia", full: 6000, partial: 4500 },
  { location: "Central & East Asia", full: 7000, partial: 5500 },
  { location: "Europe", full: 9000, partial: 3000 },
  { location: "Middle East", full: 5000, partial: 4000 },
  { location: "Americas", full: 8500, partial: 3500 },
];

export const topRatedDestinations = [
  { place: "Place 1", rating: 10 },
  { place: "Barcelona", rating: 9 },
  { place: "New York", rating: 8 },
  { place: "Bangkok", rating: 5 },
  { place: "Rome", rating: 6 },
  { place: "Dubai", rating: 5 },
  { place: "Paris", rating: 5 },
  { place: "Singapore", rating: 4 },
  { place: "Tokyo", rating: 3 },
  { place: "Athens", rating: 3 },
];

export const co2Data = [
  { year: "2023", emissions: 1950 },
  { year: "2022", emissions: 1990 },
  { year: "2021", emissions: 1920 },
  { year: "2010", emissions: 1950 },
];

export const covidImpact = [
  { year: "2018", preCovid: 62, postCovid: null },
  { year: "2019", preCovid: 65, postCovid: null },
  { year: "2020", preCovid: null, postCovid: 18 },
  { year: "2021", preCovid: null, postCovid: 28 },
  { year: "2022", preCovid: null, postCovid: 52 },
  { year: "2023", preCovid: null, postCovid: 58 },
];

// Dashboard 4: Socio-Economic Impact
export const employmentByCountry = [
  { country: "China", employment: 7.5, unemployment: 3.2 },
  { country: "S. Africa", employment: 7.1, unemployment: 3.8 },
  { country: "India", employment: 6.9, unemployment: 4.1 },
  { country: "Germany", employment: 6.8, unemployment: 4.5 },
  { country: "Spain", employment: 6.7, unemployment: 4.2 },
  { country: "USA", employment: 6.7, unemployment: 4.0 },
  { country: "Thailand", employment: 6.5, unemployment: 3.9 },
  { country: "Brazil", employment: 6.8, unemployment: 3.7 },
  { country: "Turkey", employment: 5.0, unemployment: 3.9 },
  { country: "Mexico", employment: 4.7, unemployment: 3.8 },
  { country: "Japan", employment: 6.3, unemployment: 3.8 },
  { country: "Greece", employment: 6.1, unemployment: 3.1 },
  { country: "Singapore", employment: 5.6, unemployment: 3.1 },
  { country: "UK", employment: 3.6, unemployment: 3.1 },
  { country: "UAE", employment: 3.5, unemployment: 2.9 },
];

export const wasteManagement = [
  { country: "China", efficiency: 92 },
  { country: "South Africa", efficiency: 88 },
  { country: "Canada", efficiency: 85 },
  { country: "Thailand", efficiency: 85 },
  { country: "Italy", efficiency: 81 },
  { country: "Brazil", efficiency: 79 },
  { country: "India", efficiency: 77 },
  { country: "Germany", efficiency: 79 },
  { country: "Spain", efficiency: 74 },
  { country: "Egypt", efficiency: 72 },
];

export const tourismSeclusionByRegion = [
  { region: "Oceania", index: 8.7 },
  { region: "S. America", index: 8.2 },
  { region: "Africa", index: 3.1 },
  { region: "Asia", index: 2.9 },
  { region: "Europe", index: 2.8 },
  { region: "United East", index: 2.7 },
  { region: "N. America", index: 2.6 },
];

export const warPeaceImpact = [
  { country: "Afghanistan", status: "Active War", year: 2012, tourism: 1.80, type: "conflict" },
  { country: "Afghanistan", status: "Active War", year: 2013, tourism: 1.82, type: "conflict" },
  { country: "Afghanistan", status: "Active War", year: 2014, tourism: 1.72, type: "conflict" },
  { country: "Afghanistan", status: "Active War", year: 2015, tourism: 2.12, type: "conflict" },
  { country: "Afghanistan", status: "Active War", year: 2016, tourism: 1.18, type: "conflict" },
  { country: "Afghanistan", status: "Active War", year: 2017, tourism: 2.30, type: "conflict" },
  { country: "Afghanistan", status: "Pre-War", year: 2005, tourism: 3.42, type: "peace" },
  { country: "Afghanistan", status: "Pre-War", year: 2006, tourism: 4.41, type: "peace" },
  { country: "Afghanistan", status: "Pre-War", year: 2007, tourism: 4.29, type: "peace" },
];

export const socioEconomicData = [
  { year: 2015, employment: 62, unemployment: 8.2, literacy: 86.3, tourismRate: 4.8 },
  { year: 2016, employment: 63, unemployment: 7.9, literacy: 86.7, tourismRate: 5.1 },
  { year: 2017, employment: 64, unemployment: 7.5, literacy: 87.2, tourismRate: 5.5 },
  { year: 2018, employment: 65, unemployment: 7.1, literacy: 87.8, tourismRate: 5.9 },
  { year: 2019, employment: 66, unemployment: 6.8, literacy: 88.4, tourismRate: 6.2 },
  { year: 2020, employment: 58, unemployment: 10.5, literacy: 88.6, tourismRate: 2.1 },
  { year: 2021, employment: 60, unemployment: 9.2, literacy: 88.9, tourismRate: 3.4 },
  { year: 2022, employment: 63, unemployment: 7.8, literacy: 89.3, tourismRate: 5.0 },
  { year: 2023, employment: 65, unemployment: 7.0, literacy: 89.8, tourismRate: 5.8 },
  { year: 2024, employment: 67, unemployment: 6.5, literacy: 90.2, tourismRate: 6.4 },
];

export const literacyInfluencers = [
  { factor: "Country is Afghanistan", impact: "+64.9" },
  { factor: "Country is Somalia", impact: "+58.85" },
  { factor: "Education Spending High", impact: "+23.5" },
  { factor: "Peace Index Strong", impact: "+18.2" },
];

// Trend data for Trends page
export const trendData = [
  { year: 2015, arrivals: 1186, revenue: 1220, growth: 4.2 },
  { year: 2016, arrivals: 1240, revenue: 1340, growth: 4.5 },
  { year: 2017, arrivals: 1332, revenue: 1495, growth: 7.4 },
  { year: 2018, arrivals: 1407, revenue: 1650, growth: 5.6 },
  { year: 2019, arrivals: 1460, revenue: 1740, growth: 3.8 },
  { year: 2020, arrivals: 400, revenue: 680, growth: -72.6 },
  { year: 2021, arrivals: 455, revenue: 890, growth: 13.8 },
  { year: 2022, arrivals: 960, revenue: 1450, growth: 111.0 },
  { year: 2023, arrivals: 1290, revenue: 1590, growth: 34.4 },
  { year: 2024, arrivals: 1400, revenue: 1700, growth: 8.5 },
];

// Compare page data
export const compareData = [
  { country: "France", arrivals: 89.4, revenue: 67.4, employment: 64, literacy: 99.0, visitors: 9.9, rating: 4.5 },
  { country: "Spain", arrivals: 83.7, revenue: 74.3, employment: 62, literacy: 98.4, visitors: 8.5, rating: 4.4 },
  { country: "USA", arrivals: 79.3, revenue: 214.5, employment: 67, literacy: 99.0, visitors: 7.5, rating: 4.3 },
  { country: "China", arrivals: 65.7, revenue: 35.8, employment: 75, literacy: 96.8, visitors: 6.8, rating: 4.1 },
  { country: "Italy", arrivals: 64.5, revenue: 49.3, employment: 60, literacy: 99.2, visitors: 7.2, rating: 4.6 },
  { country: "Turkey", arrivals: 51.2, revenue: 34.5, employment: 53, literacy: 96.2, visitors: 5.1, rating: 4.2 },
  { country: "Mexico", arrivals: 45.0, revenue: 22.5, employment: 58, literacy: 95.4, visitors: 4.5, rating: 4.0 },
  { country: "Germany", arrivals: 39.6, revenue: 43.3, employment: 70, literacy: 99.0, visitors: 9.7, rating: 4.3 },
  { country: "Thailand", arrivals: 38.3, revenue: 63.0, employment: 68, literacy: 93.8, visitors: 6.3, rating: 4.5 },
  { country: "UK", arrivals: 36.3, revenue: 52.7, employment: 65, literacy: 99.0, visitors: 7.9, rating: 4.2 },
  { country: "India", arrivals: 17.9, revenue: 28.6, employment: 55, literacy: 74.4, visitors: 7.8, rating: 4.1 },
  { country: "Japan", arrivals: 31.9, revenue: 44.8, employment: 72, literacy: 99.0, visitors: 6.1, rating: 4.7 },
  { country: "Australia", arrivals: 9.5, revenue: 45.0, employment: 66, literacy: 99.0, visitors: 7.7, rating: 4.4 },
  { country: "Brazil", arrivals: 6.6, revenue: 5.9, employment: 57, literacy: 93.2, visitors: 8.7, rating: 4.0 },
  { country: "Canada", arrivals: 22.1, revenue: 22.0, employment: 68, literacy: 99.0, visitors: 5.5, rating: 4.3 },
];

export const chatbotResponses: Record<string, string> = {
  "highest tourism": "**France** leads global tourism with approximately **89.4 million** international arrivals annually, followed by Spain (83.7M) and the USA (79.3M). France's rich cultural heritage, iconic landmarks like the Eiffel Tower, and world-class cuisine make it the top destination.",
  "india": "**India's Tourism Overview:**\n- International arrivals: **17.9 million**\n- Tourism revenue: **$28.6 billion**\n- Key destinations: Taj Mahal, Kerala, Rajasthan, Goa\n- Tourism contributes about **6.8%** to GDP\n- Growth rate: **5.2%** annually",
  "revenue": "**Global Tourism Revenue Insights:**\n- Total global revenue: **₹26 billion** (2024)\n- Highest earner: **USA ($214.5B)**\n- No. of Flights: **1,378,334**\n- No. of Tourists: **62,631,942**\n- Tourism contributes **9.9%** to global GDP",
  "covid": "**COVID-19 Impact on Tourism:**\n- 2020 saw a **72.6% decline** in international arrivals\n- Revenue dropped from $1.74T to $680B\n- Recovery began in 2021 with **13.8% growth**\n- Full lockdown areas saw highest decline\n- Partial lockdown areas recovered faster",
  "trends": "**Current Tourism Trends:**\n1. 📈 Sustainable tourism growing **15%** annually\n2. 🏡 Rise of 'bleisure' travel (business + leisure)\n3. 📱 Digital nomad visas in **50+** countries\n4. 🌿 Eco-tourism up **25%** since 2022\n5. 🤖 AI-powered travel planning adoption",
  "visa": "**Global Visa Distribution:**\n- Visa On Arrival: **25.56%**\n- Tourist Visa: **25.5%**\n- Schengen: **26.64%**\n- E-Visa: **22.3%**\n\n**72 countries** now offer e-visa or visa-on-arrival programs.",
  "employment": "**Tourism & Employment:**\n- Employment Rate: **6.47%**\n- Unemployment Rate: **4.23%**\n- Literacy Rate: **86.5%**\n- Tourism Rate: **3.12**\n- China leads with 7.5% employment, 3.2% unemployment\n- UAE has lowest unemployment at 2.9%",
  default: "I can help with tourism-related queries! Try asking about:\n- 🌍 **Country tourism stats** (e.g., 'tourism in India')\n- 💰 **Revenue insights**\n- 📊 **Tourism trends**\n- 🦠 **COVID impact**\n- 💼 **Employment data**\n- 🛂 **Visa information**\n- 🏆 **Top destinations**"
};
