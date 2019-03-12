import { useState } from 'react'
import { getStartDate, getCurrentDate, getYesterday } from '../utils/date'

const ENDPOINT =
  'https://lookup-service-prod.mlb.com/json/named.transaction_all.bam?'

export type Row = {
  player: string
  team: string
  note: string
  from_team: string
  type: string
  type_cd: 'RET' | 'DES' | 'SFA' | 'TR'
}

export type State = {
  error: any
  isLoading: boolean
  transactions: Row[]
  startDate: string
  endDate: string
}

const defaultState = {
  error: null,
  isLoading: false,
  transactions: [],
  startDate: '',
  endDate: ''
}

export const useTransactions = () => {
  const [state, setState] = useState<State>(defaultState)

  const fetchTransactions = async () => {
    const endDate = state.startDate
      ? getYesterday(state.startDate)
      : getCurrentDate()
    const startDate = getStartDate(endDate)
    const url = `${ENDPOINT}sport_code='mlb'&start_date=${startDate}&end_date=${endDate}`

    setState(_prev => ({ ..._prev, isLoading: true }))

    try {
      const response = await fetch(url)
      const data = await response.json()
      const { queryResults } = data.transaction_all

      if (queryResults.totalSize) {
        setState(_prev => ({
          ..._prev,
          isLoading: false,
          transactions: _prev.transactions.concat(
            queryResults.row
              .slice()
              .reverse()
              .filter((i: any) => i.orig_asset_type === 'PL')
          ),
          startDate,
          endDate
        }))
      } else {
        setState(_prev => ({
          ..._prev,
          error: null,
          isLoading: false,
          startDate,
          endDate
        }))
      }
    } catch (e) {
      setState(_prev => ({
        ..._prev,
        error: e,
        isLoading: false,
        startDate,
        endDate
      }))
    }
  }

  return {
    state,
    fetchTransactions
  }
}
