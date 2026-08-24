import { mockApiAny } from '../mockApi/mockApiAny';


export const api = {
    get_m: (url:string) => mockApiAny(url, 'GET'),
    post_m: (url:string, payloadDummy: unknown) => mockApiAny(url, 'POST', payloadDummy),
}