export declare enum PermissionStatus {
    INACTIVE = 0,
    ACTIVE = 1,
    REVOKED = 2,
    EXPIRED = 3
}
export declare enum EscrowStatus {
    NONE = 0,
    FUNDED = 1,
    OUTCOME_REPORTED = 2,
    DISPUTED = 3,
    SETTLED = 4,
    REFUNDED = 5
}
export interface Permission {
    user: string;
    merchant: string;
    dataCategory: string;
    purpose: string;
    compensationBps: bigint;
    upfrontFee: bigint;
    validUntil: bigint;
    status: PermissionStatus;
    createdAt: bigint;
}
export interface Escrow {
    permissionId: bigint;
    agent: string;
    agentId: bigint;
    amount: bigint;
    outcomeValue: bigint;
    outcomeType: string;
    outcomeDescription: string;
    reportedAt: bigint;
    status: EscrowStatus;
    createdAt: bigint;
}
export interface PermissionDetails extends Permission {
    permissionId: bigint;
    isActive: boolean;
    isExpired: boolean;
    expiresIn: number;
}
export interface EscrowDetails extends Escrow {
    escrowId: bigint;
    disputeWindowEnd: bigint;
    isDisputable: boolean;
    isSettleable: boolean;
}
export interface SettlementPreview {
    userShare: bigint;
    protocolFee: bigint;
    agentRefund: bigint;
    disputeWindowEnd: bigint;
    /** Human-readable formatted amounts (USDC, 6 decimals) */
    formatted: {
        userShare: string;
        protocolFee: string;
        agentRefund: string;
    };
}
export interface AgentTrustProfile {
    registered: boolean;
    authorized: boolean;
    reputable: boolean;
    repScore: bigint;
    repCount: bigint;
}
export interface AccessCheck {
    permitted: boolean;
    compensationBps: bigint;
    upfrontFee: bigint;
    validUntil: bigint;
}
export interface PrmissionConfig {
    /** Prmission contract address on Base */
    contractAddress: string;
    /** RPC URL or ethers provider */
    rpcUrl?: string;
    /** Chain ID (8453 for Base mainnet, 84532 for Base Sepolia) */
    chainId?: number;
}
export declare const DATA_CATEGORIES: readonly ["purchase_intent", "browsing", "location", "demographics", "health", "financial", "preferences"];
export type DataCategory = (typeof DATA_CATEGORIES)[number];
/** Typical price ranges per category in USD (from SKILL.md) */
export declare const PRICE_RANGES: Record<DataCategory, {
    min: number;
    max: number;
}>;
/** 3% protocol fee = 300 basis points. Non-negotiable. */
export declare const PROTOCOL_FEE_BPS = 300n;
export declare const BPS_DENOMINATOR = 10000n;
export declare const DISPUTE_WINDOW_SECONDS = 86400;
export declare const REVOCATION_GRACE_SECONDS = 60;
export declare const USDC_DECIMALS = 6;
export declare const ADDRESSES: {
    /** USDC on Base mainnet */
    readonly USDC_BASE: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
    /** USDC on Base Sepolia testnet */
    readonly USDC_BASE_SEPOLIA: "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
};
//# sourceMappingURL=types.d.ts.map