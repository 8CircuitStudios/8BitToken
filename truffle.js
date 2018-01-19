module.exports = {
  networks: {
    live: {
      network_id: 1,
      host: "localhost",
      port: 8546
    },
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    }
  },
};
