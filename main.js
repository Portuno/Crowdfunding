import { connectProviderTo } from './app.js';
import { getWeb3 } from './web3.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const web3 = await getWeb3();
        console.log("Web3 instance:", web3);
        // Aquí puedes realizar operaciones de Web3, como interactuar con contratos inteligentes, etc.
    } catch (error) {
        console.error("Error initializing Web3:", error);
    }

    // Agregar otras inicializaciones y event listeners aquí
});
