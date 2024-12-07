import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const NETWORK = "devnet";
const STAKE_AMOUNT = 0.2 * LAMPORTS_PER_SOL; // 0.2 SOL in lamports

export default class WalletService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(
      `https://api.${NETWORK}.solana.com`,
      "confirmed"
    );
  }

  async createStakeTransaction(
    fromWallet: string,
    toWallet: string
  ): Promise<Transaction> {
    const fromPubKey = new PublicKey(fromWallet);
    const toPubKey = new PublicKey(toWallet);

    // Create stake transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromPubKey,
        toPubkey: toPubKey,
        lamports: STAKE_AMOUNT,
      })
    );

    // Get recent blockhash
    const { blockhash } = await this.connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromPubKey;

    return transaction;
  }

  async getBalance(walletAddress: string): Promise<number> {
    const pubKey = new PublicKey(walletAddress);
    const balance = await this.connection.getBalance(pubKey);
    return balance / LAMPORTS_PER_SOL;
  }
}
