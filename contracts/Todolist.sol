// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ToDoList {
    uint256 public _idUser;
    address public ownerOfContract;

    address[] public creators;
    string[] public message;
    uint256[] public messageId; 

    struct ToDoListApp {
        address account;
        uint256 userId;
        string message;
        bool completed;
    }

    event ToDoEvent(
        address indexed account,
        uint256 indexed userId,
        string message,
        bool completed
    );

    mapping(address => ToDoListApp) public ToDoListApps;

    constructor() {
        ownerOfContract = msg.sender;
    }

    function inc() internal {
        _idUser ++;
    }

    function createList(string calldata _message) external {
        inc();

        uint256 idNumber = _idUser;
        ToDoListApp storage todo = ToDoListApps[msg.sender];
        todo.account = msg.sender;
        todo.message = _message;
        todo.completed = false;
        todo.userId = idNumber;

        creators.push(msg.sender);
        message.push(_message);
        messageId.push(idNumber);

        emit ToDoEvent(msg.sender, idNumber, _message, todo.completed);
    }


    function getCreatorData(address _address) external view returns (address, uint256, string memory, bool) {
        ToDoListApp memory singleUserData = ToDoListApps[_address];
        return (singleUserData.account, singleUserData.userId, singleUserData.message, singleUserData.completed);
    }

    function getAddress() external view returns (address[] memory) {
        return creators;
    }

    function getMessage() external view returns (string[] memory) {
        return message;
    }

    function toggle(address _creator) public {
        ToDoListApp storage singleUserData = ToDoListApps[_creator];
        singleUserData.completed = !singleUserData.completed;
    }

}