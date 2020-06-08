// module.exports = {
//     JWT_SECRET: 'abraKadabra',
//     JWT_REFRESH_SECRET: 'kadabraAbra'
// };


module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'abraKadabra',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'kadabraAbra',
    JWT_SECRET_TIME: process.env.JWT_SECRET_TIME || '10m',
    JWT_REFRESH_SECRET_TIME: process.env.JWT_REFRESH_SECRET_TIME || '1d'
};
