import { PrmissionClient, PROTOCOL_FEE_BPS } from "@prmission/sdk";
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

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
