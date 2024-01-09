// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

contract Hackathon {
    struct Project {
        string title;
        uint[] ratings;
    }
    
    Project[] projects;

    // find the project that has the highest average rating amongst its array of ratings.
    function findWinner() external view returns (Project memory) {

        Project memory topProject;
          uint topAverage;

        for(uint i = 0; i < projects.length; i++) {
            uint sum;
            for(uint j = 0; j < projects[i].ratings.length; j++) {
               sum += projects[i].ratings[j];
            }

            uint average = sum / projects[i].ratings.length;
            if(average > topAverage) {
                topAverage = average;
                topProject = projects[i];

            }
        }

        return topProject;
    }

    function newProject(string calldata _title) external {
        // creates a new project with a title and an empty ratings array
        projects.push(Project(_title, new uint[](0)));
    }

    function rate(uint _idx, uint _rating) external {
        // rates a project by its index
        projects[_idx].ratings.push(_rating);
    }
}
