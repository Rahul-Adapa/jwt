const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    const { clientId, clientSecret, identity, aud, isAnonymous } = req.body;
    const secretKey = 'your-secret-key'; // Use a dummy key for testing

    if (!clientId || !clientSecret || !identity || !aud) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const token = jwt.sign(
            { clientId, clientSecret, identity, aud, isAnonymous },
            secretKey,
            { expiresIn: '1h' }
        );
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error generating JWT:', error);
        return res.status(500).json({ error: 'Error generating JWT' });
    }
};
