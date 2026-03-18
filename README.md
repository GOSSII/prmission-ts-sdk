# Prmission SDK

**AI agents pay users for data — on-chain.**

👉 **Live Interactive Demo:** https://prmission-demo123netlify.app/

Prmission is the economic layer for AI agent commerce.  
This SDK enables permissioned data access, escrow payments, and on-chain settlement on Base.

---

## ⚡ Install

```bash
npm install prmission-sdk ethers

import { PrmissionClient, PROTOCOL_FEE_BPS } from "prmission-sdk";
import { ethers } from "ethers";

async function main() {
  const client = new PrmissionClient({
    rpcUrl: "https://mainnet.base.org",
    contractAddress: "0x0c8B16a57524f4009581B748356E01e1a969223d",
  });

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, client.provider);
  client.connect(wallet);

  console.log("SDK connected successfully");
  console.log("Protocol fee (bps):", PROTOCOL_FEE_BPS.toString());
}

main().catch(console.error);

import { parseUsdc } from "prmission-sdk";

// 1. Grant permission
const permissionId = await client.grantPermission({
  merchant: "0xAgentAddressHere",
  dataCategory: "purchase_history",
  purpose: "recommendation",
  compensationBps: 1500,
  upfrontFee: 0n,
  validityPeriod: 86400,
});

// 2. Deposit escrow
const escrowId = await client.depositEscrow(
  permissionId,
  parseUsdc("1.00"),
  0n
);

// 3. Report outcome
await client.reportOutcome({
  escrowId,
  outcomeValue: parseUsdc("1.00"),
  outcomeType: "conversion",
  outcomeDescription: "User purchased product",
});

// 4. Settle
await client.settle(escrowId);

const permission = await client.getPermission(1n);
console.log(permission);

const escrow = await client.getEscrow(1n);
console.log(escrow);

🧩 API Overview
Write (requires wallet)

connect(signer)

grantPermission()

revokePermission()

expirePermission()

depositEscrow()

reportOutcome()

disputeSettlement()

settle()

refundEscrow()

Read

getPermission()

getUserPermissions()

getActivePermissions()

getEscrow()

previewSettlement()

checkAccess()

checkAgentTrust()

getTotalProtocolFees()

getTreasury()

Helpers

formatUsdc()

parseUsdc()

PrmissionClient.calculateSettlement()

| Parameter      | Value                                                |
| -------------- | ---------------------------------------------------- |
| Network        | Base Mainnet                                         |
| RPC            | [https://mainnet.base.org](https://mainnet.base.org) |
| Contract       | 0x0c8B16a57524f4009581B748356E01e1a969223d           |
| USDC Decimals  | 6                                                    |
| Protocol Fee   | 3%                                                   |
| Dispute Window | 24 hours                                             |


PRIVATE_KEY=your_private_key_here

🧠 Philosophy

Permission is the product — data is the by-product.

Merchants already pay for customers.
Prmission lets them pay the right customers directly.

🚀 Vision

AI agents will transact autonomously.
Prmission ensures:

Users get paid

Data is permissioned

Value flows on-chain

⚖️ License

Apache-2.0
