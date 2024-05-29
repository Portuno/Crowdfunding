
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

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        Campaign storage newCampaign = campaigns[numberOfCampaigns];
        
        newCampaign.owner = _owner;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.target = _target;
        newCampaign.deadline = _deadline;
        newCampaign.amountCollected = 0;
        newCampaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        require(_id < numberOfCampaigns, "Campaign does not exist.");
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);
        campaign.donatedAmount[msg.sender] += amount;

        campaign.amountCollected += amount;
    }

    function withdrawFunds(uint256 _id) public {
        require(_id < numberOfCampaigns, "Campaign does not exist.");
        Campaign storage campaign = campaigns[_id];
        require(campaign.owner == msg.sender, "Only the campaign owner can withdraw funds.");
        require(campaign.amountCollected >= campaign.target, "Funds cannot be withdrawn until the target is reached.");

        uint256 amountToWithdraw = campaign.amountCollected;
        campaign.amountCollected = 0;

        payable(campaign.owner).transfer(amountToWithdraw);
    }

    function claimRefund(uint256 _id) public {
        require(_id < numberOfCampaigns, "Campaign does not exist.");
        Campaign storage campaign = campaigns[_id];
        require(campaign.deadline < block.timestamp, "Refunds can only be claimed after the campaign deadline.");
        require(campaign.amountCollected < campaign.target, "Refunds are only available if the target is not reached.");

        uint256 amountToRefund = campaign.donatedAmount[msg.sender];
        campaign.donatedAmount[msg.sender] = 0;
        campaign.amountCollected -= amountToRefund;

        payable(msg.sender).transfer(amountToRefund);
    }

    function getCampaign(uint256 _id) public view returns (address, string memory, string memory, uint256, uint256, uint256, string memory, address[] memory, uint256[] memory) {
        require(_id < numberOfCampaigns, "Campaign does not exist.");
        Campaign storage campaign = campaigns[_id];
        return (campaign.owner, campaign.title, campaign.description, campaign.target, campaign.deadline, campaign.amountCollected, campaign.image, campaign.donators, campaign.donations);
    }

    function getNumberOfCampaigns() public view returns (uint256) {
        return numberOfCampaigns;
    }
}
