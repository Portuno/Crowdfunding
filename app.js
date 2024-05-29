import getWeb3 from './web3.js';

function openNewWindow(url) {
    window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new Vue({
        el: '#app',
        data: {
            campaigns: [],
            web3: null,
            contract: null,
            account: null,
            loading: true
        },
        mounted() {
            this.initWeb3();
            this.attachEventListeners();
        },
        methods: {
            async initWeb3() {
                // Verificar si MetaMask está instalado
                if (typeof window.ethereum !== 'undefined') {
                    try {
                        // Solicitar acceso a la cuenta de MetaMask
                        await window.ethereum.enable();
                        // Inicializar Web3
                        this.web3 = new Web3(window.ethereum);
                        // Obtener la cuenta del usuario
                        const accounts = await this.web3.eth.getAccounts();
                        this.account = accounts[0];
                        // Cargar el contrato inteligente
                        const contractAddress = '0x1459CBD71a9298AA1f57fAee1fBaA49079f561f4';
                        const contractABI = ABI_OF_YOUR_CONTRACT;
                        this.contract = new this.web3.eth.Contract(contractABI, contractAddress);
                        // Obtener las campañas de crowdfunding
                        await this.getCampaigns();
                        this.loading = false;
                    } catch (error) {
                        console.error('Error initializing Web3:', error);
                    }
                } else {
                    console.error('Metamask is not installed');
                }
            },
            async getCampaigns() {
                try {
                    // Obtener las campañas del contrato inteligente
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
                const metamaskButton = document.getElementById('metamask_button');
                const mainnetButton = document.getElementById('connect-mainnet');
                const crearAhoraButton = document.getElementById('btn-crear-ahora');
                const donateButton = document.getElementById('btn-donate');
                const verCampañasButton = document.getElementById('btn-ver-campañas');
                const refundButton = document.getElementById('btn-refund');
                const documentationButton = document.getElementById('btn-documentation');
                const testimonioButtonLeft = document.getElementById('testimonio_button_left');
                const testimonioButtonRight = document.getElementById('testimonio_button_right');
                const testimonio2 = document.getElementById('Testimonio2');

                if (metamaskButton && mainnetButton && crearAhoraButton && donateButton && verCampañasButton && refundButton && documentationButton && testimonioButtonLeft && testimonioButtonRight && testimonio2) {
                    metamaskButton.addEventListener('click', () => connectProviderTo(rskTestnet));
                    mainnetButton.addEventListener('click', () => connectProviderTo(rskMainnet));
                    crearAhoraButton.addEventListener('click', () => {
                        console.log('Creando...');
                    });
                    donateButton.addEventListener('click', () => {
                        console.log('Ha donado :)');
                    });
                    verCampañasButton.addEventListener('click', () => {
                        console.log('Ver campañas');
                    });
                    refundButton.addEventListener('click', () => {
                        console.log('Botón reembolso clickeado');
                    });
                    documentationButton.addEventListener('click', () => {
                        console.log('Botón "Documentation" clickeado');
                    });
                    testimonioButtonLeft.addEventListener('click', () => {
                        testimonio2.style.display = 'block';
                        console.log('Botón "left" clickeado');
                    });
                    testimonioButtonRight.addEventListener('click', () => {
                        testimonio2.style.display = 'block';
                        console.log('Botón "right" clickeado');
                    });
                } else {
                    console.error('Uno o más elementos no encontrados');
                }
                {
                    

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const web3 = await getWeb3();
    console.log("Web3 instance:", web3);
    // Aquí puedes realizar operaciones de Web3, como interactuar con contratos inteligentes, etc.
  } catch (error) {
    console.error("Error initializing Web3:", error);
  }
});

                }
            }
        }
    });
});