// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Blackpool {
    address public owner;

    struct Site {
        string url;
        bool exists;
    }

    struct SiteInfo {
        string url;
        address owner;
    }

    mapping(address => Site[]) public addrSites;
    SiteInfo[] public allSites;

    constructor() {
        owner = msg.sender;
    }

    function addSite(string calldata url) public {
        addrSites[msg.sender].push(Site(url, true));
        allSites.push(SiteInfo(url, msg.sender));
    }

    function getSite(address addr, uint index) public view returns (string memory) {
        require(index < addrSites[addr].length, "Site does not exist");
        return addrSites[addr][index].url;
    }

    function getMySiteCount() public view returns (uint) {
        return addrSites[msg.sender].length;
    }

    function getAllSites() public view returns (string[] memory) {
        uint totalSitesCount = allSites.length;

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
}
