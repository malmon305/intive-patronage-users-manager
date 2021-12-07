import React from 'react';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';

function useLoading<TState>(
  dataInitialState: TState,
  loadData: () => Promise<TState>
): [TState, boolean, React.Dispatch<React.SetStateAction<boolean>>, () => void] {
  const [data, setData] = React.useState<TState>(dataInitialState);
  const [isLoading, setIsLoading] = React.useState(true);
  const [retryCount, setRetryCount] = React.useState(0);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  React.useEffect(() => {
    const load = async () => {
      setIsLoading(true);

      const retryClick = (key: any) => {
        closeSnackbar(key);
        setRetryCount(retryCount + 1);
      };

      try {
        setData(await loadData());
      } catch {
        enqueueSnackbar("We couldn't load your data. We are sorry... :(", {
          variant: 'error',
          action: (key: any) => <Button onClick={() => retryClick(key)}>RETRY</Button>
        });
      }

      setIsLoading(false);
    };

    load();
  }, [retryCount]);

  return [data, isLoading, setIsLoading, () => setRetryCount(retryCount + 1)];
}

export default useLoading;
