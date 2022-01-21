import {
  AlertInline,
  ButtonGroup,
  DateInput,
  DropdownInput,
  Label,
  NumberInput,
  Option,
  TimeInput,
} from '@aragon/ui-components';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {validateAddress} from 'utils/validators';

const SetupVoting: React.FC = () => {
  const {t} = useTranslation();
  const {control, setValue, getValues} = useFormContext();

  /*************************************************
   *                Field Validators               *
   *************************************************/

  /*************************************************
   *                    Render                     *
   *************************************************/
  return (
    <>
      <FormItem>
        <Label label={t('newWithdraw.setupVoting.options')} />
        <Controller
          name="to"
          control={control}
          rules={{
            required: t('errors.required.recipient'),
            validate: validateAddress,
          }}
          render={({
            field: {name, onBlur, onChange, value},
            fieldState: {error},
          }) => (
            <>
              <AlertInline
                label={t('newWithdraw.setupVoting.releaseSoon')}
                mode="neutral"
              />
            </>
          )}
        />
      </FormItem>

      <FormItem>
        <Label label={t('newWithdraw.setupVoting.start')} />
        <Controller
          name="startDate"
          control={control}
          // rules={{required: t('errors.required.token')}}
          render={({field: {value}, fieldState: {error}}) => (
            <>
              <div className="flex space-x-1.5">
                <DateInput value={value.toISOString().substr(0, 10)} />
                <TimeInput onChange={console.log} />
                <DropdownInput onClick={console.log} />
              </div>
              {error?.message && (
                <AlertInline label={error.message} mode="critical" />
              )}
            </>
          )}
        />
      </FormItem>

      <FormItem>
        <Label
          label={t('newWithdraw.setupVoting.end')}
          helpText={t('newWithdraw.setupVoting.endSubtitle')}
        />
        <Controller
          name="endDate"
          control={control}
          // rules={{
          //   required: t('errors.required.amount'),
          //   validate: amountValidator,
          // }}
          render={({
            field: {name, onBlur, onChange, value},
            fieldState: {error},
          }) => (
            <>
              <div className="flex space-x-1.5">
                <ButtonGroup defaultValue="days">
                  <Option value="days" label="Days" />
                  <Option value="time" label="Date+Time" />
                </ButtonGroup>
                <NumberInput defaultValue={5} />
              </div>
              {error?.message ? (
                <AlertInline label={error.message} mode="critical" />
              ) : (
                <AlertInline
                  label={t('newWithdraw.setupVoting.endErrorMessage')}
                  mode="neutral"
                />
              )}
            </>
          )}
        />
      </FormItem>
    </>
  );
};

export default SetupVoting;

const FormItem = styled.div.attrs({
  className: 'space-y-1.5',
})``;
