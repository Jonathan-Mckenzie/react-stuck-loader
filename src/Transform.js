
export const TransformSync = (n) => {
    return new Promise((resolve) => {
        let count = 0
        for (let i = 0; i < n; i++) {
            count += Math.random()
        }
        resolve([]);
    })
}

const yieldToEventLoop = () => new Promise(resolve => setTimeout(resolve, 0));

export const TransformAsync = (n, batchSize = n / 100) => {
    return new Promise(async (resolve) => {
        let count = 0;
        for (let i = 0; i < n; i++) {
            count += Math.random()
            if (i % batchSize === 0) {
                await yieldToEventLoop();
            }
        }
        resolve([])
    })
}
