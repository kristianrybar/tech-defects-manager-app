export const mockApiAny = async (url: string, method: string, payloadDummy?: unknown) => {
    const host = '/mocks' 
    let postfix = '.json'

    if (method == 'POST') {
        postfix = '.POST.json'
    } 
    
    const full = host + url + postfix
    try {
        let resp = await fetch(full)
        let data = await _apiProcess(resp)
        console.log('🦢🦢🦢 mockApiAny', full, 'resp: ', data, 'payloadDummy: ', payloadDummy)
        return data
    } catch (e) {
        return {error: e}
    }
}

const _apiProcess = async (response) => {
    let text = await response.text()
    let json
    
    try {
        json = JSON.parse(text)
    }
    catch (e) {
        return {error: 'response doesn\'t contain json'}
    }
    return json
}