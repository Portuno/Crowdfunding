
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        mapping(address => uint256) donatedAmount; 
    }
// Nuevo mapeo para almacenar la cantidad donada por cada dirección
    mapping(uint256 => Campaign) public Campaigns;
    uint256 public numberOfCampaigns = 0;

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        Campaign storage campaign = Campaigns[numberOfCampaigns];
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = Campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);
        campaign.donatedAmount[msg.sender] += amount; // Actualiza la cantidad donada por el donante

        campaign.amountCollected += amount;
    }

    function withdrawFunds(uint256 _id) public {
        Campaign storage campaign = Campaigns[_id];
        require(campaign.owner == msg.sender, "Only the campaign owner can withdraw funds.");
        require(campaign.amountCollected >= campaign.target, "Funds cannot be withdrawn until the target is reached.");

        uint256 amountToWithdraw = campaign.amountCollected;
        campaign.amountCollected = 0; // Reinicia la cantidad recolectada

        payable(campaign.owner).transfer(amountToWithdraw); // Transfiere los fondos al propietario
    }

    function claimRefund(uint256 _id) public {
        Campaign storage campaign = Campaigns[_id];
        require(campaign.deadline < block.timestamp, "Refunds can only be claimed after the campaign deadline.");
        require(campaign.amountCollected < campaign.target, "Refunds are only available if the target is not reached.");

        uint256 amountToRefund = campaign.donatedAmount[msg.sender]; // Obtiene la cantidad donada por el usuario
        campaign.donatedAmount[msg.sender] = 0; // Reinicia la cantidad donada por el usuario
        campaign.amountCollected -= amountToRefund; // Actualiza la cantidad recolectada

        payable(msg.sender).transfer(amountToRefund); // Transfiere los fondos al donante
    }

    function getCampaign(uint256 _id) public view returns (address, string memory, string memory, uint256, uint256, uint256, string memory, address[] memory, uint256[] memory) {
        Campaign storage campaign = Campaigns[_id];
        return (campaign.owner, campaign.title, campaign.description, campaign.target, campaign.deadline, campaign.amountCollected, campaign.image, campaign.donators, campaign.donations);
    }

    function getNumberOfCampaigns() public view returns (uint256) {
        return numberOfCampaigns;
    }
}
