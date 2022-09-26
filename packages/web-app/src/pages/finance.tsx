import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';

import {
  PageWrapper,
  TokenSectionWrapper,
  TransferSectionWrapper,
} from 'components/wrappers';
import {Loading} from 'components/temporary/loading';
import TokenList from 'components/tokenList';
import {sortTokens} from 'utils/tokens';
import TransferList from 'components/transferList';
import {useDaoVault} from 'hooks/useDaoVault';
import {useDaoParam} from 'hooks/useDaoParam';
import {useGlobalModalContext} from 'context/globalModals';
import {useTransactionDetailContext} from 'context/transactionDetail';
import {trackEvent} from 'services/analytics';
import {useParams} from 'react-router-dom';

const Finance: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useGlobalModalContext();
  const {data: daoId, isLoading} = useDaoParam();
  const {handleTransferClicked} = useTransactionDetailContext();
  const {tokens, totalAssetChange, totalAssetValue, transfers} =
    useDaoVault(daoId);
  const {dao} = useParams();

  sortTokens(tokens, 'treasurySharePercentage');

  /*************************************************
   *                    Render                     *
   *************************************************/
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PageWrapper
        title={new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(totalAssetValue)}
        buttonLabel={t('TransferModal.newTransfer')}
        subtitle={new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          signDisplay: 'always',
        }).format(totalAssetChange)}
        sign={Math.sign(totalAssetChange)}
        timePeriod="24h" // temporarily hardcoded
        onClick={() => {
          trackEvent('finance_newTransferBtn_clicked', {dao_address: dao});
          open();
        }}
      >
        <div className={'h-4'} />
        <TokenSectionWrapper title={t('finance.tokenSection')}>
          <ListContainer>
            <TokenList tokens={tokens.slice(0, 5)} />
          </ListContainer>
        </TokenSectionWrapper>
        <div className={'h-4'} />
        <TransferSectionWrapper title={t('finance.transferSection')} showButton>
          <ListContainer>
            <TransferList
              transfers={transfers.slice(0, 5)}
              onTransferClick={handleTransferClicked}
            />
          </ListContainer>
        </TransferSectionWrapper>
      </PageWrapper>
    </>
  );
};

const ListContainer = styled.div.attrs({
  className: 'py-2 space-y-2',
})``;

export default withTransaction('Finance', 'component')(Finance);
