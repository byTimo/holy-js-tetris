export type EmitterHandler<T> = (value: T) => void;

export class Emitter<T> {
    private readonly handlers: Set<EmitterHandler<T>> = new Set();

    public register = (handler: EmitterHandler<T>) => {
        this.handlers.add(handler);
    }

    public unregister = (handler: EmitterHandler<T>) => {
        this.handlers.delete(handler);
    }

    protected emit = (value: T) => {
        for (const handle of this.handlers) {
            handle(value);
        }
    }
}