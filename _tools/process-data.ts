import * as fs from 'fs';
import { exit } from 'process';
import { NETWORKS } from './networks';

const targetData = NETWORKS;

/**
 * Structure of JSON files we're reading
 */
interface DataFile {
  contracts: {
    [key: string]: {
      deviationThreshold: number;
      heartbeat: string;
      decimals: number;
      v3Facade: string;
      name: string;
      status: 'dead' | 'live' | 'testnet-priority' | 'backup';
      config?: {
        maxContractValueAge: string;
        relativeDeviationThresholdPPB: string;
      };
      docs?: {
        assetName?: string;
        feedCategory?: string;
        feedType?: string;
        hidden?: boolean;
        por?: {
          auditor: string,
          source: string,
          type: string,
        };
        shutdownDate?: string;
      };
      transmissionsAccount?: string;
    };
  };
  proxies: {
    [key: string]: {
      aggregator: string;
      name: string;
    };
  };
}

interface ResultProxy {
  pair: string;
  assetName: string;
  deviationThreshold: number;
  heartbeat: string;
  decimals: number;
  proxy: string;
  feedCategory: string;
  feedType: string;
  por?: {
    auditor: string,
    source: string,
    type: string,
  };
  shutdownDate?: string;
}

function load(filename: string): DataFile {
  const file = `data-source/${filename}`;
  const result = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));
  if (!result.contracts) {
    console.error(
      `It looks like you may have loaded an invalid or unexpectedly formatted data file.\nKey 'contracts' not found in File: ${file}`
    );
    exit(2);
  }
  return result;
}

/**
 * The shape of the final JSON we want to serve to individual pages
 */
const finalResult: {
  [key: string]: {
    title: string;
    networks: {
      name: string;
      url: string;
      networkType: string;
      dataType: string;
      proxies: ResultProxy[];
    }[];
  };
} = {};

// Generate the data we need to serve
for (let page of targetData) {
  finalResult[page.page] = {
    title: page.title,
    networks: []
  };

  for (let network of page.networks) {
    const contents = load(network.source);

    // First find all the live contracts
    const liveContracts: {
      [key: string]: {
        decimals: number;
        deviationThreshold: number;
        heartbeat: string;
        assetName?: string;
        feedCategory: string;
        feedType?: string;
        por?: {
          auditor: string,
          source: string,
          type: string,
        };
        shutdownDate?: string;
      };
    } = {};
    for (let contractKey of Object.keys(contents.contracts)) {
      const contract = contents.contracts[contractKey];
      if (
        (contract.status === 'testnet-priority' || contract.status === 'live') &&
        // Only include if the key does not exist or it's not true
        !contract.docs?.hidden
      ) {
        let threshold: number = 0;
        // Handle Threshold defined in the config object
        if (
          contract.config &&
          (threshold = Number.parseInt(
            contract.config.relativeDeviationThresholdPPB ? contract.config.relativeDeviationThresholdPPB : '',
            10
          ))
        ) {
          threshold = threshold / 10000000;
        }

        // Set the threshold to deviationThreshold if it's specified (deviationThreshold or
        // relativeDeviationThresholdPPB should be set)
        liveContracts[contractKey] = {
          deviationThreshold: contract.deviationThreshold ? contract.deviationThreshold : threshold,
          heartbeat: contract.heartbeat ? contract.heartbeat : contract.config?.maxContractValueAge || '',
          decimals: contract.decimals,
          assetName: contract.docs?.assetName,
          feedCategory: contract.docs?.feedCategory || "",
          feedType: contract.docs?.feedType || "-",
          por: contract.docs?.por,
          shutdownDate: contract.docs?.shutdownDate,

        };
        if (contract.v3Facade) {
          liveContracts[contract.v3Facade] = {
            deviationThreshold: contract.deviationThreshold,
            heartbeat: contract.heartbeat,
            decimals: contract.decimals,
            assetName: contract.docs?.assetName,
            feedCategory: contract.docs?.feedCategory || "",
            feedType: contract.docs?.feedType || "-",
            por: contract.docs?.por,
            shutdownDate: contract.docs?.shutdownDate,
          };
        }
      }
    }

    // Then make a list of only the proxies that are live
    const proxyList: ResultProxy[] = [];
    const porProxyList: ResultProxy[] = [];
    if (contents.proxies) {
      for (let proxyKey of Object.keys(contents.proxies)) {
        const proxy = contents.proxies[proxyKey];
        if (liveContracts[proxy.aggregator] && !proxy.name.includes("Healthcheck")) {
          let proxyDetails = {
            pair: proxy.name,
            assetName: liveContracts[proxy.aggregator].assetName || "-",
            deviationThreshold: liveContracts[proxy.aggregator].deviationThreshold,
            heartbeat: liveContracts[proxy.aggregator].heartbeat,
            decimals: liveContracts[proxy.aggregator].decimals,
            proxy: proxyKey,
            feedCategory: liveContracts[proxy.aggregator].feedCategory || "",
            feedType: liveContracts[proxy.aggregator].feedType || "-",
            por: liveContracts[proxy.aggregator].por,
            shutdownDate: liveContracts[proxy.aggregator].shutdownDate,
          }

          // Create a serpate proxy list for PoR feeds
          if (liveContracts[proxy.aggregator].por) {
            porProxyList.push(proxyDetails);
          }else {
            proxyList.push(proxyDetails);
          }
          
        }
      }
    } else {
      for (let contractKey of Object.keys(contents.contracts)) {
        const contract = contents.contracts[contractKey];
        if (!contract.docs?.hidden && contract.status === 'live') {
          let proxyDetails = {
            pair: contract.name,
            assetName: contract.docs?.assetName || "-",
            deviationThreshold: liveContracts[contractKey]?.deviationThreshold,
            heartbeat: liveContracts[contractKey]?.heartbeat,
            decimals: liveContracts[contractKey]?.decimals,
            // Use transmissionsAccount for Solana; contractKey otherwise
            proxy: contract.transmissionsAccount || contractKey,
            feedCategory: contract.docs?.feedCategory || "",
            feedType: contract.docs?.feedType || "-",
            por: contract.docs?.por,
            shutdownDate: contract.docs?.shutdownDate,
          }
          
          // Create a serpate proxy list for PoR feeds
          if (contract.docs?.por) {
            porProxyList.push(proxyDetails);
          }else {
            proxyList.push(proxyDetails);
          }
        }
      }
    }

    // Save the data into our final output
    if (proxyList.length){
      proxyList.sort((a, b) => (a.pair < b.pair ? -1 : 1));
      finalResult[page.page].networks.push({
        name: network.name,
        url: network.url,
        dataType: "default",
        networkType: network.networkType,
        proxies: proxyList,
      });
    }
    if (porProxyList.length){
      porProxyList.sort((a, b) => (a.pair < b.pair ? -1 : 1));
      finalResult[page.page].networks.push({
        name: network.name,
        url: network.url,
        dataType: "por",
        networkType: network.networkType,
        proxies: porProxyList,
      });
    }
  }
}

// Write the data to disk
try {
  fs.mkdirSync('_src/addresses');
} catch (err) {
  // Doesn't matter if the directory already exists
}
const path = '_src/addresses/addresses.json';
fs.writeFileSync(path, JSON.stringify(finalResult));
