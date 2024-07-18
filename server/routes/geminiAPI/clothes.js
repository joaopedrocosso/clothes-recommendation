require("dotenv").config();
const express = require('express');
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Endpoint para receber os dados do formulário e gerar conteúdo com Gemini AI
router.post('/api/clothes', async (req, res) => {
    try {
        const formData = req.body;
        console.log(formData)

        // Extrair os dados do formulário na ordem especificada
        const { destination, gender, date } = formData;

        // Fazer a requisição para a API da OpenWeather para obter a temperatura
        const weatherResponse = await axios.post('http://localhost:5000/api/weather', { destination, date });

        if (weatherResponse.status !== 200) {
            return res.status(500).json({ error: 'Erro ao obter os dados de clima' });
        }

        const { temperature } = weatherResponse.data;

        // Criar o prompt com os dados do formulário e a temperatura
        const prompt = `Um texto curto contando roupas recomendadas baseado no destino: ${destination}, e na temperatura do local: ${temperature}. O texto deve ser direto ao ponto e curto, cada parágrafo irá referenciar uma categoria de roupa, que serão: dia, noite e acessórios. Porém, estas palavras não devem ser passadas como título e cada parágrafo deve ter no máximo 2 linhas. Além disso, faça este planejamento de roupas considerando uma pessoa do gênero ${gender}`;

        // Gerar o conteúdo usando o prompt modificado
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // console.log(text);

        // Dividir o texto em três partes usando uma abordagem simples
        const [dayText, nightText, accessoriesText] = text.split('\n').filter(Boolean);

        res.status(200).json({
            day: dayText.trim(),
            night: nightText.trim(),
            accessories: accessoriesText.trim()
        });
    } catch (error) {
        console.error('Erro ao processar os dados do formulário:', error);
        res.status(500).json({ error: 'Erro ao processar os dados do formulário' });
    }
});

module.exports = router;
