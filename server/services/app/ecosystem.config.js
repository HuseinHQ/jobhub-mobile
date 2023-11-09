module.exports = {
  apps: [
    {
      name: "app1",
      script: "./app.js",
      env: {
        PORT: 80,
        NODE_ENV: "production",
        JWT_SECRET_KEY: "Rahasia123@060302",
      },
    },
  ],
};
