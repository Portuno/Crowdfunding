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
    },
    methods: {
        async initWeb3() {
            // Verificar si Metamask est� instalado
            if (typeof window.ethereum !== 'undefined') {
                try {
                    // Solicitar acceso a la cuenta de Metamask
                    await window.ethereum.enable();
                    // Inicializar Web3
                    this.web3 = new Web3(window.ethereum);
                    // Obtener la cuenta del usuario
                    const accounts = await this.web3.eth.getAccounts();
                    this.account = accounts[0];
                    // Cargar el contrato inteligente
                    const contractAddress = 'ADDRESS_OF_YOUR_CONTRACT';
                    const contractABI = ABI_OF_YOUR_CONTRACT;
                    this.contract = new this.web3.eth.Contract(contractABI, contractAddress);
                    // Obtener las campa�as de crowdfunding
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
                // Obtener las campa�as del contrato inteligente
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
        async donate(campaignId) {
            try {
                // Realizar una donaci�n al contrato inteligente
                // Supongamos que la funci�n donateToCampaignInContract est� disponible en el contrato
                await this.contract.methods.donateToCampaign(campaignId).send({ from: this.account, value: 'AMOUNT_IN_WEI' });
                // Actualizar las campa�as despu�s de la donaci�n
                await this.getCampaigns();
                console.log('Donating to campaign with ID:', campaignId);
            } catch (error) {
                console.error('Error donating:', error);
            }
        },
        async claimRefund(campaignId) {
            try {
                // Reclamar un reembolso del contrato inteligente
                // Supongamos que la funci�n claimRefund est� disponible en el contrato
                await this.contract.methods.claimRefund(campaignId).send({ from: this.account });
                // Actualizar las campa�as despu�s de reclamar el reembolso
                await this.getCampaigns();
                console.log('Claiming refund for campaign with ID:', campaignId);
            } catch (error) {
                console.error('Error claiming refund:', error);
            }
        }
    }
});
const app = new Vue({
    el: '#app',
    data: {
        campaigns: [],
        web3: null,
        contract: null,
        account: null,
        loading: true,
        dailyClicks: { 'btn-crear-ahora': 0, 'btn-documentation': 0 },
        scrollSpeed: 0
    },
    mounted() {
        this.initWeb3();
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
                    const contractAddress = 'ADDRESS_OF_YOUR_CONTRACT';
                    const contractABI = ABI_OF_YOUR_CONTRACT;
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
            // Botones
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const buttonId = button.id;
                    if (buttonId in this.dailyClicks) {
                        this.dailyClicks[buttonId]++;
                        console.log(`Bot�n "${button.innerText}" clickeado`);
                    }
                });
            });

            // Scroll
            let scrollTimer = null;
            window.addEventListener('scroll', () => {
                if (scrollTimer !== null) {
                    clearTimeout(scrollTimer);
                }
                scrollTimer = setTimeout(() => {
                    this.calculateScrollSpeed();
                }, 100);
            });
        },
        calculateScrollSpeed() {
            const scrollDistance = window.scrollY;
            const scrollDuration = 0.1; // Duraci�n de la medici�n (en segundos)
            this.scrollSpeed = scrollDistance / scrollDuration;
            console.log('Velocidad de desplazamiento:', this.scrollSpeed.toFixed(2), 'px/seg');
        }
    }
});

    // Funci�n para manejar el clic en el bot�n "Crear Ahora"
                document.getElementById('btn-crear-ahora').addEventListener('click', function(createCampaign) {
        // Aqu� puedes agregar la l�gica que deseas ejecutar cuando se hace clic en el bot�n
        // Por ejemplo, podr�as redirigir a otra p�gina o mostrar un mensaje
                console.log('Creando...');
            });
        // Funci�n para manejar el clic en el bot�n "DONAR"
                document.getElementById().addEventListener('click', function(donate) {
        // Aqu� puedes agregar la l�gica que deseas ejecutar cuando se hace clic en el bot�n
        // Por ejemplo, podr�as redirigir a otra p�gina o mostrar un mensaje
                console.log('Ha donado :)');
            });
    // Funci�n para manejar el clic en el bot�n "Ver campa�as"
                document.getElementById('').addEventListener('click', function(getCampaign) {
        // Aqu� puedes agregar la l�gica que deseas ejecutar cuando se hace clic en el bot�n
        // Por ejemplo, podr�as redirigir a otra p�gina o mostrar un mensaje
                console.log('Ver campa�as');
            });
            // Funci�n para manejar el clic en el bot�n "Refund"
                document.getElementById('').addEventListener('click', function(claimRefund) {
        // Aqu� puedes agregar la l�gica que deseas ejecutar cuando se hace clic en el bot�n
        // Por ejemplo, podr�as redirigir a otra p�gina o mostrar un mensaje
                console.log('Bot�n rembolso clickeado');
            });
    // Funci�n para manejar el clic en el bot�n "Documentation"
                document.getElementById('btn-documentation').addEventListener('click', function() {
        // Aqu� puedes agregar la l�gica que deseas ejecutar cuando se hace clic en el bot�n
        // AQUI PUEDE REDIRIGIR A GITBOOK
                console.log('Bot�n "Documentation" clickeado');});

    document.getElementById("testimonio_button_left").addEventListener('click', function() {
        // Hacer testimonio
        document.getElementById("Testimonio2").style.display = "block";
        console.log('Bot�n "left" clickeado');
    });

    document.getElementById("testimonio_button_right").addEventListener('click', function() {
        // Hacer testimonio
        document.getElementById("Testimonio2").style.display = "block";
        console.log('Bot�n "right" clickeado');
    });


