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
        // Define the JWT header with HS256 algorithm
        const header = {
            alg: 'HS256',
            typ: 'JWT'
        };

        // Create the JWT token
        const token = jwt.sign(
            { appId },            // Payload
            secretKey,            // Secret key for HMACSHA256
            {
                algorithm: 'HS256', // Specify the algorithm
                expiresIn: '1h',    // Token expiration time
                header              // Set custom header
            }
        );

        return res.status(200).send(token);
    } catch (error) {
        console.error('Error generating JWT:', error.message);
        return res.status(500).json({ error: 'Error generating JWT', details: error.message });
    }
}
