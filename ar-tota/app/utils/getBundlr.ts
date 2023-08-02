interface Window {
	ethereum?: any;
}

import { WebBundlr } from "@bundlr-network/client";
import { ethers } from "ethers";

/**
 * Creates a new Bundlr object that will then be used by other
 * utility functions. This is where you set your node address and currency.
 *
 * @returns A reference to a Bundlr object
 */
const getBundlr = async (
	url = "https://node1.bundlr.network",
	currency = "matic",
	providerUrl = "https://cloudflare-eth.com/",
) => {
	//@ts-ignore
	const provider = new ethers.BrowserProvider(window.ethereum);
	const signer = await provider.getSigner();
	//@ts-ignore
	provider.getSigner = () => signer;
	//@ts-expect-error hack
	signer._signTypedData = (domain, types, value) => signer.signTypedData(domain, types, value);

	console.log("url=", url);
	console.log("currency=", currency);
	console.log("providerUrl=", providerUrl);

	const bundlr = new WebBundlr(url, currency, provider, providerUrl );

	await bundlr.ready();
	console.log("bundlr=", bundlr);

	return bundlr;
};

export default getBundlr;
