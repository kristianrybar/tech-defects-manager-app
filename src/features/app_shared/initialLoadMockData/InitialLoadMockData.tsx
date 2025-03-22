import { useEffect, useState } from "react"
import { sleep } from "~/zzz_react/sleep/sleep"
import { mock_GET_mockData } from "~/defectsManager/_mockApi/mock_GET_mockData"
import { useDefectsStore } from "~/defectsManager/_stores/useDefectsStore"
import { useInvestmentRequestsStore } from "~/investmentsManager/_stores/useInvestmentRequestsStore"
import LoadingCircle from '~/app_shared/loadingCircle/LoadingCircle'


const InitialLoadMockData = () => {
  const [mockApiProcessing, set_mockApiProcessing] = useState<boolean>(false)

  const { set_defects } = useDefectsStore();
  const { set_investmentRequestsAndTypes } = useInvestmentRequestsStore();
  

  const getMockCoreData_AndSave = async () => {
    set_mockApiProcessing(true)
    const resp = await mock_GET_mockData()
    await sleep() // mock loading delay
    if (resp.error) {
      set_mockApiProcessing(false)
      alert(resp.error)
      return 
    }
    set_mockApiProcessing(false)
  
    set_defects(resp.finalDefects)
    set_investmentRequestsAndTypes(resp.investmentRequests, resp.investmentRequestTypes)
  }
  
  useEffect(() => {
    getMockCoreData_AndSave()
  }, [])

  return (
    <>
      {mockApiProcessing && 
        <LoadingCircle
          size={5}
          loadingColor='green'
        />
      }
    </>
  )
}

export default InitialLoadMockData