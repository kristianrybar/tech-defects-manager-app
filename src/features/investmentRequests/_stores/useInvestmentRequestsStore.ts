import { create } from 'zustand'
import { TInvestmentRequest } from '../_types/TInvestmentRequest'
import { TInvestmentRequestType } from '../_types/TInvestmentRequestType'


type State = {
  investmentRequests: TInvestmentRequest[]
  investmentRequestsTypes: TInvestmentRequestType[]
  set_investmentRequestsAndTypes: (newInvestmentRequests: TInvestmentRequest[], investmentRequestsTypes: TInvestmentRequestType[]) => void
}

export const useInvestmentRequestsStore = create<State>((set) => ({
  investmentRequests: [],
  investmentRequestsTypes: [],

  set_investmentRequestsAndTypes: (newInvestmentRequests: TInvestmentRequest[], investmentRequestsTypes: TInvestmentRequestType[]) => {
    set(() => ({ 
      investmentRequests: newInvestmentRequests,
      investmentRequestsTypes: investmentRequestsTypes
    }))
  }
}))