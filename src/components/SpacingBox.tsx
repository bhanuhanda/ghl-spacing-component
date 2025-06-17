import { useContext } from "react";
import { StateContext } from "../context";
import InputWithSuggestionsDropdown from "./InputWithSuggestionsDropdown";
import type { ReactNode, CSSProperties } from "react";
import type { TypeOptions } from "../types";

interface SpacingBoxProps {
    title: string;
    children: ReactNode;
    type: TypeOptions;
    styles?: CSSProperties;
}

const SpacingBox = ({ title, children, type, styles = {} }: SpacingBoxProps) => {
    const { 
        value, 
        handleInputChange, 
    } = useContext(StateContext);

    return (
        <div className="spacing-box" style={{...styles}}>
            <h3 className="spacing-box-title">{title}</h3>
            <div className="box-row top-row">
                <InputWithSuggestionsDropdown
                    type={type}
                    position="top"
                    value={value[type].top}
                    onChange={(val) => handleInputChange(type, 'top', val)}
                />
            </div>
            <div className="box-row middle-row">
                <InputWithSuggestionsDropdown
                    type={type}
                    position="left"
                    value={value[type].left}
                    onChange={(val) => handleInputChange(type, 'left', val)}
                />
                {children}
                <InputWithSuggestionsDropdown
                    type={type}
                    position="right"
                    value={value[type].right}
                    onChange={(val) => handleInputChange(type, 'right', val)}
                />
            </div>
            <div className="box-row bottom-row">
                <InputWithSuggestionsDropdown
                    type={type}
                    position="bottom"
                    value={value[type].bottom}
                    onChange={(val) => handleInputChange(type, 'bottom', val)}
                />
            </div>
        </div>
    );
};

export default SpacingBox;
