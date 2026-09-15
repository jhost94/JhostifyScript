
export const PALETTE = {
    // Grays
    gray: "#808080",
    darkGray: "#404040",
    lightGray: "#d3d3d3",
    
    // Reds
    red: "#ff0000",
    darkRed: "#8b0000",
    lightRed: "#ff6b6b",
    
    // Oranges
    orange: "#ffa500",
    darkOrange: "#ff8c00",
    
    // Yellows
    yellow: "#ffff00",
    lightYellow: "#ffffe0",
    
    // Greens
    green: "#008000",
    darkGreen: "#006400",
    lightGreen: "#90ee90",
    
    // Blues
    blue: "#0000ff",
    darkBlue: "#00008b",
    lightBlue: "#87ceeb",
    navy: "#000080",
    
    // Purples
    purple: "#800080",
    darkPurple: "#4b0082",
    lightPurple: "#dda0dd",
    
    // Browns
    brown: "#a52a2a",
    darkBrown: "#654321",
    
    // Pinks
    pink: "#ffc0cb",
    darkPink: "#c71585",
    
    // Black & White
    black: "#000000",
    white: "#ffffff",
    transparent: "transparent"
};

export class Color {
    /**
     * Parse a hex color to RGB
     */
    public static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    /**
     * Parse RGB to hex
     */
    public static rgbToHex(r: number, g: number, b: number): string {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    /**
     * Lighten a color
     */
    public static lighten(hex: string, percent: number): string {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return hex;
        const amount = Math.min(255, Math.max(0, Math.round(rgb.r + (255 - rgb.r) * percent / 100)), 255);
        return this.rgbToHex(amount, rgb.g, rgb.b);
    }

    /**
     * Darken a color
     */
    public static darken(hex: string, percent: number): string {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return hex;
        const amount = Math.min(255, Math.max(0, Math.round(rgb.r - rgb.r * percent / 100)), 255);
        return this.rgbToHex(amount, rgb.g, rgb.b);
    }

    /**
     * Get a color from the palette
     */
    public static fromPalette(name: keyof typeof PALETTE): string {
        return PALETTE[name];
    }

    /**
     * Check if a color is in the palette
     */
    public static isInPalette(name: string): name is keyof typeof PALETTE {
        return name in PALETTE;
    }
}

export type PaletteColor = keyof typeof PALETTE;
