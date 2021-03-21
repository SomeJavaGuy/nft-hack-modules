// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// import "./node_modules/@openzeppelin/contracts/token/ERC721/ERC721";
// import "../node_modules/openzeppelin-solidity/contracts/utils/Counters.sol";


contract parisAppart is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(string => uint8) hashes;


    constructor() public ERC721("parisAppartNFT", "PAN") {}

    function mintPAN(address recipient, string memory tokenURI, string memory hash)
        external onlyOwner returns (uint256) 
    {
        _tokenIds.increment();

        uint256 newPANId = _tokenIds.current();
        _mint(recipient, newPANId);
        _setTokenURI(newPANId, tokenURI);

        return newPANId;
    }
}