// ecosystem.config.js
export default {
    apps: [
        {
            name: "techxen-backend",
            script: "./server.js", // Or the compiled file if you're using TypeScript
            instances: "max", // You can set 'max' for all available CPU cores
            exec_mode: "cluster", // 'fork' or 'cluster'
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
        },
    ],
};
