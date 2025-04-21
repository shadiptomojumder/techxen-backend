// ecosystem.config.js
 module.exports = {
    apps: [
        {
            name: "techxen-backend",
            script: "./server.js", // Or the compiled file if you're using TypeScript
            instances: "max", // You can set 'max' for all available CPU cores
            exec_mode: "cluster", // 'fork' or 'cluster' it Enables load balancing via clustering
            watch: true, // Set to true in dev only
            max_memory_restart: "500M", // Auto-restart if memory usage exceeds 500MB
            // env: {
            //     NODE_ENV: "development",
            // },
            // env_production: {
            //     NODE_ENV: "production",
            // },
        },
    ],
};
