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
            // Verificar si Metamask está instalado
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
        async donate(campaignId) {
            try {
                // Realizar una donación al contrato inteligente
                // Supongamos que la función donateToCampaignInContract está disponible en el contrato
                await this.contract.methods.donateToCampaign(campaignId).send({ from: this.account, value: 'AMOUNT_IN_WEI' });
                // Actualizar las campañas después de la donación
                await this.getCampaigns();
                console.log('Donating to campaign with ID:', campaignId);
            } catch (error) {
                console.error('Error donating:', error);
            }
        },
        async claimRefund(campaignId) {
            try {
                // Reclamar un reembolso del contrato inteligente
                // Supongamos que la función claimRefund está disponible en el contrato
                await this.contract.methods.claimRefund(campaignId).send({ from: this.account });
                // Actualizar las campañas después de reclamar el reembolso
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
                        console.log(`Botón "${button.innerText}" clickeado`);
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
            const scrollDuration = 0.1; // Duración de la medición (en segundos)
            this.scrollSpeed = scrollDistance / scrollDuration;
            console.log('Velocidad de desplazamiento:', this.scrollSpeed.toFixed(2), 'px/seg');
        }
    }
});

    // Función para manejar el clic en el botón "Crear Ahora"
                document.getElementById('btn-crear-ahora').addEventListener('click', function(createCampaign) {
        // Aquí puedes agregar la lógica que deseas ejecutar cuando se hace clic en el botón
        // Por ejemplo, podrías redirigir a otra página o mostrar un mensaje
                console.log('Creando...');
            });
        // Función para manejar el clic en el botón "DONAR"
                document.getElementById().addEventListener('click', function(donate) {
        // Aquí puedes agregar la lógica que deseas ejecutar cuando se hace clic en el botón
        // Por ejemplo, podrías redirigir a otra página o mostrar un mensaje
                console.log('Ha donado :)');
            });
    // Función para manejar el clic en el botón "Ver campañas"
                document.getElementById('').addEventListener('click', function(getCampaign) {
        // Aquí puedes agregar la lógica que deseas ejecutar cuando se hace clic en el botón
        // Por ejemplo, podrías redirigir a otra página o mostrar un mensaje
                console.log('Ver campañas');
            });
            // Función para manejar el clic en el botón "Refund"
                document.getElementById('').addEventListener('click', function(claimRefund) {
        // Aquí puedes agregar la lógica que deseas ejecutar cuando se hace clic en el botón
        // Por ejemplo, podrías redirigir a otra página o mostrar un mensaje
                console.log('Botón rembolso clickeado');
            });
    // Función para manejar el clic en el botón "Documentation"
                document.getElementById('btn-documentation').addEventListener('click', function() {
        // Aquí puedes agregar la lógica que deseas ejecutar cuando se hace clic en el botón
        // AQUI PUEDE REDIRIGIR A GITBOOK
                console.log('Botón "Documentation" clickeado');});

    document.getElementById("testimonio_button_left").addEventListener('click', function() {
        // Hacer testimonio
        document.getElementById("Testimonio2").style.display = "block";
        console.log('Botón "left" clickeado');
    });

    document.getElementById("testimonio_button_right").addEventListener('click', function() {
        // Hacer testimonio
        document.getElementById("Testimonio2").style.display = "block";
        console.log('Botón "right" clickeado');
    });


