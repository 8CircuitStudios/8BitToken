# Migrating the 8BT Contract

## Rationale

The current 8BT smart contract contains a bug wherein another smart contract cannot call the transferFrom method. See for more details: https://github.com/8CircuitStudios/8BitToken/issues/1

This is an issue because it means a system cannot be built in which a smart contract pays for an NFT on behalf of a user using that user's 8BT tokens.

Additionaly, it means the the 8BT token cannot be traded on decentralized exchanges that rely on the transferFrom method.

Also, the 8BT smart contract has never been verified on Etherscan. While it is conceivable that this could still be accomplished, it presents some challenges given the age of the smart contract and issues that the original developer faced in getting it verified by Etherscan.

## Work Effort

Below lists the work that would need to happen to migrate the contract. Recommended best practice would be to do this work first on a testnet, and then run the code on mainnet.

### Writing A New Contract

A new contract would have to be written and deployed. This work should be trivial, assuming that standard Open Zeppelin libraries are used, which would be the recommended practice. 

### Pausing The Old Contract

Because the original contract contains the pausable library, it can be "frozen" so that no one can transfer funds any longer. The only issue with this is that you have the private key of the owner of the contract, which is 0xe77a02f62c6226435930478189FA1688F01b4B2c. 
Note, it is not required that the contract be frozen -- one could still own 8BT tokens, almost like the BTC/BCH fork. They just wouldn't be able to use the 8BT tokens to purchase goods.

### Migrating The User Balances

At the time of writing, there are 4,307 holders of 8BT tokens. https://etherscan.io/token/0x20f4eb38c210490839cdd7bc60636171abb7bf94#balances After deploying the new contract, first we would have to generate the list of holders of the token programmatically. Because the blockchain doesn't store this list, it has to be deduced. 
There are some tools and methodologies for doing so: 
https://github.com/TokenMarketNet/sto/blob/master/sto/ethereum/scanner.py 
https://ethereum.stackexchange.com/questions/48414/getting-list-of-token-holders-in-real-time?rq=1

A script would have to be run that looked up each user's balance and transferred that number of tokens of the new 8BT token. Each of these transactions would cost approximately $0.02. Thus, the total cost for the migration would be ~$80.00 (4000 * .02).

## Messaging To Token Holders
The other piece to this migration is the messaging to token holders. There is precedence for this with one of the largest tokens, Auger (REP). Here are some blog posts from when they faced this circumstance:
https://medium.com/@AugurProject/deployment-details-rep-migration-e5413ff9fb65

There is the opportunity to allocate more tokens in the new contract to turn the experience into something positive for token holders.


