// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

pragma experimental ABIEncoderV2; // used to enable `struct` to be returned as a value;

// Working with `Struct`
contract Library {
    struct Book {
        string title;
        string author;
        uint256 bookId;
        address registrant;
    }

    Book[] public books;

    function addBook(string memory _title, string memory _author) public {
        books.push(Book(_title, _author, books.length, msg.sender));
    }

    function get(uint256 _bookId) public view returns (string memory _title, string memory _author) {
        return (books[_bookId].title, books[_bookId].author);
    }

    function update(uint256 _bookId, string memory _newTitle, string memory _newAuthor) public {
        require(msg.sender == books[_bookId].registrant, "You must have been the one who added the book");

        books[_bookId].title = _newTitle;
        books[_bookId].author = _newAuthor;
    }
}

contract StructContract {
    enum Choices {
        Yes,
        No
    }

    struct Vote {
        Choices choice;
        address voter;
    }

    Vote public vote;
    Vote none = Vote(Choices(0), address(0));
    Vote[] public votes;


    function createVoteA(Choices choice) external {
        vote = Vote({choice: choice, voter: msg.sender});
    }

    // TODO: make a new createVote function
    function createVote(Choices choice) external view returns (Vote memory) {
        Vote memory _vote = Vote(choice, msg.sender);
        return _vote;
    }

    // with Vote[]
    function createVote(Choices choice, address _who) external {
        require(!this.hasVoted(msg.sender), "Can not vote twice!");
        	// TODO: add a new vote to the array of votes state variable
        votes.push(Vote(choice, msg.sender));
    }

    	function hasVoted(address _user) external view returns(bool) {
		Vote memory v = memberVote(_user);
		if(v.voter == _user) {
			return true;
		}

		return false;
		
	}

    function changeVote(Choices choice) external {
        Vote storage v = memberVote(msg.sender);

        require(v.voter != none.voter, 'Only voter can call');
        v.choice = choice;
    }

	function findChoice(address _user) external view returns (Choices ) {
		Vote memory v = memberVote(_user);
		return v.choice;
	}

	function memberVote(address _user) internal view returns(Vote storage) {
		for(uint i = 0; i < votes.length; i++){
			if(votes[i].voter == _user){
				return votes[i];
			}
		}

		return none;
	}
}
