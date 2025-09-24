
export default class Random {
    public static readonly ALL_CHARACTERS: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    public static readonly UUID_FORMAT: string = "xxxx-xxxx-xxxx-xxxx";

    public static randomUUID(): string {
        return this.UUID_FORMAT.split("").map(c => c === "x" ? this.randomCharacter() : c).join("");
    }

    public static randomCharacter(): string {
        return this.ALL_CHARACTERS[Math.floor(Math.random() * this.ALL_CHARACTERS.length)];
    }
}