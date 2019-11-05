export type RGB = [number, number, number];

export class ColorHelper {
    static linear([r1, g1, b1]: RGB, [r2, g2, b2]: RGB, p: number): string {
        const r = r1 > r2 ? r2 + (r1 - r2) * p : r1 + (r2 - r1) * p;
        const g = g1 > g2 ? g2 + (g1 - g2) * p : g1 + (g2 - g1) * p;
        const b = b1 > b2 ? b2 + (b1 - b2) * p : b1 + (b2 - b1) * p;
        return `rgb(${r}, ${g}, ${b})`;
    }
}