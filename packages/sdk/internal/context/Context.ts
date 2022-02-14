import { ethers } from 'ethers';
import { create, IPFSHTTPClient, Options } from 'ipfs-http-client';
import { GraphQLClient } from 'graphql-request'

export interface ContextConfiguration {
  signer: ethers.Signer,
  dao: string,
  subgraphURL?: string
  daoFactoryAddress?: string
  ipfs?: Options
}

let configuration: Context;

const defaultConfig = {
  subgraphURL: '',
  daoFactoryAddress: '',
  ipfs: '',
}

/**
 * TODO: Probably worth to rename it to Context
 * 
 * @class Context
 */
export default class Context {
  /**
   * Holds the validated context
   *
   * @var context
   *
   * @private
   */
  private context: {
    signer: ethers.Signer,
    daoFactoryAddress: string,
    dao: string,
    ipfs: IPFSHTTPClient,
    subgraph: GraphQLClient
  }

  /**
   * @param {Object} config
   *
   * @constructor
   */
  constructor(config: any) {
    this.setContext(config)
  }

  /**
   * Does set and parse the given context configuration object
   *
   * @method setContext
   *
   * @returns {void}
   *
   * @private
   */
  private setContext(contextConfiguration: ContextConfiguration): void {
    if (!contextConfiguration.subgraphURL) {
      throw new Error('Missing subgraph URL!');
    }

    if (!contextConfiguration.daoFactoryAddress) {
      throw new Error('Missing DAO factory address!');
    }

    if (!contextConfiguration.signer) {
      throw new Error('Please pass the required signer!');
    }

    if (!contextConfiguration.dao) {
      throw new Error('No DAO address defined!');
    }

    if (!contextConfiguration.ipfs) {
      throw new Error('No IPFS options defined!');
    }

    this.context = {
      signer: contextConfiguration.signer,
      daoFactoryAddress: contextConfiguration.daoFactoryAddress,
      dao: contextConfiguration.dao,
      ipfs: create(contextConfiguration.ipfs),
      subgraph: new GraphQLClient(contextConfiguration.subgraphURL),
    };
  }

  /**
   * Getter for the Signer
   * 
   * @var signer
   * 
   * @returns {ethers.Signer}
   * 
   * @public
   */
  get signer(): ethers.Signer {
    return this.context.signer;
  }

  /**
   * Getter for the GraphQLClient instance of the subgraph
   *
   * @var subgraph
   *
   * @returns {GraphQLClient}
   *
   * @public
   */
  get subgraph(): GraphQLClient {
    return this.context.subgraph;
  }

  /**
   * Getter for daoFactoryAddress property
   *
   * @var daoFactoryAddress
   *
   * @returns {string}
   *
   * @public
   */
  get daoFactoryAddress(): string {
    return this.context.daoFactoryAddress;
  }

  /**
   * Getter for the DAO address in the current global context
   * 
   * @var dao
   * 
   * @returns {string}
   * 
   * @public
   */
  get dao(): string {
    return this.context.dao;
  }

  /**
   * Getter for the IPFS http client
   * 
   * @var ipfs
   * 
   * @returns {IPFSHTTPClient}
   * 
   * @public
   */
  get ipfs(): IPFSHTTPClient {
    return this.context.ipfs;
  }

  /**
   * Static setter/factory method of the Configuration class
   *
   * @method set
   *
   * @param {ContextConfiguration} config
   *
   * @returns {void}
   *
   * @public
   */
  static set(config?: ContextConfiguration): void {
    configuration = new Context(
      Object.assign(
        defaultConfig,
        config
      )
    );
  }

  /**
   * Static getter for the defaultConfig (used in the public API layer)
   *
   * @method get
   *
   * @returns {Configuration}
   *
   * @public
   */
  static get(config?: ContextConfiguration): Context {
    // TODO: Add on the fly overwrite of specific properties 

    if (typeof configuration === 'undefined') {
      Context.set();
    }

    return configuration;
  }
}
