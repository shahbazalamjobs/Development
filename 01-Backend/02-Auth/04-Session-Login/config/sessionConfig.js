import session from "express-session";

const sessionConfig = {
  secret: "supersecretkey", // 🔒 use env variable in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // true if HTTPS
    maxAge: 1000 * 60 * 5, // 5 minutes
  },
};

export default sessionConfig;
