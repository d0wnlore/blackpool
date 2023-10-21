// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Blackpool {
    address public owner;

    event SiteAdded(string url, address indexed owner);
    event TipReceived(uint siteIndex, uint amount);

    struct Site {
        string url;
        bool exists;
        address siteOwner;
    }

    mapping(address => Site[]) public addrSites;
    mapping(uint => Site) public allSites;
    uint public totalSitesCount;

    constructor() {
        owner = msg.sender;
    }

    function isValidDomain(string memory domain) public pure returns (bool) {
        bytes memory b = bytes(domain);
        if(b.length < 3) return false;
        if(b[0] == '.' || b[b.length-1] == '.') return false;

        for(uint i = 1; i < b.length - 1; i++) {
            if(b[i] == '.') return true;
        }

        return false;
    }

    function addSite(string calldata url) public {
        require(isValidDomain(url), "Invalid domain");
        addrSites[msg.sender].push(Site(url, true, msg.sender));
        allSites[totalSitesCount] = Site(url, true, msg.sender);
        totalSitesCount++;
        emit SiteAdded(url, msg.sender);
    }

    function getSite(address addr, uint index) public view returns (string memory) {
        require(index < addrSites[addr].length, "Site does not exist");
        return addrSites[addr][index].url;
    }

    function getMySiteCount() public view returns (uint) {
        return addrSites[msg.sender].length;
    }

    function getAllSites() public view returns (string[] memory) {
        string[] memory allUrls = new string[](totalSitesCount);
        for (uint i = 0; i < totalSitesCount; i++) {
            allUrls[i] = allSites[i].url;
        }
        return allUrls;
    }

    function getAllAddrSites(address addr) public view returns (string[] memory) {
        uint len = addrSites[addr].length;
        string[] memory urls = new string[](len);
        for (uint i = 0; i < len; i++) {
            urls[i] = addrSites[addr][i].url;
        }
        return urls;
    }

    function tipSiteOwner(uint siteIndex) public payable {
        require(siteIndex < totalSitesCount, "Site does not exist");
        address payable siteOwner = payable(allSites[siteIndex].siteOwner);
        siteOwner.transfer(msg.value);
        emit TipReceived(siteIndex, msg.value);
    }
}
