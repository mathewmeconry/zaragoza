import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Loading} from 'components/temporary';
import ProposalStepper from 'containers/proposalStepper';
import {ActionsProvider} from 'context/actions';
import {CreateProposalProvider} from 'context/createProposal';
import {useDaoDetailsQuery} from 'hooks/useDaoDetails';
import {CreateProposalFormData} from 'utils/types';

export const NewProposal: React.FC = () => {
  const {data, isLoading} = useDaoDetailsQuery();

  const [showTxModal, setShowTxModal] = useState(false);

  const formMethods = useForm<CreateProposalFormData>({
    mode: 'onChange',
    defaultValues: {
      links: [{name: '', url: ''}],
      startSwitch: 'now',
      durationSwitch: 'duration',
      actions: [],
    },
  });

  const enableTxModal = () => {
    setShowTxModal(true);
  };

  /*************************************************
   *                    Render                     *
   *************************************************/
  if (isLoading) return <Loading />;

  if (!data) return null;

  return (
    <FormProvider {...formMethods}>
      <ActionsProvider daoId={data.address}>
        <CreateProposalProvider
          showTxModal={showTxModal}
          setShowTxModal={setShowTxModal}
        >
          <ProposalStepper enableTxModal={enableTxModal} />
        </CreateProposalProvider>
      </ActionsProvider>
    </FormProvider>
  );
};
