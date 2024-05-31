# Crowdfunding Smart Contract

Este proyecto implementa una plataforma de crowdfunding utilizando contratos inteligentes en la blockchain de Ethereum. El objetivo es permitir a los usuarios crear campañas de crowdfunding, contribuir a campañas existentes y gestionar los fondos de manera transparente y segura.

# Características

- **Crear Campañas:** Los usuarios pueden crear nuevas campañas de crowdfunding especificando un objetivo de financiamiento y una fecha límite.
- **Contribuir a Campañas:** Los usuarios pueden contribuir a las campañas con Ether.
- **Retirar Fondos:** El creador de la campaña puede retirar los fondos recaudados si se alcanza el objetivo de financiamiento dentro del tiempo límite.
- **Reembolsos:** Si la campaña no alcanza su objetivo de financiamiento, los contribuyentes pueden retirar sus contribuciones.

# Tecnologías Utilizadas

- **Solidity:** Lenguaje de programación para contratos inteligentes.
- **Hardhat:** Entorno de desarrollo para Ethereum.
- **React:** Biblioteca de JavaScript para la construcción de interfaces de usuario.
- **Ethers.js:** Biblioteca para interactuar con la blockchain de Ethereum.
- **Metamask:** Extensión de navegador para interactuar con Ethereum.

# Requisitos Previos

- Node.js
- npm o yarn
- Metamask

# Instalación

1. Clona el repositorio:

    ```sh
    git clone https://github.com/legosiOriginal/crowdfunding-smart-contract.git
    cd crowdfunding-smart-contract
    ```

2. Instala las dependencias del proyecto:

    ```sh
    npm install
    ```

    o

    ```sh
    yarn install
    ```

3. Compila los contratos inteligentes:

    ```sh
    npx hardhat compile
    ```

4. Despliega los contratos en una red de prueba (por ejemplo, Rinkeby):

    ```sh
    npx hardhat run scripts/deploy.js --network rinkeby
    ```

5. Inicia la aplicación web:

    ```sh
    npm start
    ```

    o

    ```sh
    yarn start
    ```

# Uso

1. Abre Metamask y conéctate a la red de prueba que estás utilizando (por ejemplo, Rinkeby).
2. Abre la aplicación web en tu navegador.
3. Crea una nueva campaña de crowdfunding especificando el objetivo de financiamiento y la fecha límite.
4. Contribuye a una campaña existente ingresando la cantidad de Ether que deseas donar.
5. Si eres el creador de una campaña y se ha alcanzado el objetivo de financiamiento, puedes retirar los fondos.
6. Si una campaña no alcanza su objetivo, los contribuyentes pueden retirar sus contribuciones.

# Estructura del Proyecto

- `contracts/`: Contratos inteligentes en Solidity.
- `scripts/`: Scripts para desplegar los contratos.
- `test/`: Pruebas para los contratos inteligentes.
- `src/`: Código fuente de la aplicación web.

# Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que desees realizar.

# Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

# Contacto

- **Autor:** legosiOriginal
- **Correo Electrónico:** legosi.btc@gmail.com
