pragma solidity ^0.5.0;

contract IpfsHashHolder
{
    string public ipfsHash;

    event ipfsSent(string _ipfsHash);

    function setIpfsHash(string memory _ipfsHash)
        public
        returns (bool)
    {
        ipfsHash = _ipfsHash;
        emit ipfsSent(_ipfsHash);
        return true;
    }
}