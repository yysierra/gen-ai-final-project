const express = require('express');
const router = express.Router();

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "Please log in" });
    }
    next();
};

router.post('/', redirectLogin, async (req, res) => {
    const { message } = req.body;  

    if (!message) {
        return res.status(400).json({ error: "Message required" });
    }

    try {
        const url = `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(message)}`;
        
        const apiResponse = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.COUNTRIES_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!apiResponse.ok) {
            const errorText = await apiResponse.text();
            console.log(`API Fetch Failed | Status: ${apiResponse.status} | Response: ${errorText}`);
            return res.status(apiResponse.status).json({ error: 'Country not found or API authentication issue.' });
        }

        const json = await apiResponse.json();

        const countriesList = json.data?.objects || json.data || json;
        const country = countriesList[0];

        if (!country) {
            return res.status(404).json({ error: 'No matching country found.' });
        }

        const officialName = country.names?.official || country.names?.common || 'N/A';
        const region       = country.region || 'N/A';
        const subregion    = country.subregion || 'N/A';
        const capital      = country.capitals && country.capitals.length > 0 ? country.capitals[0].name : 'N/A';
        const population   = country.population ? country.population.toLocaleString() : '0';
        
        const languages    = country.languages ? country.languages.map(l => l.name).join(', ') : 'N/A';

        const replyText = `<b>${officialName}</b> is located in ${subregion} (${region}).<br><br>` +
                          `&bull; <b>Capital:</b> ${capital}<br>` +
                          `&bull; <b>Population:</b> ${population} people<br>` +
                          `&bull; <b>Official Languages:</b> ${languages}`;

        res.json({ reply: replyText });

    } catch (error) {
        console.error("API Processing Error:", error);
        res.status(500).json({ error: 'Failed to process country data.' });
    }
});

module.exports = router;
