import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { StateContext } from "../context";
import SpacingBox from "./SpacingBox";
import type { BoxModelState, ContextValue, Positions, TypeOptions, ChangedValues, BoxModelChange } from "../types";

interface BoxModelProps {
    children: ReactNode;
    onValueChange?: (change: BoxModelChange) => void;
}

const BoxModel = ({ children, onValueChange }: BoxModelProps) => {
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

    const contextValue: ContextValue = {
        value,
        setValue,
        handleInputChange,
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
