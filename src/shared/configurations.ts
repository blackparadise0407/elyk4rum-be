export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  database: {
    uri: 'mongodb://127.0.0.1:27017/elyk4rum',
  },
  auth0: {
    domain: process.env.AUTH0_DOMAIN || 'https://dev-2qy1yb53.us.auth0.com',
    clientId: process.env.AUTH0_CLIENT_ID || 'NxAuHySqCpe309f8PF3seQv1kE39tEKL',
    audience: process.env.AUTH0_AUDIENCE,
  },
  rateLimit: {
    ttl: parseInt(process.env.THROTTLE_TTL, 10) || 15 * 60 * 60, // Window time in seconds
    limit: parseInt(process.env.THROTTLE_LIMIT, 10) || 100,
  },
});
