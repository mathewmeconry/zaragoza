import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { FunctionFragment, defaultAbiCoder } from "@ethersproject/abi";
import { concat, hexDataSlice, hexlify } from "@ethersproject/bytes";
import { id } from "@ethersproject/hash";
import Context from "./context/Context";

/**
 * @class Transaction
 */
export default class Transaction {
    /**
     * @param {ProposalObject} proposal All the properties need to submit a proposal.
     * @param {ContextConfiguration} config The optional context config object in case some values of the global one have to be overwritten.
     * 
     * @constructor
     */
    constructor(
        private to: string,
        private method: string,
        private methodArguments: Array<any>,
        private context: Context
    ) { }

    /**
     * Uploads the metadata to IPFS and submits the TX
     * 
     * @returns {Proposal}
     */
    public async create(confirmations?: number): Promise<TransactionReceipt> {
        return (await this.context.signer.sendTransaction(
            {
                to: this.to, 
                data: this.encodeTxData()
            }
        )).wait(confirmations);
    }

    /**
     * Encodes the proposal creation call
     * 
     * @private
     * 
     * @returns {string} 
     */
    private encodeTxData(): string {
        const funcFrag = FunctionFragment.fromString(this.method);

        return hexlify(concat([
            hexDataSlice(id(funcFrag.format()), 0, 4),
            defaultAbiCoder.encode(funcFrag.inputs, this.methodArguments)
        ]))
    }
}
