import type { Suggestion } from "../types";

export const suggestions = (customSuggestions: Suggestion[] = [], defaultValue: string = "20px"): Suggestion[] => [
    {
        label: `Set this value to ${defaultValue}`,
        value: defaultValue,
        applyTo: "single"
    },
    {
        label: "Set all values to this value",
        valueFromInput: true,
        applyTo: "all"
    },
    {
        label: "Set this value to auto",
        value: "auto",
        applyTo: "single"
    },
    {
        label: "Set all values to auto",
        value: "auto",
        applyTo: "all"
    },
    {
        label: "Remove current value",
        value: "",
        applyTo: "single"
    },
    {
        label: "Remove all values",
        value: "",
        applyTo: "all"
    },
    ...customSuggestions,
]; 
