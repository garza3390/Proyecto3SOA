const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
// Ruta para obtener el horario
app.get('/horario', (req, res) => {
    try {
        // URL de la cloud function que proporciona el horario
        const functionUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/reccomendation-hour-function';

        // Realizar la solicitud HTTP a la cloud function
        fetch(functionUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error al obtener el horario. Código de estado: ${response.status}`);
                }
            })
            .then(data => {
                // Devolver los datos del horario como respuesta JSON
                res.json(data);
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error al obtener el horario' });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el horario' });
    }
});

// Ruta para obtener recomendaciones de comida (versión 1)
app.get('/comida1', async (req, res) => {
    try {
        const value1 = req.query.value1;
        const value2 = req.query.value2;

        if (!value1 || !value2) {
            return res.status(400).json({ error: 'Debes proporcionar dos comidas.' });
        }

        const functionUrl = `https://us-central1-proyecto-3-soa.cloudfunctions.net/recommend_food_v2?value1=${value1}&value2=${value2}`;

        const response = await fetch(functionUrl);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener recomendaciones de comida (v1)' });
    }
});

// Ruta para obtener recomendaciones de comida (versión 2)
app.get('/comida2', async (req, res) => {
    try {
        const type = req.query.type;
        const value = req.query.value;

        if (!type || !value) {
            return res.status(400).json({ error: 'Debes proporcionar un tipo y un valor.' });
        }
    
        const functionUrl = `https://us-central1-proyecto-3-soa.cloudfunctions.net/recommend_food_v1?type=${type}&value=${value}`;

        const response = await fetch(functionUrl);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener recomendaciones de comida (v2)' });
    }
});

app.post('/feedback', async (req, res) => {
    try {
        // Obtén el texto del cuerpo de la solicitud
        const text = req.body.text;

        if (!text) {
            return res.status(400).json({ error: 'Debes proporcionar un texto para analizar el sentimiento.' });
        }

        const functionUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/feedback-feelings-function';

        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });

        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            throw new Error(`Error al obtener sentimiento. Código de estado: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el sentimiento' });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { user, email, password } = req.body;

        if (!user || !email || !password) {
            return res.status(400).json({ error: 'Debes proporcionar un usuario, email y contraseña.' });
        }

        const functionUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/register-function';

        const requestData = {
            user: user,
            email: email,
            password: password
        };

        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al realizar registro' });
    }
});

// Ruta para el inicio de sesión
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Debes proporcionar un email y una contraseña.' });
        }

        const functionUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/login-function';

        const requestData = {
            email: email,
            password: password
        };

        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al realizar inicio de sesión' });
    }
});

// Ruta para eliminar cuenta
app.post('/remove', async (req, res) => {
    try {
        const { user, email, password } = req.body;

        if (!user || !email || !password) {
            return res.status(400).json({ error: 'Debes proporcionar un usuario, email y contraseña.' });
        }

        const functionUrl = 'https://us-central1-proyecto-3-soa.cloudfunctions.net/remove-account-function';

        const requestData = {
            user: user,
            email: email,
            password: password
        };

        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la cuenta' });
    }
});

// Función exportada que se activa en Google Cloud Function
exports.backend = app;
