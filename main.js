import {getWeb3} from './web3.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const web3 = await getWeb3();
        console.log("Web3 instance:", web3);
        // Here you can interact with smart contracts
    } catch (error) {
        console.error("Error initializing Web3:", error);
    }

    // Add other initializations and event listeners here
});
