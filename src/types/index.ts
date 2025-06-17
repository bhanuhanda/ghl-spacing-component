import type { Dispatch, SetStateAction } from "react";

export interface Positions {
    left: string;
    right: string;
    top: string;
    bottom: string;
}

export interface BoxModelState {
    margin: Positions;
    padding: Positions;
}

export type TypeOptions = "margin" | "padding";

export interface ChangedValues {
    margin: Partial<Positions>;
    padding: Partial<Positions>;
}

export interface BoxModelChange {
    changed: ChangedValues;
    value: BoxModelState;
}

export interface ContextValue {
    value: BoxModelState;
    setValue: Dispatch<SetStateAction<BoxModelState>>;
    handleInputChange: (type: TypeOptions, position: keyof Positions, value: string) => void;
}
