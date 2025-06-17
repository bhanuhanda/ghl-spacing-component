import { useEffect, useState } from "react";
import { StateContext } from "../context";
import SpacingBox from "./SpacingBox";
import { suggestions } from "../helpers/constants";
import type { BoxModelState, ContextValue, Positions, TypeOptions, ChangedValues, HandleSuggestionClickParams, BoxModelProps } from "../types";

const BoxModel = ({ children, onValueChange, customSuggestions = [], defaultValue = "20px", disabledInputs }: BoxModelProps) => {
    const [value, setValue] = useState<BoxModelState>({
        margin: {
            left: "",
            right: "5rem",
            top: "20px",
            bottom: "2%",
        },
        padding: {
            left: "",
            right: "auto",
            top: "",
            bottom: "2vw",
        },
    });
    const [changedValues, setChangedValues] = useState<ChangedValues>({
        margin: {},
        padding: {},
    });
    const [openDialogConfig, setOpenDialogConfig] = useState<{ type: TypeOptions; position: string } | null>(null);

    const handleOpenDialog = (type: TypeOptions, position: string) => {
        setOpenDialogConfig({ type, position });
    };

    const handleCloseDialog = () => {
        setOpenDialogConfig(null);
    };

    const handleInputChange = (type: TypeOptions, position: keyof Positions, newValue: string) => {
        let sanitizedValue = newValue;
        if (!CSS.supports('width', newValue)) {
            sanitizedValue = '';
        }
        
        const newState = {
            ...value,
            [type]: {
                ...value[type],
                [position]: sanitizedValue
            }
        };

        const newChanged = {
            ...changedValues,
            [type]: {
                ...changedValues[type],
                [position]: sanitizedValue
            }
        };

        setValue(newState);
        setChangedValues(newChanged);
    };

    const handleSuggestionClick = ({ suggestion, type, position }: HandleSuggestionClickParams) => {
        const values = value[type];
        const positionValue = values[position];

        if (suggestion.applyTo === 'single') {
            const newValue = suggestion.valueFromInput ? positionValue : suggestion.value;
            const newState = {
                ...value,
                [type]: {
                    ...value[type],
                    [position]: newValue
                }
            };

            const newChanged = {
                ...changedValues,
                [type]: {
                    ...changedValues[type],
                    [position]: newValue
                }
            };

            setValue(newState);
            setChangedValues(newChanged);
        } else if (suggestion.applyTo === 'all') {
            const newValue = suggestion.valueFromInput ? positionValue : suggestion.value;
            const newState = {
                ...value,
                [type]: {
                    top: newValue,
                    right: newValue,
                    bottom: newValue,
                    left: newValue
                }
            };

            const newChanged = {
                ...changedValues,
                [type]: {
                    top: newValue,
                    right: newValue,
                    bottom: newValue,
                    left: newValue
                }
            };

            setValue(newState);
            setChangedValues(newChanged);
        }
    };

    const contextValue: ContextValue = {
        value,
        setValue,
        handleInputChange,
        suggestions: suggestions(customSuggestions, defaultValue),
        handleSuggestionClick,
        handleOpenDialog,
        handleCloseDialog,
        openDialogConfig,
        disabledInputs
    };

    useEffect(() => {
        if (onValueChange) {
            onValueChange({
                changed: changedValues,
                value: value
            });
        }
    }, [changedValues, value, onValueChange]);

    return (
        <StateContext.Provider value={contextValue}>
            <div className="spacing-wrapper">
                <SpacingBox
                    title="MARGIN"
                    type="margin"
                    styles={{ backgroundColor: "#F8FAFB" }}
                >
                    <SpacingBox
                        title="PADDING"
                        type="padding"
                        styles={{ backgroundColor: "#EDF3FA" }}
                    >
                        {children}
                    </SpacingBox>
                </SpacingBox>
            </div>
        </StateContext.Provider>
    );
};

export default BoxModel;
