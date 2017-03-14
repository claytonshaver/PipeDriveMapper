# PipeDriveMapper

## Setup
This requires node as a dependecy to run. If node is not installed on your machine, please visit [https://nodejs.org/en/download/](https://nodejs.org/en/download/) to install node

## Usage

* To use the Pipe drive mapper tool, start by cloning the project:  
    `git clone https://github.com/claytonshaver/PipeDriveMapper.git`

* Open the `index.js` and set the following fields to the tokens from your Cloud Elements Account:
    * `organizationKey`
    * `userKey`
    * `elementKey`

* Set the `object` to the object you want to retrieve the mapping for (e.g. "contacts")

* change into the cloned folder `cd /PipeDriveMapper`  
* run the server `node index.js`  
* In your browser navigate to `http://localhost:4000/` to see the mapping

** NOTE: If you make changes to the index.js file you will need to restart the node process to see the changes **
