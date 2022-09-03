export const NETWORKS = [
  {
    page: "ethereum-addresses",
    title: "Ethereum Data Feeds",
    networks: [
      {
        name: "Ethereum Mainnet",
        url: "https://etherscan.io/address/%s",
        source: "directory.json",
        networkType: "mainnet",
      },
      {
        name: "Goerli Testnet",
        url: "https://goerli.etherscan.io/address/%s",
        source: "directory-goerli.json",
        networkType: "testnet",
      },
      {
        name: "Rinkeby Testnet (Deprecated)",
        url: "https://rinkeby.etherscan.io/address/%s",
        source: "directory-rinkeby.json",
        networkType: "testnet",
      },
      {
        name: "Kovan Testnet (Deprecated)",
        url: "https://kovan.etherscan.io/address/%s",
        source: "directory-kovan.json",
        networkType: "testnet",
      },
    ],
  },
  {
    page: "bnb-chain-addresses-price",
    title: "BNB Chain Data Feeds",
    networks: [
      {
        name: "BNB Chain Mainnet",
        url: "https://bscscan.com/address/%s",
        source: "directory-bsc-mainnet.json",
        networkType: "mainnet",
      },
      {
        name: "BNB Chain Testnet",
        url: "https://testnet.bscscan.com/address/%s",
        source: "directory-bsc-testnet.json",
        networkType: "testnet",
      },
    ],
  },
  {
    page: "matic-addresses",
    title: "Polygon (Matic) Data Feeds",
    networks: [
      {
        name: "Polygon Mainnet",
        url: "https://polygonscan.com/address/%s",
        source: "directory-matic-mainnet.json",
        networkType: "mainnet",
      },
      {
        name: "Mumbai Testnet",
        url: "https://mumbai.polygonscan.com/address/%s",
        source: "directory-matic-testnet.json",
        networkType: "testnet",
      },
    ],
  },
  {
    page: "data-feeds-gnosis-chain",
    title: "Gnosis Chain (xDai) Data Feeds",
    networks: [
      {
        name: "Gnosis Chain Mainnet",
        url: "https://blockscout.com/poa/xdai/address/%s",
        source: "directory-xdai-mainnet.json",
        networkType: "mainnet",
      },
    ],
  },
  {
    page: "huobi-eco-chain-price-feeds",
    title: "HECO Chain Data Feeds",
    networks: [
      {
        name: "HECO Mainnet",
        url: "https://hecoinfo.com/address/%s",
        source: "directory-heco-mainnet.json",
        networkType: "mainnet",
      },
    ],
  },
  {
    page: "avalanche-price-feeds",
    title: "Avalanche Data Feeds",
    networks: [
      {
        name: "Avalanche Mainnet",
        url: "https://snowtrace.io/address/%s",
        source: "directory-avalanche-mainnet.json",
        networkType: "mainnet",
      },
      {
        name: "Avalanche Testnet",
        url: "https://testnet.snowtrace.io/address/%s",
        source: "directory-avalanche-fuji-testnet.json",
        networkType: "testnet",
      },
    ],
  },
  {
    page: "fantom-price-feeds",
    title: "Fantom Testnet",
    networks: [
      {
        name: "Fantom Mainnet",
        url: "https://ftmscan.com/address/%s",
        source: "directory-fantom-mainnet.json",
        networkType: "mainnet",
      },
      {
        name: "Fantom Testnet",
        url: "https://testnet.ftmscan.com/address/%s",
        source: "directory-fantom-testnet.json",
        networkType: "testnet",
      },
    ],
  },
  {
    page: "arbitrum-price-feeds",
    title: "Arbitrum Data Feeds",
    networks: [
      {
        name: "Arbitrum Mainnet",
        url: "https://arbiscan.io/address/%s",
        source: "directory-ethereum-mainnet-arbitrum-1.json",
        networkType: "mainnet",
      },
      {
        name: "Arbitrum Rinkeby",
        url: "http://testnet.arbiscan.io/address/%s",
        source: "directory-ethereum-testnet-rinkeby-arbitrum-1.json",
        networkType: "testnet",
      },
    ],
  },
  {
    page: "harmony-price-feeds",
    title: "Harmony Data Feeds",
    networks: [
      {
        name: "Harmony Mainnet",
        url: "https://explorer.harmony.one/#/address/%s",
        source: "directory-harmony-mainnet-0.json",
        networkType: "mainnet",
      },
    ],
  },
  {
    page: "data-feeds-solana",
    title: "Solana Data Feeds",
    networks: [
      {
        name: "Solana Mainnet",
        url: "https://solscan.io/account/%s",
        source: "directory-solana-mainnet.json",
        networkType: "mainnet",
      },
      {
        name: "Solana Devnet",
        url: "https://solscan.io/account/%s?cluster=devnet",
        source: "directory-solana-devnet.json",
        networkType: "testnet",
      },
    ],
  },
  {
    page: "optimism-price-feeds",
    title: "Optimism Data Feeds",
    networks: [
      {
        name: "Optimism Mainnet",
        url: "https://optimistic.etherscan.io/address/%s",
        source: "directory-ethereum-mainnet-optimism-1.json",
        networkType: "mainnet",
      },
      {
        name: "Optimism Goerli",
        url: "https://goerli-optimism.etherscan.io/address/%s",
        source: "directory-ethereum-testnet-goerli-optimism-1.json",
        networkType: "testnet",
      },
    ],
  },
  {
    page: "data-feeds-moonriver",
    title: "Moonriver Data Feeds",
    networks: [
      {
        name: "Moonriver Mainnet",
        url: "https://moonriver.moonscan.io/address/%s",
        source: "directory-kusama-mainnet-moonriver.json",
        networkType: "mainnet",
      },
    ],
  },
  {
    page: "data-feeds-moonbeam",
    title: "Moonbeam Data Feeds",
    networks: [
      {
        name: "Moonbeam Mainnet",
        url: "https://moonscan.io/address/%s",
        source: "directory-polkadot-mainnet-moonbeam.json",
        networkType: "mainnet",
      },
    ],
  },
  {
    page: "data-feeds-andromeda",
    title: "Moonriver Data Feeds",
    networks: [
      {
        name: "Metis Mainnet",
        url: "https://andromeda-explorer.metis.io/address/%s",
        source: "directory-ethereum-mainnet-andromeda-1.json",
        networkType: "mainnet",
      },
    ],
  },
  {
    page: "data-feeds-klaytn",
    title: "Klaytn Data Feeds",
    networks: [
      {
        name: "Klaytn Baobab testnet",
        url: "https://baobab.scope.klaytn.com/account/%s",
        source: "directory-klaytn-testnet-baobab.json",
        networkType: "testnet",
      },
    ],
  },
];
