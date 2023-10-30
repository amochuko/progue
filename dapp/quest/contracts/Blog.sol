// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title Blog
 * @author
 * @notice This is Blog contract
 */
contract Blog {
    string public name;
    address public owner;

    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    struct Post {
        uint id;
        string title;
        string content;
        bool published;
    }

    /**
     * mapping: lookups for posts by id
     */
    mapping(uint => Post) private idToPost;
    /**
     * maaping: lookups for post by ipfs hash
     */
    mapping(string => Post) private hashToPost;

    event PostCreated(uint id, string title, string hash);
    event PostUpdated(uint id, string title, string hash, bool published);

    constructor(string memory _name) {
        name = _name;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call function");
        _;
    }

    /* update blog */
    function updateName(string memory _name) public {
        name = _name;
    }

    /* transfer ownership of the contract to another address */
    function transferOwnership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    /* fetches an individual post by the content hash */
    function fetchPost(string memory hash) public view returns (Post memory) {
        return hashToPost[hash];
    }

    /* create a new post */
    function createPost(
        string memory title,
        string memory contentHash
    ) public onlyOwner {
        _postIds.increment();
        uint postId = _postIds.current();

        Post storage post = idToPost[postId];
        post.id = postId;
        post.title = title;
        post.published = true;
        post.content = contentHash;

        // map post to hash
        hashToPost[contentHash] = post;

        emit PostCreated(postId, title, contentHash);
    }

    /* update an existing post */
    function updatePost(
        uint postId,
        string memory title,
        string memory contentHash,
        bool published
    ) public onlyOwner {
        Post storage post = idToPost[postId];
        post.title = title;
        post.content = contentHash;
        post.published = published;

        // map post to postId
        idToPost[postId] = post;

        // map post to hash
        hashToPost[contentHash] = post;

        emit PostUpdated(post.id, title, contentHash, published);
    }

    /* fetches all posts */
    function fetchPosts() public view returns (Post[] memory) {
        uint itmCount = _postIds.current();


        Post[] memory posts = new Post[](itmCount);
        for (uint i = 0; i < itmCount; i++) {
            uint currentId = i + 1;
            Post storage currentItem = idToPost[currentId];
            posts[i] = currentItem;
        }

        return posts;
    }
}
