// rateLimiter.js

// Custom rate-limiting middleware
const rateLimit = (limit = 100, windowMs = 60 * 1000) => {
  // In-memory store { ip: { count, startTime } }
  const requests = {};

  return (req, res, next) => {
    const ip = req.ip; // identifies the user
    const currentTime = Date.now();

    if (!requests[ip]) {
      // first request from this IP
      requests[ip] = { count: 1, startTime: currentTime };
    } else {
      const elapsed = currentTime - requests[ip].startTime;

      if (elapsed < windowMs) {
        // still in time window
        requests[ip].count++;
      } else {
        // window expired → reset count
        requests[ip].count = 1;
        requests[ip].startTime = currentTime;
      }
    }

    // if request count exceeds limit → block
    if (requests[ip].count > limit) {
      return res.status(429).json({
        success: false,
        message: `Too many requests. Limit is ${limit} per minute.`,
      });
    }

    // otherwise, continue to next handler
    next();
  };
};

module.exports = rateLimit;
