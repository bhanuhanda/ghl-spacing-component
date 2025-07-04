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
        handleOpenDialog,
        handleCloseDialog,
        openDialogConfig,
        disabledInputs
    } = useContext(StateContext);

    return (
        <div className="spacing-box" style={{ ...styles }}>
            <h3 className="spacing-box-title">{title}</h3>
            <div className="box-row top-row">
                <InputWithSuggestionsDropdown
                    type={type}
                    position="top"
                    value={value[type].top}
                    onChange={(val) => handleInputChange(type, 'top', val)}
                    isOpen={openDialogConfig?.type === type && openDialogConfig?.position === "top"}
                    onOpen={() => handleOpenDialog(type, "top")}
                    onClose={handleCloseDialog}
                    disabled={disabledInputs?.[type]?.includes('top') || false}
                />
            </div>
            <div className="box-row middle-row">
                <InputWithSuggestionsDropdown
                    type={type}
                    position="left"
                    value={value[type].left}
                    onChange={(val) => handleInputChange(type, 'left', val)}
                    isOpen={openDialogConfig?.type === type && openDialogConfig?.position === "left"}
                    onOpen={() => handleOpenDialog(type, "left")}
                    onClose={handleCloseDialog}
                    disabled={disabledInputs?.[type]?.includes('left') || false}
                />
                {children}
                <InputWithSuggestionsDropdown
                    type={type}
                    position="right"
                    value={value[type].right}
                    onChange={(val) => handleInputChange(type, 'right', val)}
                    isOpen={openDialogConfig?.type === type && openDialogConfig?.position === "right"}
                    onOpen={() => handleOpenDialog(type, "right")}
                    onClose={handleCloseDialog}
                    disabled={disabledInputs?.[type]?.includes('right') || false}
                />
            </div>
            <div className="box-row bottom-row">
                <InputWithSuggestionsDropdown
                    type={type}
                    position="bottom"
                    value={value[type].bottom}
                    onChange={(val) => handleInputChange(type, 'bottom', val)}
                    isOpen={openDialogConfig?.type === type && openDialogConfig?.position === "bottom"}
                    onOpen={() => handleOpenDialog(type, "bottom")}
                    onClose={handleCloseDialog}
                    disabled={disabledInputs?.[type]?.includes('bottom') || false}
                />
            </div>
        </div>
    );
};

export default SpacingBox;
