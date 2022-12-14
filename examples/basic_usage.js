const { AptDomain } = require('../src/index');

(async()=>{
	
	let opt={
		//
		// set network 'mainnet' / 'testnet' / 'devnet', default: 'mainnet' 
		//
		network: 'testnet'

		//
		// Or you can set the node url and contract address
		//
		// for mainnet
		//nodeUrl:'https://fullnode.mainnet.aptoslabs.com',
		//contractAddress:'0x777821c78442e17d82c3d7a371f42de7189e4248e529fe6eee6bca40ddbb',

		// for testnet
		//nodeUrl:'https://fullnode.testnet.aptoslabs.com',
		//contractAddress:'0x7ce77452da809fbc4ef32596cf2be18ec6f252e1884b4eefa4d4349c2941923e',

		// for devtest
		//nodeUrl:'https://fullnode.devnet.aptoslabs.com',
		//contractAddress:'0x7ce77452da809fbc4ef32596cf2be18ec6f252e1884b4eefa4d4349c2941923e',
		
		//
		// aptos client config
		//
		//aptosClientConfig:{},
	};

	let aptdomain=new AptDomain(opt);

	const test_domain = 'test007@apt';
	const test_address = '0x5e0c91adbe365dca24d1565b434b04c79e17823a1c6db299ba291fc7e86325e6';
	
	///////////////////////////////////////////
    // basic using on promise

	let { address } = await aptdomain.lookup( test_domain);
	console.log( `[promise] ${test_domain} => ${address}` );

	let { domain } = await aptdomain.reverse( test_address );
	console.log( `[promise] ${test_address} => ${domain}` );

	let data = await aptdomain.getDomainRecord(test_domain);
	console.log( `[promise] ${test_domain} => ${JSON.stringify(data,null,'  ')}` );

	///////////////////////////////////////////
	 // basic using on callback

	aptdomain.lookup(test_domain,(status,address)=>{
		console.log( `[callback] ${test_domain} => ${address}` );
	});

	aptdomain.reverse(test_address,(status,domain)=>{
		console.log( `[callback] ${test_address} => ${domain}` );
	});

	aptdomain.getDomainRecord(test_domain,(status,data)=>{
		console.log( `[callback] ${test_domain} => ${JSON.stringify(data,null,'  ')}` );
	});
	
	///////////////////////////////////////////
	// domain object

	// request a domain object by addres or domain 
	// if domain not exist , return null

	let domainObj = await aptdomain.getDomainObj(test_address);

	if( domainObj ){
		console.log("domainObj.address(): ",		domainObj.address());
		console.log("domainObj.avatar(): ",			domainObj.avatar());
		console.log("domainObj.url(): ",			domainObj.url());
		console.log("domainObj.email(): ",			domainObj.email());
		
		console.log("domainObj.discord(): ",		domainObj.discord());
		console.log("domainObj.github(): ",			domainObj.github());
		console.log("domainObj.reddit(): ",			domainObj.reddit());
		console.log("domainObj.twitter(): ",		domainObj.twitter());
		console.log("domainObj.telegram(): ",		domainObj.telegram());

		console.log("domainObj.record('APT'): ",	domainObj.record('APT'));
		console.log("domainObj.record('ETH'): ",	domainObj.record('ETH'));
		console.log("domainObj.record('BTC'): ",	domainObj.record('BTC'));
		console.log("domainObj.record('Solana'): ",	domainObj.record('Solana'));
	}
    
})();
