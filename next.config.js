module.exports = {
    target: 'serverless',
    env: {
        AWS_USER_POOLS_ID: process.env.AWS_USER_POOLS_ID,
        AWS_USER_POOLS_WEB_CLIENT_ID: process.env.AWS_USER_POOLS_WEB_CLIENT_ID,
        AWS_ENDPOINT: process.env.AWS_ENDPOINT,
    },
    images: {
        domains: ['dress-shop.vercel.app', 'localhost', 'www.focusjunior.it'],
    },
}