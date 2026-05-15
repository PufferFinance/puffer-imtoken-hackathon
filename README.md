# Puffer x imToken Hackathon - Developer Resources

Developer API and resources for the [imToken 10th Anniversary AI Co-Creation Campaign](https://10.token.im/#cocreation).

## What's Inside

- **Public API** - Endpoints for pufETH rates, vault APYs, TVL, token prices, and gauge APR data
- **SDK examples** - Code snippets using `@pufferfinance/puffer-sdk` for staking, vault deposits, and on-chain reads
- **Contract addresses** - All mainnet addresses for PufferVault, UniFi vaults, and key tokens

## Challenge Direction

**Base challenge:** Build an imToken-compatible Puffer staking mini app - connect wallet, stake ETH/stETH/wstETH to mint pufETH, display pufETH balance/rate and selected Puffer UniFi Vault opportunities, and guide users through a safe participation flow.

**Advanced challenge:** Integrate a DEX aggregator to accept any token, swap to ETH/WETH, and deposit into PufferVault in a single transaction.

## API Reference

**Base URL:** `https://<deployed-url>`

All endpoints are public. Rate limited to 100 requests per 15 minutes per IP.

### Endpoints

| Endpoint                    | Method | Description                                       |
| --------------------------- | ------ | ------------------------------------------------- |
| `/pufeth/rate`              | GET    | pufETH/ETH exchange rate (live on-chain)          |
| `/pufeth/metrics`           | GET    | pufETH market cap, daily volume, holder count     |
| `/vaults/apy`               | GET    | APY for all UniFi vaults                          |
| `/vaults/tvl`               | GET    | TVL breakdown per UniFi vault                     |
| `/protocol/tvl`             | GET    | Protocol-wide TVL + pufETH staking APY            |
| `/tokens/prices?addresses=` | GET    | USD prices for token addresses (separated by `%`) |
| `/gauges/apr?identifier=`   | GET    | APR for a gauge/opportunity by contract address   |
| `/health`                   | GET    | Health check                                      |

Interactive API docs are available at `/docs` (Swagger UI).

### Example Request

```bash
curl https://<deployed-url>/pufeth/rate
```

```json
{
  "pufEthPerEth": "0.959",
  "ethPerPufEth": "1.042",
  "totalAssets": "450000.123",
  "totalSupply": "432000.456"
}
```

## Puffer SDK

The [`@pufferfinance/puffer-sdk`](https://www.npmjs.com/package/@pufferfinance/puffer-sdk) handles all on-chain interactions - staking, vault deposits, balance checks, and more.

```bash
npm install @pufferfinance/puffer-sdk
```

Full SDK docs: https://pufferfinance.github.io/puffer-sdk/

### Quick Examples

**Stake ETH to get pufETH:**

```typescript
import {
  PufferClientHelpers,
  PufferClient,
  Chain,
} from '@pufferfinance/puffer-sdk';

const walletClient = PufferClientHelpers.createWalletClient({
  chain: Chain.Mainnet,
  provider: window.ethereum,
});
const publicClient = PufferClientHelpers.createPublicClient({
  chain: Chain.Mainnet,
  rpcUrls: ['https://your-rpc-url'],
});

const pufferClient = new PufferClient(
  Chain.Mainnet,
  walletClient,
  publicClient,
);

// Deposit ETH → receive pufETH
const [walletAddress] = await pufferClient.requestAddresses();
const { transact, estimate } = pufferClient.vault.depositETH(walletAddress);
const gasEstimate = await estimate();
const txHash = await transact(BigInt(1e18)); // 1 ETH
```

**Get pufETH exchange rate:**

```typescript
const rate = await pufferClient.vault.getPufETHRate();
// Returns BigInt: amount of pufETH per 1 ETH (18 decimals)
```

**Check pufETH balance:**

```typescript
const balance = await pufferClient.vault.balanceOf('0xYourAddress');
```

**Deposit into a UniFi vault (e.g., unifiETH):**

```typescript
import { UnifiToken, Token } from '@pufferfinance/puffer-sdk';

const { transact } = await pufferClient.nucleusTeller
  .withToken(UnifiToken.unifiETH)
  .deposit({
    account: walletAddress,
    token: Token.WETH,
    unifiToken: UnifiToken.unifiETH,
    amount: BigInt(1e18),
    minimumMint: BigInt(0),
    isPreapproved: false,
  });

const txHash = await transact();
```

## Contract Addresses (Ethereum Mainnet)

### Core

| Contract             | Address                                      |
| -------------------- | -------------------------------------------- |
| PufferVault (pufETH) | `0xD9A442856C234a39a81a089C06451EBAa4306a72` |

### Tokens

| Token  | Address                                      |
| ------ | -------------------------------------------- |
| pufETH | `0xd9a442856c234a39a81a089c06451ebaa4306a72` |
| PUFFER | `0x4d1c297d39c5c1277964d0e3f8aa901493664530` |
| WETH   | `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2` |
| stETH  | `0xae7ab96520de3a18e5e111b5eaab095312d7fe84` |
| wstETH | `0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0` |

### UniFi Vaults

| Vault    | Vault Address                                | Teller Address                               |
| -------- | -------------------------------------------- | -------------------------------------------- |
| unifiETH | `0x196ead472583bc1e9af7a05f860d9857e1bd3dcc` | `0x08eb2eccdf6ebd7aba601791f23ec5b5f68a1d53` |
| unifiUSD | `0x82c40e07277eBb92935f79cE92268F80dDc7caB4` | `0x5d3Fb47FE7f3F4Ce8fe55518f7E4F7D6061B54DD` |
| unifiBTC | `0x170d847a8320f3b6a77ee15b0cae430e3ec933a0` | `0x0743647a607822781f9d0a639454e76289182f0b` |
| pufETHs  | `0x62a4ce0722ee65635c0f8339dd814d549b6f6735` | `0xd049ebeaa59b75ba8ee38f9f6830db7293320236` |

## APY Calculation

**pufETH staking APY** is derived from the pufETH/ETH exchange rate growth over time. As validators earn rewards, `totalAssets` in the PufferVault increases while `totalSupply` of pufETH stays the same, causing the rate to appreciate.

**UniFi vault APYs** are calculated by the Nucleus protocol based on vault share price changes over configurable lookback periods (7, 14, 30, 60 days), annualized.

## Running the API Locally

```bash
git clone <this-repo>
cd puffer-imtoken-hackathon
pnpm install
cp .env.example .env
# Fill in .env values
pnpm dev
```

Server starts at `http://localhost:8080`. Swagger docs at `http://localhost:8080/docs`.

## Docker

```bash
docker build -t puffer-imtoken-hackathon .
docker run -p 8080:8080 --env-file .env puffer-imtoken-hackathon
```

## Links

- [Puffer SDK (npm)](https://www.npmjs.com/package/@pufferfinance/puffer-sdk)
- [Puffer SDK Docs](https://pufferfinance.github.io/puffer-sdk/)
- [imToken Co-Creation Campaign](https://10.token.im/#cocreation)
- [Puffer Finance](https://www.puffer.fi)
