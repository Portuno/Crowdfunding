import Web3 from './main';

export const rskTestnet = {
  chainName: 'Rootstock Testnet',
  chainId: '0x1f',
  rpcUrls: ['https://public-node.testnet.rsk.co'],
  blockExplorerUrls: ['https://explorer.testnet.rsk.co/'],
  nativeCurrency: {
    symbol: 'tRBTC',
    decimals: 18,
  },
};

const RSK_TESTNET_CHAIN_ID = '0x1f'; // Hexadecimal representation of 31 (Rootstock Testnet chain ID)
const RSK_TESTNET_RPC_URL = 'https://public-node.testnet.rsk.co';

export const getWeb3 = async () => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      console.log('Requesting accounts...');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Accounts requested.');
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      console.log(`Connected to chain ID: ${chainId}`);
      if (chainId !== RSK_TESTNET_CHAIN_ID) {
        console.log('Switching to Rootstock Testnet...');
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: RSK_TESTNET_CHAIN_ID }],
          });
          console.log('Switched to Rootstock Testnet.');
        } catch (switchError) {
          if (switchError.code === 4902) {
            console.log('Rootstock Testnet not found, adding...');
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: RSK_TESTNET_CHAIN_ID,
                rpcUrl: RSK_TESTNET_RPC_URL,
                chainName: 'RSK Testnet',
                nativeCurrency: {
                  name: 'tR-BTC',
                  symbol: 'tR-BTC',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://explorer.testnet.rsk.co'],
              }],
            });
            console.log('Rootstock Testnet added.');
          }
        }
      }
      return web3;
    } catch (error) {
      console.error('Failed to enable accounts or switch networks:', error);
      throw error;
    }
  } else if (window.web3) {
    const web3 = window.web3;
    console.log('Injected web3 detected.');
    return web3;
  } else {
    const provider = new Web3.providers.HttpProvider(RSK_TESTNET_RPC_URL);
    const web3 = new Web3(provider);
    console.log('No web3 instance injected, using Local web3.');
    return web3;
  }
};
