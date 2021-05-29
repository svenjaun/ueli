export interface MtgOptions {
    isEnabled: boolean;
    showManacost: boolean;
    prefix: string;
}

export const defaultMtgOptions: MtgOptions = {
    isEnabled: true,
    showManacost: true,
    prefix: "mtg?"
};
