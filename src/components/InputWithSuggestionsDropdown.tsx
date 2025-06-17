import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { TypeOptions, Positions } from "../types";

interface InputWithSuggestionsDropdownProps {
    value: string;
    onChange: (value: string) => void;
    type: TypeOptions;
    position: keyof Positions;
    disabled?: boolean;
}

const InputWithSuggestionsDropdown = ({ 
    value, 
    onChange, 
    type, 
    position, 
    disabled = false
}: InputWithSuggestionsDropdownProps) => {
    const [inputValue, setInputValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const commitChange = () => {
        if (inputValue !== value) {
            onChange(inputValue);
        }
        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === "Tab") {
            commitChange();
        }
    };

    return (
        <div className="input-suggestions-wrapper">
            <input
                ref={inputRef}
                className="input-box"
                placeholder="0px"
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                onBlur={commitChange}
                onKeyDown={handleKeyDown}
                disabled={disabled}
            />
            {/* Suggestions List renders here */}
        </div>
    );
};

export default InputWithSuggestionsDropdown;
