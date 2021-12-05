import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {TransferSectionWrapper} from 'components/sectionWrapper';

const Transfers: React.FC = () => {
  const {t} = useTranslation();

  return (
    <div className={'m-auto mt-4 w-8/12'}>
      <SectionContainer>
        <TransferSectionWrapper title={t('allTransfer.thisWeek')}>
          <div className="my-2 space-y-2 border-solid">
            <ColoredDiv />
            <ColoredDiv />
            <ColoredDiv />
          </div>
        </TransferSectionWrapper>
      </SectionContainer>
      <SectionContainer>
        <TransferSectionWrapper title={'November'}>
          <div className="my-2 space-y-2 border-solid">
            <ColoredDiv />
            <ColoredDiv />
            <ColoredDiv />
          </div>
        </TransferSectionWrapper>
      </SectionContainer>
      <SectionContainer>
        <TransferSectionWrapper title={'2021'}>
          <div className="my-2 space-y-2 border-solid">
            <ColoredDiv />
            <ColoredDiv />
            <ColoredDiv />
            <ColoredDiv />
            <ColoredDiv />
            <ColoredDiv />
          </div>
        </TransferSectionWrapper>
      </SectionContainer>
    </div>
  );
};

export default Transfers;

const ColoredDiv = styled.div.attrs({className: 'h-6 w-full bg-blue-100'})``;

const SectionContainer = styled.div.attrs({className: 'my-5'})``;
