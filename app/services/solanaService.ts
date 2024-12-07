import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const SOLANA_NETWORK = "devnet";
const STAKE_AMOUNT = 0.2 * LAMPORTS_PER_SOL; // 0.2 SOL in lamports

export default class SolanaService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(
      `https://api.${SOLANA_NETWORK}.solana.com`,
      "confirmed"
    );
  }

  async getBalance(publicKey: string): Promise<number> {
    const balance = await this.connection.getBalance(new PublicKey(publicKey));
    return balance / LAMPORTS_PER_SOL;
  }

  async createStakeTransaction(
    fromPubkey: PublicKey,
    toPubkey: PublicKey
  ): Promise<Transaction> {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports: STAKE_AMOUNT,
      })
    );

    const { blockhash } = await this.connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromPubkey;

    return transaction;
  }
}
