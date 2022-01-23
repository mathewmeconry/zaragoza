import React, {useState} from 'react';
import {withTransaction} from '@elastic/apm-rum-react';
import {
  Option,
  ButtonGroup,
  SearchInput,
  Pagination,
} from '@aragon/ui-components';
import styled from 'styled-components';

import {PageWrapper} from 'components/wrappers';
import ProposalList from 'components/proposalList';
import {useDaoProposals} from '../hooks/useDaoProposals';
import {Proposal} from 'utils/types';

const Governance: React.FC = () => {
  const [filterValue, setFilterValue] = useState<string>('all');
  const {data: daoProposals} = useDaoProposals('0x0000000000');
  let displayedProposals: Proposal[] = [];

  // TODO: this filter function should implement using graph queries
  if (filterValue) {
    displayedProposals = daoProposals.filter(
      t => t.type === filterValue || filterValue === 'all'
    );
  }

  // TODO: search functionality will implement later using graph queries
  return (
    <Container>
      <PageWrapper
        title={'Proposals'}
        buttonLabel={'New Proposal'}
        subtitle={'1 active Proposal'}
        onClick={() => null}
      >
        <div className="mt-8 space-y-1.5">
          <SearchInput placeholder="Type to filter" />
          <ButtonGroup
            bgWhite
            defaultValue="all"
            onChange={(selected: string) => setFilterValue(selected)}
          >
            <Option value="all" label="All" />
            <Option value="draft" label="Draft" />
            <Option value="pending" label="Pending" />
            <Option value="active" label="Active" />
            <Option value="succeeded" label="Succeeded" />
            <Option value="executed" label="Executed" />
            <Option value="defeated" label="Defeated" />
          </ButtonGroup>
        </div>
        <ListWrapper>
          <ProposalList proposals={displayedProposals} />
        </ListWrapper>
        <PaginationWrapper>
          {displayedProposals.length !== 0 && (
            <Pagination
              totalPages={Math.ceil(displayedProposals.length / 6) as number}
            />
          )}
        </PaginationWrapper>
      </PageWrapper>
    </Container>
  );
};

export default withTransaction('Governance', 'component')(Governance);

const Container = styled.div.attrs({
  className: 'm-auto mt-4 w-8/12',
})``;

const ListWrapper = styled.div.attrs({
  className: 'mt-3',
})``;

const PaginationWrapper = styled.div.attrs({
  className: 'flex mt-8 mb-10',
})``;
