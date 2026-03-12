// ─── On-chain enums ───────────────────────────────────────────────────
export var PermissionStatus;
(function (PermissionStatus) {
    PermissionStatus[PermissionStatus["INACTIVE"] = 0] = "INACTIVE";
    PermissionStatus[PermissionStatus["ACTIVE"] = 1] = "ACTIVE";
    PermissionStatus[PermissionStatus["REVOKED"] = 2] = "REVOKED";
    PermissionStatus[PermissionStatus["EXPIRED"] = 3] = "EXPIRED";
})(PermissionStatus || (PermissionStatus = {}));
export var EscrowStatus;
(function (EscrowStatus) {
    EscrowStatus[EscrowStatus["NONE"] = 0] = "NONE";
    EscrowStatus[EscrowStatus["FUNDED"] = 1] = "FUNDED";
    EscrowStatus[EscrowStatus["OUTCOME_REPORTED"] = 2] = "OUTCOME_REPORTED";
    EscrowStatus[EscrowStatus["DISPUTED"] = 3] = "DISPUTED";
    EscrowStatus[EscrowStatus["SETTLED"] = 4] = "SETTLED";
    EscrowStatus[EscrowStatus["REFUNDED"] = 5] = "REFUNDED";
})(EscrowStatus || (EscrowStatus = {}));
// ─── Data categories (matches SKILL.md) ──────────────────────────────
export const DATA_CATEGORIES = [
    "purchase_intent",
    "browsing",
    "location",
    "demographics",
    "health",
    "financial",
    "preferences",
];
/** Typical price ranges per category in USD (from SKILL.md) */
export const PRICE_RANGES = {
    purchase_intent: { min: 0.25, max: 2.0 },
    browsing: { min: 0.10, max: 0.50 },
    location: { min: 0.50, max: 3.0 },
    demographics: { min: 0.15, max: 0.75 },
    health: { min: 1.0, max: 5.0 },
    financial: { min: 0.50, max: 3.0 },
    preferences: { min: 0.10, max: 0.40 },
};
// ─── Protocol constants (must match Prmission.sol) ──────────────────
/** 3% protocol fee = 300 basis points. Non-negotiable. */
export const PROTOCOL_FEE_BPS = 300n;
export const BPS_DENOMINATOR = 10000n;
export const DISPUTE_WINDOW_SECONDS = 86_400; // 24 hours
export const REVOCATION_GRACE_SECONDS = 60;
export const USDC_DECIMALS = 6;
// ─── Known addresses ─────────────────────────────────────────────────
export const ADDRESSES = {
    /** USDC on Base mainnet */
    USDC_BASE: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    /** USDC on Base Sepolia testnet */
    USDC_BASE_SEPOLIA: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
};
//# sourceMappingURL=types.js.map