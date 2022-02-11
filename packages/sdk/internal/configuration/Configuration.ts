import { ethers } from 'ethers';
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { DAO_FACTORY_ADDRESS } from './ConfigDefaults'
import { GraphQLClient } from 'graphql-request'

export interface ConfigurationObject {
  signer: ethers.Signer,
  subgraphURL?: string
  daoFactoryAddress?: string
  ipfsURL?: string,
  dao?: string
}

let defaultConfig: Configuration;
const subgraphURL = '';

/**
 * TODO: Probably worth to rename it to Context
 * 
 * @class Configuration
 */
export default class Configuration {
  /**
   * Holds the validated configuration object
   *
   * @var config
   *
   * @private
   */
  private config: {
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
    this.setConfig(config)
  }

  /**
   * TODO: Use a ConfigurationError object
   *
   * Does set and parse the given configuration object
   *
   * @method setConfig
   *
   * @returns {void}
   *
   * @private
   */
  private setConfig(config: any): void {
    if (!config.subgraphURL) {
      throw new Error('Missing subgraph URL!')
    }

    if (!config.daoFactoryAddress) {
      throw new Error('Missing DAO factory address!')
    }

    this.config = {
      signer: config.signer,
      daoFactoryAddress: config.daoFactoryAddress,
      dao: config.dao,
      ipfs: create(config.ipfsURL),
      subgraph: new GraphQLClient(config.subgraphURL),
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
    return this.config.signer;
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
    return this.config.subgraph;
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
    return this.config.daoFactoryAddress;
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
    return this.config.dao;
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
    return this.config.ipfs;
  }

  /**
   * Static setter/factory method of the Configuration class
   *
   * @method set
   *
   * @param {ConfigurationObject} config
   *
   * @returns {void}
   *
   * @public
   */
  static set(config?: ConfigurationObject): void {
    if (!config) {
      config = {};
    }

    if (!config.subgraphURL) {
      config.subgraphURL = subgraphURL;
    }

    if (!config.daoFactoryAddress) {
      config.daoFactoryAddress = DAO_FACTORY_ADDRESS;
    }

    defaultConfig = new Configuration(config);
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
  static get(config?: ConfigurationObject): Configuration {
    // TODO: Add on the fly overwrite of specific properties 

    if (typeof defaultConfig !== 'undefined') {
      return defaultConfig;
    }

    Configuration.set();

    return defaultConfig;
  }
}
