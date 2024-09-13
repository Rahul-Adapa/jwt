const jwt = require('jsonwebtoken');

// Vercel serverless function
export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { appId, secretKey } = req.body;

    if (!appId || !secretKey) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Create JWT token
        const token = jwt.sign(
            { appId },
            secretKey,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error generating JWT:', error.message);
        return res.status(500).json({ error: 'Error generating JWT', details: error.message });
    }
}
