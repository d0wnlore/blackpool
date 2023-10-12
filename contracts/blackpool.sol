pragma solidity ^0.8.0;

contract SiteList {
    address public owner;

    struct Site {
        string url;
        bool exists;
    }

    mapping(address => Site[]) public addrSites;

    constructor() {
        owner = msg.sender;
    }

    function addSite(string calldata url) public {
        addrSites[msg.sender].push(Site(url, true));
    }

    function getSite(address addr, uint index) public view returns (string memory) {
        require(index < addrSites[addr].length, "Site does not exist");
        return addrSites[addr][index].url;
    }

    function getMySiteCount() public view returns (uint) {
        return addrSites[msg.sender].length;
    }

    function getAllSites(address addr) public view returns (string[] memory) {
        uint len = addrSites[addr].length;
        string[] memory urls = new string[](len);

        for (uint i = 0; i < len; i++) {
            urls[i] = addrSites[addr][i].url;
        }

        return urls;
    }
}
