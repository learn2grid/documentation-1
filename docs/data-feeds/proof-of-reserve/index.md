---
layout: nodes.liquid
section: ethereum
date: Last Modified
title: "Proof of Reserve Feeds"
permalink: "docs/data-feeds/proof-of-reserve/"
whatsnext: {
  "Learn how to read answers from data feeds":"/docs/get-the-latest-price/",
  "Find contract addresses for PoR feeds":"/docs/data-feeds/proof-of-reserve/addresses/"
}
---

Proof of reserve feeds provide the status of the reserves that back several asset tokens on-chain. These feeds operate the same way as other Chainlink Data Feeds. To learn how to use these feeds, see the [Using Data Feeds](/docs/get-the-latest-price/) guide.

To find a list of available proof of reserve feeds, see [Proof of Reserve Feed Addresses](/docs/data-feeds/proof-of-reserve/addresses/).

**Topics**

- [Types of Proof of Reserve feeds](#types-of-proof-of-reserve-feeds)

## Types of Proof of Reserve feeds

Reserves are available for both cross-chain assets and off-chain assets. Token issuers prove the reserves for their assets through several different methods. 

- [Cross-chain reserves](#cross-chain-reserves):
  - Wallet address manager: The project uses the [IPoRAddressList]() wallet address manager contract and self-attests to which addresses they own.
  - Self-attested wallet API: The project attests which addresses they own through a self-hosted API.
- [Off-chain reserves](#off-chain-reserves):
  - Third-party API: An auditor or a third-party verifies the reserves and provides that data through an API.
  - Custodian API: Reserve status is read directly from a bank or custodian API.
  - Self-attested API: Reserve status is read from an API that the token issuer hosts.

## Cross-chain reserves

Cross-Chain reserves are sourced from the network where the reserves are held. This includes but is not limited to networks including Bitcoin, Filecoin, Cardano, and chains where Chainlink has a native integration. Chainlink Node operators can report cross-chain reserves by running an [external adapter](/docs/external-adapters/) and querying the source-chain client directly. In some instances, the reserves can be composed of a dynamic list of IDs or addresses using a composite adapter.

## Off-chain reserves

Off-Chain reserves are sourced from APIs through an [external adapter](/docs/external-adapters/).