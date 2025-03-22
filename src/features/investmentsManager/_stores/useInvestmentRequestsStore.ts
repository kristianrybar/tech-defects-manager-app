import { create } from 'zustand'
import { TInvestmentRequest } from '../_types/TInvestmentRequest'
import { TInvestmentRequestType } from '../_types/TInvestmentRequestType'

type State = {
  investmentRequests: TInvestmentRequest[]
  investmentRequestsTypes: TInvestmentRequestType[]
  set_investmentRequestsAndTypes: (newInvestmentRequests, investmentRequestsTypes) => void
}

export const useInvestmentRequestsStore = create<State>((set) => ({
  investmentRequests: [],
  investmentRequestsTypes: [],

  set_investmentRequestsAndTypes: (newInvestmentRequests, investmentRequestsTypes) => {
    set(() => ({ 
      investmentRequests: newInvestmentRequests,
      investmentRequestsTypes: investmentRequestsTypes
    }))
  }
}))