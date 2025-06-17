import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { TypeOptions, Positions } from "../types";
import SuggestionList from "./SuggestionList";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

interface InputWithSuggestionsDropdownProps {
    value: string;
    onChange: (value: string) => void;
    type: TypeOptions;
    position: keyof Positions;
    disabled?: boolean;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const InputWithSuggestionsDropdown = ({
    value,
    onChange,
    type,
    position,
    disabled = false,
    isOpen,
    onOpen,
    onClose
}: InputWithSuggestionsDropdownProps): React.JSX.Element => {
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
            {/* Suggestions List Toggle */}
            <button
                disabled={disabled}
                onClick={() => isOpen ? onClose() : onOpen()}
            >
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}

            </button>
            {isOpen && !disabled ? (
                <SuggestionList
                    type={type}
                    position={position}
                    onClose={onClose}
                />
            ) : null}
        </div>
    );
};

export default InputWithSuggestionsDropdown;
