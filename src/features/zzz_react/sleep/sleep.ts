export const sleep = async (delayInMs: number = 1000) => {
    await new Promise(resolve => setTimeout(resolve, delayInMs))
} 