const express = require('express');
const { Airport, City, Country } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/airport', async (req, res) => {
    const { iata_code } = req.query;
    if (!iata_code) {
        return res.status(400).json({ error: 'iata_code parameter is required' });
    }

    try {
        const airport = await Airport.findOne({
            where: { iata_code },
            include: {
                model: City,
                include: {
                    model: Country
                }
            }
        });

        if (!airport) {
            return res.status(404).json({ error: 'Airport not found' });
        }

        const response = {
            name: airport.name,
            iata_code: airport.iata_code,
            city: airport.City.name,
            country: airport.City.Country ? airport.City.Country.name : null
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
