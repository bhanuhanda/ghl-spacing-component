import { useContext, useEffect, useRef } from "react";
import { StateContext } from "../context";
import type { TypeOptions, Positions, Suggestion } from "../types";

interface SuggestionListProps {
    type: TypeOptions;
    position: keyof Positions;
    onClose: () => void;
}

const SuggestionList = ({ type, position, onClose }: SuggestionListProps) => {
    const { suggestions, handleSuggestionClick } = useContext(StateContext);
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleSelection = (suggestion: Suggestion) => {
        handleSuggestionClick({ suggestion, type, position });
        onClose();
    };

    return (
        <div className="suggestion-box" ref={boxRef}>
            {suggestions.map((suggestion, index) => (
                <p className="suggestion-item" key={index} onClick={() => handleSelection(suggestion)}>{suggestion.label}</p>
            ))}
        </div>
    );
};

export default SuggestionList;
