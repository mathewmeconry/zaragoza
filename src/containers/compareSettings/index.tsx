import {ButtonGroup, Option} from '@aragon/ods';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {Loading} from 'components/temporary';
import {useDaoDetailsQuery} from 'hooks/useDaoDetails';
import {useDaoToken} from 'hooks/useDaoToken';
import {PluginTypes} from 'hooks/usePluginClient';
import {
  isMultisigVotingSettings,
  isTokenVotingSettings,
  usePluginSettings,
} from 'hooks/usePluginSettings';
import {toDisplayEns} from 'utils/library';
import {CompareMetadata} from './compareMetadata';
import {CompareMvCommunity} from './majorityVoting/compareCommunity';
import {CompareMvGovernance} from './majorityVoting/compareGovernance';
import {CompareMsCommunity} from './multisig/compareCommunity';
import {CompareMsGovernance} from './multisig/compareGovernance';

export type Views = 'old' | 'new';

const CompareSettings: React.FC = () => {
  const {t} = useTranslation();

  const {data: daoDetails, isLoading: areDetailsLoading} = useDaoDetailsQuery();
  const {data: pluginSettings, isLoading: areSettingsLoading} =
    usePluginSettings(
      daoDetails?.plugins[0].instanceAddress as string,
      daoDetails?.plugins[0].id as PluginTypes
    );

  const {data: daoToken, isLoading: tokensAreLoading} = useDaoToken(
    daoDetails?.plugins?.[0]?.instanceAddress || ''
  );

  const [selectedButton, setSelectedButton] = useState<Views>('new');

  const daoAddressOrEns =
    toDisplayEns(daoDetails?.ensDomain) === ''
      ? daoDetails?.address
      : toDisplayEns(daoDetails?.ensDomain);

  const onButtonGroupChangeHandler = () => {
    setSelectedButton(prev => (prev === 'new' ? 'old' : 'new'));
  };

  if (areDetailsLoading || areSettingsLoading || tokensAreLoading) {
    return <Loading />;
  }

  return daoDetails ? (
    <div className="space-y-2">
      <div className="flex">
        <ButtonGroup
          bgWhite={false}
          defaultValue={selectedButton}
          onChange={onButtonGroupChangeHandler}
        >
          <Option value="new" label={t('settings.newSettings')} />
          <Option value="old" label={t('settings.oldSettings')} />
        </ButtonGroup>
      </div>

      {/* METADATA*/}
      <CompareMetadata daoDetails={daoDetails} view={selectedButton} />

      {/* GOVERNANCE */}
      {isTokenVotingSettings(pluginSettings) ? (
        <>
          <CompareMvCommunity
            daoAddressOrEns={daoAddressOrEns as string}
            view={selectedButton}
            daoSettings={pluginSettings}
            daoToken={daoToken}
          />
          <CompareMvGovernance
            daoAddressOrEns={daoAddressOrEns as string}
            view={selectedButton}
            daoSettings={pluginSettings}
            daoToken={daoToken}
          />
        </>
      ) : isMultisigVotingSettings(pluginSettings) ? (
        <>
          <CompareMsCommunity
            daoAddressOrEns={daoAddressOrEns as string}
            daoSettings={pluginSettings}
            view={selectedButton}
          />
          <CompareMsGovernance
            daoSettings={pluginSettings}
            view={selectedButton}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  ) : null;
};

export default CompareSettings;
