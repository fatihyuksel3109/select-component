import React, { useState, useRef, useEffect } from 'react';
import ChevronDownIcon from './Icons/ChevronDownIcon';
import CheckIcon from './Icons/CheckIcon';
import './Select.css';


const Select = ({ 
  options, 
  placeholder = 'Select team members', 
  multiple = true,
  disabled = false,
  renderOption = (option) => option.name,
  onSelect,
  selectedValues = [],
  sortOptions = true,
  variant = 'default'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedValues);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedOptions, setSortedOptions] = useState([]);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let filteredOptions = options.filter(option =>
      renderOption(option).toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortOptions) {
      filteredOptions.sort((a, b) =>
        renderOption(a).localeCompare(renderOption(b))
      );
    }
    setSortedOptions(filteredOptions);
  }, [searchTerm, options, renderOption, sortOptions]);

  const toggleSelect = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option) => {
    let newSelected;
    if (multiple) {
      newSelected = selected.includes(option)
        ? selected.filter(item => item !== option)
        : [...selected, option];
    } else {
      newSelected = [option];
      setIsOpen(false);
    }
    setSelected(newSelected);
    onSelect && onSelect(newSelected);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderSelectedOption = (option) => {
    switch(variant) {
      case 'avatar':
        return (
          <span className="selected-option">
            <img src={option.avatar || "/user-photo.png"} alt="Avatar" className="user-photo" />
            {renderOption(option)}
          </span>
        );
      default:
        return <span className="selected-option">{renderOption(option)}</span>;
    }
  };

  return (
    <div className={`select-container ${disabled ? 'disabled' : ''}`} ref={selectRef}>
      <div className="select-input" onClick={toggleSelect}>
        <div className="selected-options">
          {selected.length > 0 ? (
            selected.map(option => renderSelectedOption(option))
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}
        </div>
        <ChevronDownIcon className={`chevron ${isOpen ? 'rotated' : ''}`} />
      </div>
      {isOpen && (
        <div className="options-dropdown">
          <input
            type="text"
            placeholder="Search members"
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <ul className="options-list">
            {sortedOptions.length > 0 ? (
              sortedOptions.map(option => (
                <li
                  key={option.id}
                  className={`option-item ${selected.includes(option) ? 'selected' : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {variant === 'avatar' && <img src={option.avatar || "/user-photo.png"} alt="Avatar" className="user-photo" />}
                  <span>{renderOption(option)}</span>
                  <span className="user-email">{option.email}</span>
                  {selected.includes(option) && <CheckIcon className="check-icon" />}
                </li>
              ))
            ) : (
              <li className="option-item disabled">No options available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;