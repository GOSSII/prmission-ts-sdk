import { ethers } from "ethers";
import { type PrmissionConfig, type PermissionDetails, type EscrowDetails, type SettlementPreview, type AgentTrustProfile, type AccessCheck } from "./types.js";
/**
 * PrmissionClient — TypeScript SDK for the Prmission Protocol.
 *
 * Wraps all Prmission.sol contract interactions with typed interfaces,
 * automatic USDC approval handling, and human-readable formatting.
 *
 * Usage:
 * ```ts
 * const client = new PrmissionClient({
 *   contractAddress: "0x...",
 *   rpcUrl: "https://mainnet.base.org",
 * });
 *
 * // Read-only (no signer needed)
 * const perms = await client.getUserPermissions("0xUser...");
 *
 * // Write operations (connect a signer first)
 * client.connect(signer);
 * const id = await client.grantPermission({ ... });
 * ```
 */
export declare class PrmissionClient {
    readonly contract: ethers.Contract;
    readonly provider: ethers.Provider;
    private _paymentToken;
    private _paymentTokenAddress;
    private _signer;
    constructor(config: PrmissionConfig);
    /**
     * Connect a signer for write operations.
     * Call this before any state-changing methods.
     */
    connect(signer: ethers.Signer): PrmissionClient;
    private get signer();
    private get writableContract();
    /** Lazily resolve the payment token contract */
    private getPaymentToken;
    /**
     * Ensure the contract has sufficient USDC allowance.
     * Approves if current allowance is below the required amount.
     * Returns true if an approval tx was sent.
     */
    ensureAllowance(amount: bigint): Promise<boolean>;
    /** Get USDC balance for an address */
    getBalance(address: string): Promise<bigint>;
    /**
     * Grant a new data-sharing permission.
     *
     * @param merchant - Restrict to a specific buyer (address(0) = open to all)
     * @param dataCategory - e.g. "browsing", "location", "health"
     * @param purpose - Why the data is being shared
     * @param compensationBps - User's cut in basis points (max 5000 = 50%)
     * @param upfrontFee - USDC amount paid to user when escrow is deposited (raw, 6 decimals)
     * @param validityPeriod - Duration in seconds
     * @returns The new permissionId
     */
    grantPermission(params: {
        merchant?: string;
        dataCategory: string;
        purpose: string;
        compensationBps: number;
        upfrontFee?: bigint;
        validityPeriod: number;
    }): Promise<bigint>;
    /** Revoke an active permission. Only the permission owner can call this. */
    revokePermission(permissionId: bigint): Promise<void>;
    /** Expire a permission that has passed its validUntil. Anyone can call. */
    expirePermission(permissionId: bigint): Promise<void>;
    /** Get a single permission with enriched metadata */
    getPermission(permissionId: bigint): Promise<PermissionDetails>;
    /** Get all permission IDs for a user */
    getUserPermissionIds(user: string): Promise<bigint[]>;
    /** Get all permissions for a user, fully resolved */
    getUserPermissions(user: string): Promise<PermissionDetails[]>;
    /** Get only active permissions for a user */
    getActivePermissions(user: string): Promise<PermissionDetails[]>;
    /** Check access for an agent on a permission */
    checkAccess(permissionId: bigint, agent: string): Promise<AccessCheck>;
    /**
     * Deposit escrow to access user data.
     * Automatically handles USDC approval if needed.
     *
     * @param permissionId - The permission being exercised
     * @param amount - USDC escrow amount (raw, 6 decimals)
     * @param agentId - ERC-8004 agent ID (0 if identity not enforced)
     * @returns The new escrowId
     */
    depositEscrow(permissionId: bigint, amount: bigint, agentId?: bigint): Promise<bigint>;
    /** Report the outcome of a data access (agent only) */
    reportOutcome(params: {
        escrowId: bigint;
        outcomeValue: bigint;
        outcomeType: string;
        outcomeDescription: string;
    }): Promise<void>;
    /** File a dispute during the 24-hour window */
    disputeSettlement(escrowId: bigint, reason: string): Promise<void>;
    /** Settle an escrow after the dispute window closes */
    settle(escrowId: bigint): Promise<void>;
    /** Refund escrow (revoked permissions or resolved disputes) */
    refundEscrow(escrowId: bigint): Promise<void>;
    /** Get escrow details with enriched metadata */
    getEscrow(escrowId: bigint): Promise<EscrowDetails>;
    /** Preview settlement amounts before settling */
    previewSettlement(escrowId: bigint): Promise<SettlementPreview>;
    /** Check an agent's ERC-8004 trust profile */
    checkAgentTrust(agentId: bigint, agentAddress: string): Promise<AgentTrustProfile>;
    /** Get the list of trusted reviewer addresses */
    getTrustedReviewers(): Promise<string[]>;
    /** Check whether identity enforcement is currently active */
    isIdentityEnforced(): Promise<boolean>;
    /** Check whether reputation gating is currently active */
    isReputationEnforced(): Promise<boolean>;
    /** Get total protocol fees collected (lifetime) */
    getTotalProtocolFees(): Promise<{
        raw: bigint;
        formatted: string;
    }>;
    /** Get treasury address */
    getTreasury(): Promise<string>;
    /**
     * Calculate settlement split locally (no RPC call needed).
     * Matches the exact math in Prmission.sol settle().
     */
    static calculateSettlement(outcomeValue: bigint, compensationBps: bigint, escrowAmount: bigint): {
        userShare: bigint;
        protocolFee: bigint;
        agentRefund: bigint;
        sufficient: boolean;
    };
    /** Subscribe to PermissionGranted events */
    onPermissionGranted(callback: (permissionId: bigint, user: string, merchant: string, dataCategory: string, purpose: string, compensationBps: bigint, upfrontFee: bigint, validUntil: bigint, event: ethers.EventLog) => void): void;
    /** Subscribe to EscrowDeposited events */
    onEscrowDeposited(callback: (escrowId: bigint, permissionId: bigint, agent: string, agentId: bigint, amount: bigint, event: ethers.EventLog) => void): void;
    /** Subscribe to SettlementCompleted events */
    onSettlementCompleted(callback: (escrowId: bigint, userShare: bigint, protocolFee: bigint, agentRefund: bigint, event: ethers.EventLog) => void): void;
    /** Subscribe to PermissionRevoked events */
    onPermissionRevoked(callback: (permissionId: bigint, user: string, revokedAt: bigint, deleteBy: bigint, event: ethers.EventLog) => void): void;
    /** Subscribe to DisputeFiled events */
    onDisputeFiled(callback: (escrowId: bigint, disputant: string, reason: string, event: ethers.EventLog) => void): void;
    /** Remove all event listeners */
    removeAllListeners(): void;
}
/** Format a raw USDC amount (6 decimals) to a human-readable string */
export declare function formatUsdc(amount: bigint): string;
/** Parse a human-readable USDC string to raw amount (6 decimals) */
export declare function parseUsdc(amount: string | number): bigint;
//# sourceMappingURL=client.d.ts.map