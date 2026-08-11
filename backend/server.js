const app = require("./app");

const PORT = process.env.PORT || 5000;

// Local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Vercel ke liye
module.exports = app;