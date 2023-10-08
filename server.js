const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000; // Choose any port you prefer

app.use(express.json());

app.post('/make-api-call', (req, res) => {
    const apiUrl = 'https://demo.flexibee.eu/c/demo/objednavka-prijata/query.json';
    const requestBody = {
        winstrom: {
            detail: 'custom:kod,sumCelkem,varSym,typDokl,firma(email,tel)',
            limit: '0',
            filter: '',
            includes: '/objednavka-prijata/firma',
            order: ['sumCelkem', 'kod'],
            '@version': '1.0'
        }
    };

    axios.post(apiUrl, requestBody)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.error('Error making API call:', error);
            res.status(500).json({ error: 'Error making API call' });
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



/* const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(cors());

const apiUrl = encodeURI('https://demo.flexibee.eu/c/demo/objednavka-prijata/query.json');
app.use('/api', createProxyMiddleware({ target: 'https://demo.flexibee.eu', changeOrigin: true }));

const requestBody = {
    winstrom: {
        detail: 'custom:uzivatel,kod,kontaktJmeno,firma(mesto,stat,ulice,psc,ic,dic),formaDopravy,formaUhrK,stavDoklObch,polozkyObchDokladu(typPolozkyK,nazev),vazba(faktura)',
        limit: '0',
        filter: '',
        includes: '/objednavka-prijata/firma',
        order: ['sumCelkem', 'kod'],
        '@version': '1.0'
    }
};

app.post('/api/objednavka', async (req, res) => {
    try {
        const response = await axios.post(apiUrl, requestBody);
        const objednavkaArray = response.data.winstrom.objednavka;
        const modifiedObjednavkaArray = objednavkaArray.map(objednavka => ({
            ...objednavka,
            newProperty: 'new value'
        }));
        res.json(modifiedObjednavkaArray);
    } catch (error) {
        console.error('Error making API call:', error);
        if (error.response) {
            console.error('API responded with:', error.response.data);
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
 */