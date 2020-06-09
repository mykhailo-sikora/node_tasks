module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'bla-bla',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'bla-bla',
    JWT_SECRET_TIME: process.env.JWT_SECRET_TIME || '1h',
    JWT_REFRESH_SECRET_TIME: process.env.JWT_REFRESH_SECRET_TIME || '1d'
};
