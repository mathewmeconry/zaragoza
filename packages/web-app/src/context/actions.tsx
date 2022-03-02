import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useCallback,
} from 'react';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {Address} from '@aragon/ui-components/dist/utils/addresses';

import {ActionItem} from 'utils/types';

const ActionsContext = createContext<ActionsContextType | null>(null);

type ActionsContextType = {
  daoAddress: Address;
  actions: ActionItem[];
  counter: number;
  setCounter: (index: number) => void;
  addAction: (value: ActionItem) => void;
  duplicateAction: (index: number) => void;
  removeAction: (index: number) => void;
  setDaoAddress: (value: string) => void;
};

type Props = Record<'children', ReactNode>;

/**
 * This Context must refactor later and add more attributes to cover whole transactions process
 */

const ActionsProvider: React.FC<Props> = ({children}) => {
  const [daoAddress, setDaoAddress] =
    useState<ActionsContextType['daoAddress']>('');
  const [actions, setActions] = useState<ActionsContextType['actions']>([]);
  const [counter, setCounter] = useState<ActionsContextType['counter']>(0);

  const {control} = useFormContext();
  const {append, remove} = useFieldArray({
    control,
    name: 'actions',
  });

  const addAction = useCallback(
    newAction => {
      append(newAction);
      setActions((oldActions: ActionsContextType['actions']) => [
        ...oldActions,
        newAction,
      ]);
    },
    [append]
  );

  const removeAction = useCallback(
    (index: number) => {
      const newActions = actions.filter((_, oldIndex) => oldIndex !== index);
      setActions(newActions);

      remove(index);
    },
    [actions, remove]
  );

  const duplicateAction = useCallback(
    (index: number) => {
      append(actions[index]);
      setActions((oldActions: ActionsContextType['actions']) => [
        ...oldActions,
        oldActions[index],
      ]);
    },
    [actions, append]
  );

  const value = useMemo(
    (): ActionsContextType => ({
      daoAddress,
      actions,
      setDaoAddress,
      addAction,
      removeAction,
      duplicateAction,
      counter,
      setCounter,
    }),
    [daoAddress, actions, addAction, removeAction, duplicateAction, counter]
  );

  return (
    <ActionsContext.Provider value={value}>{children}</ActionsContext.Provider>
  );
};

function useActionsContext(): ActionsContextType {
  return useContext(ActionsContext) as ActionsContextType;
}

export {useActionsContext, ActionsProvider};
