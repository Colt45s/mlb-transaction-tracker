import { useState, useCallback } from 'react';
import { getStartDate, getCurrentDate, getYesterday } from '../utils/date';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from '../utils/useSelector';
import { Action } from '../actions/transaction';
import { fetchTransactionSuccess } from '../actions/transaction';
import { Row } from '../reducers/transaction';

const ENDPOINT =
  'https://lookup-service-prod.mlb.com/json/named.transaction_all.bam';

export function useTransactions(): [Row[], () => Promise<void>, boolean, any] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [baseDate, setBaseDate] = useState('');

  const items = useSelector(state => state.transaction.items);
  const dispatch = useDispatch<Dispatch<Action>>();

  const fetchTransactions = useCallback(
    async bd => {
      const endDate = bd ? getYesterday(bd) : getCurrentDate();
      const startDate = getStartDate(endDate);
      const url = `${ENDPOINT}?sport_code='mlb'&start_date=${startDate}&end_date=${endDate}`;

      setLoading(true);

      try {
        const response = await fetch(url);
        const data = await response.json();
        const { queryResults } = data.transaction_all;

        setLoading(false);

        if (!parseInt(queryResults.totalSize)) {
          // fetch prev week
          fetchTransactions(startDate);
        } else {
          dispatch(
            fetchTransactionSuccess(
              queryResults.row
                .slice()
                .reverse()
                .filter((i: any) => i.orig_asset_type === 'PL')
            )
          );
        }
        setBaseDate(startDate);
      } catch (e) {
        setLoading(false);
        setError(e.messsage);
      }
    },
    [dispatch]
  );

  const fetcher = useCallback(async () => {
    fetchTransactions(baseDate);
  }, [baseDate, fetchTransactions]);

  return [items, fetcher, loading, error];
}
