module.exports = {
    target: 'serverless',
    env: {
        AWS_USER_POOLS_ID: process.env.AWS_USER_POOLS_ID,
        AWS_USER_POOLS_WEB_CLIENT_ID: process.env.AWS_USER_POOLS_WEB_CLIENT_ID,
    },
    images: {
        domains: ['dress-shop.vercel.app'],
    },
}