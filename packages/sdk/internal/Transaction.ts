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
     * @param {string} to Contract address to call
     * @param {string} method The whole method signature to later on generate the func sig
     * @param {Array<any>} methodArguments Method arguments as array
     * @param {Context} context The global context to execute this TX
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
     * Encodes the given argumens and submits the TX
     * 
     * @param {number} confirmations Optional parameter to configure the amount of blocks that have to be processed to see a TX as confirmed.
     * 
     * @returns {Promise<TransactionReceipt>}
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
     * Encodes TX data by the given method signature and the passed arguments
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
