import React from 'react';

import {useActionsContext} from 'context/actions';
import WithdrawAction from './withdrawAction';
import {ActionsTypes} from 'utils/types';
import {AddActionItems} from '../addActionMenu';
import TokenMenu from 'containers/tokenMenu';
import {BaseTokenInfo, ActionItem} from 'utils/types';
import {fetchTokenPrice} from 'services/prices';
import {useDaoTokens} from 'hooks/useDaoTokens';
import {formatUnits} from 'utils/library';
import {useFormContext, useWatch} from 'react-hook-form';

/**
 * This Component is responsible for generating all actions that append to pipeline context (actions)
 * In future we can add more action template like: mint token Component
 * or custom action component (for smart contracts methods)
 * @returns List of actions
 */

type actionsComponentType = {
  name: ActionsTypes;
  index: number;
};

const Action: React.FC<actionsComponentType> = ({name, index}) => {
  switch (name) {
    case AddActionItems.WITHDRAW_ASSETS:
      return <WithdrawAction {...{index}} />;
    default:
      return null;
  }
};

const ActionBuilder: React.FC = () => {
  const {counter, actions} = useActionsContext();
  const {data: tokens} = useDaoTokens('myDaoAddress');
  const {setValue, resetField, control, clearErrors} = useFormContext();

  const actionss = useWatch({
    name: 'actions',
    // control,
  });

  /*************************************************
   *             Callbacks and Handlers            *
   *************************************************/

  const handleTokenSelect = (token: BaseTokenInfo) => {
    setValue(`actions.${counter}.tokenSymbol`, token.symbol);

    if (token.address === '') {
      setValue(`actions.${counter}.isCustomToken`, true);
      resetField(`actions.${counter}.tokenName`);
      resetField(`actions.${counter}.tokenImgUrl`);
      resetField(`actions.${counter}.tokenAddress`);
      resetField(`actions.${counter}.tokenBalance`);
      clearErrors(`actions.${counter}.amount`);
      return;
    }

    setValue(`actions.${counter}.isCustomToken`, false);
    setValue(`actions.${counter}.tokenName`, token.name);
    setValue(`actions.${counter}.tokenImgUrl`, token.imgUrl);
    setValue(`actions.${counter}.tokenAddress`, token.address);
    setValue(
      `actions.${counter}.tokenBalance`,
      formatUnits(token.count, token.decimals)
    );

    fetchTokenPrice(token.address).then(price => {
      setValue(`actions.${counter}.tokenPrice`, price);
    });
  };

  return (
    <>
      {actions?.map((action: ActionItem, index: number) => (
        <Action key={index} name={action?.name} {...{index}} />
      ))}
      <TokenMenu
        isWallet={false}
        onTokenSelect={handleTokenSelect}
        tokenBalances={tokens}
      />
    </>
  );
};

export default ActionBuilder;
