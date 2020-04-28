import { useCallback, useRef, Dispatch } from 'react';
import { getStartDate, getCurrentDate, getYesterday } from '../../utils/date';
import { Action, Row } from '../transactionTracker';

const ENDPOINT =
  'https://lookup-service-prod.mlb.com/json/named.transaction_all.bam';

export function useTransactions(dispatch: Dispatch<Action>) {
  const startDateRef = useRef('');

  const fetchTransactions = useCallback(async () => {
    const endDate = startDateRef.current
      ? getYesterday(startDateRef.current)
      : getCurrentDate();
    const startDate = getStartDate(endDate);
    const url = `${ENDPOINT}?sport_code='mlb'&start_date=${startDate}&end_date=${endDate}`;

    startDateRef.current = startDate;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    const { queryResults } = data.transaction_all;

    if (!parseInt(queryResults.totalSize)) {
      // fetch prev week
      await fetchTransactions();
    } else {
      const row: Row | Row[] = queryResults.row;
      let processRow: Row[];

      if (row instanceof Array) {
        processRow = row;
      } else {
        processRow = [row];
      }

      dispatch({
        type: 'SUCCESS',
        payload: {
          items: processRow
            .slice()
            .reverse()
            .filter((i: any) => i.orig_asset_type === 'PL')
        }
      });
    }
  }, [dispatch]);

  return useCallback(async () => {
    try {
      await fetchTransactions();
    } catch (e) {
      dispatch({ type: 'ERROR', payload: { error: e } });
    }
  }, [dispatch, fetchTransactions]);
}
