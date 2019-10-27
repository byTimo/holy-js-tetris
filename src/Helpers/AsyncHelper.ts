export class AsyncHelper {
    static animate(action: () => void, ms: number) {
        let then = Date.now();
        function animateInternal() {
            const now = Date.now();
            const elapsed = now - then;
            if (elapsed < ms) {
                requestAnimationFrame(animateInternal);
            } else {
                action();
            }
        }
        animateInternal();
    }

    static delay(ms: number): Promise<void> {
        return new Promise(resolove => {
            AsyncHelper.animate(resolove, ms);
        })
    }
}