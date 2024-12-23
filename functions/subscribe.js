const axios = require('axios');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    const { email } = JSON.parse(event.body);

    if (!email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Email is required' }),
        };
    }

    try {
        const response = await axios.post(
            'https://api.beehiiv.com/v2/publications/pub_1eae5826-7416-4d6c-acd3-a58b2964b78b/subscriptions',
            { email },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer 7n1r7124qgAfpdQL9TGHUIyio1sWmzupPK5hLYK0SHfpI3D6cMn5vncziO5GJroy`,
                },
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Subscription successful', data: response.data }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
