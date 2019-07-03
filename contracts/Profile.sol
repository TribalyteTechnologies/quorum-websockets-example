pragma solidity 0.4.24;

contract Profile {
    string public name;
    uint256 public age;
    
    event changeProfile(string name, uint256 age);

    function setProfile(string _name, uint256 _age) public {
        name = _name;
        age = _age;
        emit changeProfile(name, age);
    }
    
    function getProfile() public view returns (string, uint256) { 
        return (name, age);
    }
    
}