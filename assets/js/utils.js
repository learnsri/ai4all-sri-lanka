function waitForElement(selector, callback, timeout = 30000) {
    const startTime = Date.now();
    const element = document.querySelector(selector);
    if (element) {
        callback(element);
        return;
    }

    const observer = new MutationObserver(function(mutations) {
        const element = document.querySelector(selector);
        if (element) {
            observer.disconnect();
            callback(element);
        }

        if (Date.now() - startTime > timeout) {
            observer.disconnect();
            console.error(`Element ${selector} not found within ${timeout}ms`);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    setTimeout(() => {
        observer.disconnect();
        console.error(`Timeout waiting for element: ${selector}`);
    }, timeout);
}