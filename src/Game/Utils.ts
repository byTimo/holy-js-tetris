export interface Point {
    x: number;
    y: number;
}


export function animate(action: () => void, interval: number) {
    let then = Date.now();
    function animateInternal() {
        requestAnimationFrame(animateInternal);

        const now = Date.now();
        const elapsed = now - then;

        if (elapsed > interval) {
            then = now - (elapsed % interval);
            action();
        }
    }
    animateInternal();
}

export const random = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}