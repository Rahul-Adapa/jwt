const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    const { clientId, source } = req.query;
  //  const secretKey = process.env.SECRET_KEY;

    if (!clientId || !source) {
        return res.status(400).json({ error: 'Missing required fields: clientId and source' });
    }

    try {
        const token = jwt.sign({ clientId, source }, { expiresIn: '1h' });
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error generating JWT:', error);
        return res.status(500).json({ error: 'Error generating JWT' });
    }
};
