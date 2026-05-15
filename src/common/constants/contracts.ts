// Puffer core contracts (Ethereum Mainnet)
export const PUFFER_VAULT_ADDRESS =
  '0xD9A442856C234a39a81a089C06451EBAa4306a72' as const;

// Token addresses (Ethereum Mainnet)
export const TOKENS = {
  pufETH: '0xd9a442856c234a39a81a089c06451ebaa4306a72',
  PUFFER: '0x4d1c297d39c5c1277964d0e3f8aa901493664530',
  WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  stETH: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
  wstETH: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
} as const;

// UniFi Vault addresses (Ethereum Mainnet)
export const UNIFI_VAULTS = {
  unifiETH: {
    vault: '0x196ead472583bc1e9af7a05f860d9857e1bd3dcc',
    accountant: '0xa9fb7e2922216debe3fd5e1bbe7591ee446dc21c',
    teller: '0x08eb2eccdf6ebd7aba601791f23ec5b5f68a1d53',
  },
  unifiUSD: {
    vault: '0x82c40e07277eBb92935f79cE92268F80dDc7caB4',
    accountant: '0xe0bDb7b9225A2CeB42998dc2E51D4D3CDeb7e3Be',
    teller: '0x5d3Fb47FE7f3F4Ce8fe55518f7E4F7D6061B54DD',
  },
  unifiBTC: {
    vault: '0x170d847a8320f3b6a77ee15b0cae430e3ec933a0',
    accountant: '0x2afb28b0561d99b5e00829ec2ef54946a00a35f7',
    teller: '0x0743647a607822781f9d0a639454e76289182f0b',
  },
  pufETHs: {
    vault: '0x62a4ce0722ee65635c0f8339dd814d549b6f6735',
    accountant: '0xa99a92c505ff92c543d9d48295f1f31024afb31f',
    teller: '0xd049ebeaa59b75ba8ee38f9f6830db7293320236',
  },
} as const;

// Minimal PufferVault ABI for on-chain reads
export const PUFFER_VAULT_ABI = [
  {
    inputs: [{ name: 'assets', type: 'uint256' }],
    name: 'previewDeposit',
    outputs: [{ name: 'shares', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'shares', type: 'uint256' }],
    name: 'convertToAssets',
    outputs: [{ name: 'assets', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalAssets',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
