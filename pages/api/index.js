const axios = require('axios')

export default function handler(req, res, next) {
    async function getURI(url, method, headers, body) {
        try {
            const response = await axios({
                method,
                url,
                data: body,
                headers,
                validateStatus: () => true,
            })
            return res.status(response.status).json(response.data)
        } catch (error) {
            return res
                .status(500)
                .json({ type: 'internal-error', message: error.message })
        }
    }

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json')

    const headers = req.headers.authorization
        ? { authorization: req.headers.authorization }
        : {}
    getURI(
        req.headers['x-original-url'],
        req.headers['x-original-method'],
        headers,
        req.body
    )
}
