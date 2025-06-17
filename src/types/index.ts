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

export interface Suggestion {
    label: string;
    value?: string;
    valueFromInput?: boolean;
    applyTo: "single" | "all";
}

export interface HandleSuggestionClickParams { 
    suggestion: Suggestion; 
    type: TypeOptions; 
    position: keyof Positions 
}

export interface ContextValue {
    value: BoxModelState;
    setValue: Dispatch<SetStateAction<BoxModelState>>;
    handleInputChange: (type: TypeOptions, position: keyof Positions, value: string) => void;
    suggestions: Suggestion[];
    handleSuggestionClick: (params: HandleSuggestionClickParams) => void;
    handleOpenDialog: (type: TypeOptions, position: string) => void;
    handleCloseDialog: () => void;
    openDialogConfig: { type: TypeOptions; position: string } | null;
}
