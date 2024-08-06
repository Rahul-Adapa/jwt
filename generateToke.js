const jwt = require('jsonwebtoken');

exports.handler = async (event) => {
    const { clientId, source } = event.queryStringParameters;

    if (!clientId || !source) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing required fields: clientId and source' }),
        };
    }

    try {
        // Generate JWT without a signature (unsigned)
        const token = jwt.sign({ clientId, source }, '', { algorithm: 'none' });
        return {
            statusCode: 200,
            body: JSON.stringify({ token }),
        };
    } catch (error) {
        console.error('Error generating JWT:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error generating JWT' }),
        };
    }
};
