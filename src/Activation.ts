export class Activation {
    public static empty = (): Activation => new Activation(0, 0, 0);

    private _score: number;
    constructor(initial: number, public readonly max: number, public readonly activation: number) {
        this._score = initial;
    }
    public get score() {
        return this._score;
    }
    public get active() {
        return this._score >= this.activation;
    }
    public get empty() {
        return this._score === 0;
    }
    public get activationPersentage(): number {
        return this._score / this.activation;
    }
    public get maxPersentage(): number {
        return this._score / this.max;
    }

    public inc = (): boolean => {
        this._score = this._score >= this.max ? this.max : this._score + 1;
        return this.active;
    };
    public dec = (): boolean => {
        this._score = this._score <= 0 ? 0 : this._score - 1;
        return this.active;
    };

    public drop = () => {
        this._score = 0;
    }
}
