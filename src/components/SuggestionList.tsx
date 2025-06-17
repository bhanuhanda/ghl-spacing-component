import { useContext, useEffect, useRef, useState } from "react";
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
    const [dialogStyle, setDialogStyle] = useState<React.CSSProperties>({});

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

    useEffect(() => {
        if (boxRef.current) {
            const rect = boxRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            if (rect.left < 0) {
                setDialogStyle({ left: '0px' });
            }
            else if (rect.right > viewportWidth) {
                setDialogStyle({ right: '0px' });
            }
        }
    }, []);

    const handleSelection = (suggestion: Suggestion) => {
        handleSuggestionClick({ suggestion, type, position });
        onClose();
    };

    return (
        <div className="suggestion-box" ref={boxRef} style={dialogStyle}>
            {suggestions.map((suggestion, index) => (
                <p className="suggestion-item" key={index} onClick={() => handleSelection(suggestion)}>{suggestion.label}</p>
            ))}
        </div>
    );
};

export default SuggestionList;
