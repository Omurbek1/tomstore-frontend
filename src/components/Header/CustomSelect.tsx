import React, { useEffect, useState } from "react";

export type SelectOption = {
  label: string;
  value: string;
};

const EMPTY_OPTION: SelectOption = {
  label: "",
  value: "",
};

const CustomSelect = ({
  options,
  value,
  onChange,
  className,
}: {
  options: SelectOption[];
  value?: string;
  onChange?: (option: SelectOption) => void;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(options[0]?.value ?? "");
  const resolvedValue = value ?? internalValue;
  const selectedOption =
    options.find((option) => option.value === resolvedValue) ||
    options[0] ||
    EMPTY_OPTION;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: SelectOption) => {
    if (value === undefined) {
      setInternalValue(option.value);
    }

    onChange?.(option);
    setIsOpen(false);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((prev) => !prev);
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target instanceof Element)) {
        return;
      }

      if (!event.target.closest(".dropdown-content")) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!options.some((option) => option.value === resolvedValue)) {
      setInternalValue(options[0]?.value ?? "");
    }
  }, [options, resolvedValue]);

  return (
    <div
      className={`dropdown-content custom-select relative ${
        className || "w-[132px] sm:w-[200px]"
      }`}
    >
      <div
        className={`select-selected whitespace-nowrap ${
          isOpen ? "select-arrow-active" : ""
        }`}
        onClick={toggleDropdown}
        onKeyDown={handleTriggerKeyDown}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption.label}
      </div>
      <div
        role="listbox"
        className={`select-items ${isOpen ? "" : "select-hide"}`}
      >
        {options
          .filter((option) => option.value !== selectedOption.value)
          .map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={selectedOption.value === option.value}
              className={`select-item ${
                selectedOption === option ? "same-as-selected" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CustomSelect;
