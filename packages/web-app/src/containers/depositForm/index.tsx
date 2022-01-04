import React from 'react';
import styled from 'styled-components';
import {constants} from 'ethers';
import {useTranslation} from 'react-i18next';
import {Control, Controller} from 'react-hook-form';
import {
  ButtonWallet,
  DropdownInput,
  Label,
  TextareaSimple,
  ValueInput,
} from '@aragon/ui-components';

import {FormData} from 'pages/newDeposit';
import {useTransferModalContext} from 'context/transfersModal';

type DepositFormProps = {control: Control<FormData>};
const DepositForm: React.FC<DepositFormProps> = ({control}) => {
  const {t} = useTranslation();
  const {open} = useTransferModalContext();

  return (
    <>
      <FormItem>
        <Label label={t('labels.to')} helpText={t('newDeposit.toSubtitle')} />

        {/* TODO: Proper DAO address */}
        <ButtonWallet
          label="patito.dao.eth"
          src={constants.AddressZero}
          isConnected
          disabled
        />
      </FormItem>

      <FormItem>
        <Label
          label={t('labels.token')}
          helpText={t('newDeposit.tokenSubtitle')}
        />
        <DropdownInput onClick={() => open('token')} />
      </FormItem>

      <FormItem>
        <Label
          label={t('labels.amount')}
          helpText={t('newDeposit.amountSubtitle')}
        />
        <Controller
          name="amount"
          control={control}
          render={({field: {onBlur, onChange, value}}) => (
            <ValueInput
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              adornmentText={t('labels.max')}
              onAdornmentClick={() => {}}
            />
          )}
        />
      </FormItem>

      <FormItem>
        <Label
          label={t('labels.reference')}
          helpText={t('newDeposit.referenceSubtitle')}
          isOptional={true}
        />
        <TextareaSimple />
      </FormItem>
    </>
  );
};

export default DepositForm;

const FormItem = styled.div.attrs({
  className: 'space-y-1.5',
})``;
