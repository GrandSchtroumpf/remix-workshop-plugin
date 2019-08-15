pragma solidity >=0.5.0 <0.6.0;

contract RemixWorkshop {

    mapping(address => bool) public isTutor;
    mapping(address => uint) public indexOfTutor;
    address[] private tutors;


    function getTutor(uint index) view public returns(address) {
        return tutors[index];
    }

    function getTutors() view public returns(address[] memory) {
        return tutors;
    }

    function getSize() view public returns(uint) {
        return tutors.length;
    }

    function register() public {
        require(!isTutor[msg.sender]);
        isTutor[msg.sender] = true;
        indexOfTutor[msg.sender] = tutors.length;
        tutors.push(msg.sender);
    }

    function unregister() public {
        require(isTutor[msg.sender]);
        uint index = indexOfTutor[msg.sender];
        address lastTutor = tutors[tutors.length - 1];
        isTutor[msg.sender] = false;        //
        delete indexOfTutor[msg.sender];    // Remove tutor index
        tutors[index] = lastTutor;          // Replace tutor by last item
        indexOfTutor[lastTutor] = index;    // Change index of last item
        delete tutors[tutors.length - 1];   // Remove last item
        tutors.length--;                    // Update length
    }

}

