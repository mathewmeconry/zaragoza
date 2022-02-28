import {gql} from '@apollo/client';

export const DAO_ERC20VOTING_PACKAGE_BY_ID = gql`
  query erc20VotingPackages($id: ID) {
    erc20VotingPackages(where: {id: $id}) {
      id
      proposals {
        id
      }
      supportRequiredPct
      participationRequiredPct
      minDuration
      votesLength
      token {
        id
        name
        symbol
        decimals
      }
    }
  }
`;

export const DAO_WHITELIST_PACKAGE_BY_ID = gql`
  query whitelistPackages($id: ID) {
    whitelistPackages(where: {id: $id}) {
      id
      proposals {
        id
      }
      supportRequiredPct
      participationRequiredPct
      minDuration
      votesLength
      users {
        id
      }
    }
  }
`;

export const DAO_LIST = gql`
  query DAOs($offset: Int, $limit: Int) {
    daos(
      skip: $offset
      first: $limit
      orderBy: createdAt
      orderDirection: desc
    ) {
      id
      name
      creator
      metadata
      token {
        id
        name
        symbol
        decimals
      }
      deposits {
        id
      }
      withdraws {
        id
      }
      balances {
        id
      }
      roles {
        id
      }
      permissions {
        id
      }
      packages {
        pkg {
          id
        }
      }
      proposals {
        id
        executed
      }
    }
  }
`;

export const DAO_BY_NAME = gql`
  query DAO($name: String) {
    daos(where: {name: $name}) {
      id
      name
      creator
      metadata
      token {
        id
        name
        symbol
        decimals
      }
      actions {
        id
        to
        value
        data
        proposal {
          id
        }
      }
      deposits {
        id
        token {
          id
          name
          symbol
          decimals
        }
        sender
        amount
        reference
        transaction
        createdAt
      }
      withdraws {
        id
        token {
          id
          name
          symbol
          decimals
        }
        to
        amount
        reference
        transaction
        proposal {
          id
        }
        createdAt
      }
      balances {
        id
        token {
          id
          name
          symbol
          decimals
        }
      }
      roles {
        id
        where
        role
        frozen
      }
      permissions {
        id
        where
        role {
          id
        }
        who
        actor
        oracle
      }
      packages {
        pkg {
          id
        }
      }
      proposals {
        id
        executed
      }
    }
  }
`;
