import {getWeb3} from '../web3.js';


document.addEventListener('DOMContentLoaded', () => {
    const app = new Vue({
        el: '#app',
        data: {
            campaigns: [],
            web3: null,
            contract: null,
            account: null,
            loading: true,
            metamaskConnected: false,
        },
        mounted() {
            this.attachEventListeners();
        },
        methods: {
            async initWeb3() {
                if (typeof window.ethereum !== 'undefined') {
                    try {
                        await window.ethereum.enable();
                        this.web3 = new Web3(window.ethereum);
                        const accounts = await this.web3.eth.getAccounts();
                        this.account = accounts[0];
                        const contractAddress = '0xb2c379b6d3792c81fd003c8294fb6534583eeebe';
                        const contractABI = [
                              {
                                "inputs": [
                                  {
                                    "internalType": "uint256",
                                    "name": "_id",
                                    "type": "uint256"
                                  }
                                ],
                                "name": "claimRefund",
                                "outputs": [],
                                "stateMutability": "nonpayable",
                                "type": "function"
                              },
                              {
                                "inputs": [
                                  {
                                    "internalType": "address",
                                    "name": "_owner",
                                    "type": "address"
                                  },
                                  {
                                    "internalType": "string",
                                    "name": "_title",
                                    "type": "string"
                                  },
                                  {
                                    "internalType": "string",
                                    "name": "_description",
                                    "type": "string"
                                  },
                                  {
                                    "internalType": "uint256",
                                    "name": "_target",
                                    "type": "uint256"
                                  },
                                  {
                                    "internalType": "uint256",
                                    "name": "_deadline",
                                    "type": "uint256"
                                  },
                                  {
                                    "internalType": "string",
                                    "name": "_image",
                                    "type": "string"
                                  }
                                ],
                                "name": "createCampaign",
                                "outputs": [
                                  {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                  }
                                ],
                                "stateMutability": "nonpayable",
                                "type": "function"
                              },
                              {
                                "inputs": [
                                  {
                                    "internalType": "uint256",
                                    "name": "_id",
                                    "type": "uint256"
                                  }
                                ],
                                "name": "donateToCampaign",
                                "outputs": [],
                                "stateMutability": "payable",
                                "type": "function"
                              },
                              {
                                "inputs": [
                                  {
                                    "internalType": "uint256",
                                    "name": "_id",
                                    "type": "uint256"
                                  }
                                ],
                                "name": "withdrawFunds",
                                "outputs": [],
                                "stateMutability": "nonpayable",
                                "type": "function"
                              },
                              {
                                "inputs": [
                                  {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                  }
                                ],
                                "name": "Campaigns",
                                "outputs": [
                                  {
                                    "internalType": "address",
                                    "name": "owner",
                                    "type": "address"
                                  },
                                  {
                                    "internalType": "string",
                                    "name": "title",
                                    "type": "string"
                                  },
                                  {
                                    "internalType": "string",
                                    "name": "description",
                                    "type": "string"
                                  },
                                  {
                                    "internalType": "uint256",
                                    "name": "target",
                                    "type": "uint256"
                                  },
                                  {
                                    "internalType": "uint256",
                                    "name": "deadline",
                                    "type": "uint256"
                                  },
                                  {
                                    "internalType": "uint256",
                                    "name": "amountCollected",
                                    "type": "uint256"
                                  },
                                  {
                                    "internalType": "string",
                                    "name": "image",
                                    "type": "string"
                                  }
                                ],
                                "stateMutability": "view",
                                "type": "function"
                              },
                              {
                                "inputs": [
                                  {
                                    "internalType": "uint256",
                                    "name": "_id",
                                    "type": "uint256"
                                  }
                                ],
                                "name": "getCampaign",
                                "outputs": [
                                  {
                                    "internalType": "address",
                                    "name": "",
                                    "type": "address"
                                  },
                                  {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                  },
                                  {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                  },
                                  {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                  },
                                  {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                  },
                                  {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                  },
                                  {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                  },
                                  {
                                    "internalType": "address[]",
                                    "name": "",
                                    "type": "address[]"
                                  },
                                  {
                                    "internalType": "uint256[]",
                                    "name": "",
                                    "type": "uint256[]"
                                  }
                                ],
                                "stateMutability": "view",
                                "type": "function"
                              },
                              {
                                "inputs": [],
                                "name": "getNumberOfCampaigns",
                                "outputs": [
                                  {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                  }
                                ],
                                "stateMutability": "view",
                                "type": "function"
                              },
                              {
                                "inputs": [],
                                "name": "numberOfCampaigns",
                                "outputs": [
                                  {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                  }
                                ],
                            
                            "stateMutability": "view",
                                "type": "function"
                              }
                            ];
                        this.contract = new this.web3.eth.Contract(contractABI, contractAddress);
                        await this.getCampaigns();
                        this.loading = false;
                    } catch (error) {
                        console.error('Error initializing Web3:', error);
                    }
                } else {
                    console.error('Metamask is not installed');
                }
            },
            async connectMetamask() {
                if (typeof window.ethereum !== 'undefined') {
                    try {
                        await window.ethereum.request({ method: 'eth_requestAccounts' });
                        this.web3 = new Web3(window.ethereum);
                        const accounts = await this.web3.eth.getAccounts();
                        this.account = accounts[0];
                        const chainId = await this.web3.eth.getChainId();

                        if (chainId !== 31) { // Rootstock Testnet chain ID is 31
                            try {
                                await window.ethereum.request({
                                    method: 'wallet_switchEthereumChain',
                                    params: [{ chainId: '0x1f' }],
                                });
                            } catch (switchError) {
                                if (switchError.code === 4902) {
                                    await window.ethereum.request({
                                        method: 'wallet_addEthereumChain',
                                        params: [{
                                            chainId: '0x1f',
                                            rpcUrls: ['https://public-node.testnet.rsk.co'],
                                            chainName: 'Rootstock Testnet',
                                            nativeCurrency: {
                                                name: 'tR-BTC',
                                                symbol: 'tR-BTC',
                                                decimals: 18,
                                            },
                                            blockExplorerUrls: ['https://explorer.testnet.rsk.co'],
                                        }],
                                    });
                                }
                            }
                        }

                        this.metamaskConnected = true;
                        document.getElementById('metamask_button').innerText = `${this.account.substring(0, 3)}...${this.account.substring(this.account.length - 4)}`;
                        await this.getCampaigns();
                    } catch (error) {
                        console.error('Error connecting to Metamask:', error);
                    }
                } else {
                    console.error('Metamask is not installed');
                }
            },
            async getCampaigns() {
                try {
                    const campaignsCount = await this.contract.methods.getNumberOfCampaigns().call();
                    const campaigns = [];
                    for (let i = 0; i < campaignsCount; i++) {
                        const campaign = await this.contract.methods.getCampaign(i).call();
                        campaigns.push({
                            id: i,
                            title: campaign[1],
                            description: campaign[2],
                            target: campaign[3],
                            deadline: new Date(campaign[4] * 1000).toLocaleDateString(),
                            amountCollected: campaign[5]
                        });
                    }
                    this.campaigns = campaigns;
                } catch (error) {
                    console.error('Error getting campaigns:', error);
                }
            },
            async donate(campaignId, amountInWei) {
                try {
                    await this.contract.methods.donateToCampaign(campaignId).send({ from: this.account, value: amountInWei });
                    await this.getCampaigns();
                    console.log('Donating to campaign with ID:', campaignId);
                } catch (error) {
                    console.error('Error donating:', error);
                }
            },
            async claimRefund(campaignId) {
                try {
                    await this.contract.methods.claimRefund(campaignId).send({ from: this.account });
                    await this.getCampaigns();
                    console.log('Claiming refund for campaign with ID:', campaignId);
                } catch (error) {
                    console.error('Error claiming refund:', error);
                }
            },
            attachEventListeners() {
                document.getElementById('metamask_button').addEventListener('click', this.connectMetamask);
                // Add other event listeners here as needed
            }
        }
    });
});
