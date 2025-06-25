import React, { useState, useRef, useCallback, useEffect } from 'react'
import type { SelectProps, valueSelect } from './Select.type'
import { isControllerProps } from './Select.type'

const useSelectLogic = (props: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const getSelectedOption = (): valueSelect => {
    if (isControllerProps(props)) {
      return props.value
    }
    return props.selectedOption
  }

  const handleOptionChange = (option: valueSelect) => {
    if (isControllerProps(props)) {
      props.onChange(option)
    } else {
      props.setSelectedOption(option)
    }
  }

  const handleOptionSelect = useCallback(
    (option: valueSelect) => {
      handleOptionChange(option)
      setIsOpen(false)

      if (isControllerProps(props) && props.onBlur) {
        props.onBlur()
      }
    },
    [props]
  )

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const closeDropdown = useCallback(() => {
    setIsOpen(false)

    if (isControllerProps(props) && props.onBlur) {
      props.onBlur()
    }
  }, [props])

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        closeDropdown()
      }
    },
    [closeDropdown]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case 'Escape':
          closeDropdown()
          break
        case 'ArrowDown':
          event.preventDefault()

          break
        case 'ArrowUp':
          event.preventDefault()

          break
        case 'Enter':
          event.preventDefault()

          break
      }
    },
    [isOpen, closeDropdown]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleClickOutside, handleKeyDown])

  return {
    isOpen,
    selectRef,
    toggleDropdown,
    handleOptionSelect,
    closeDropdown,
    selectedOption: getSelectedOption()
  }
}

const DropdownArrow: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-200 ${
      isOpen ? 'rotate-180' : 'rotate-0'
    }`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
)

const SelectOption: React.FC<{
  option: valueSelect
  onSelect: (option: valueSelect) => void
  isSelected: boolean
}> = ({ option, onSelect, isSelected }) => (
  <li
    onClick={() => onSelect(option)}
    className={`
      flex items-center justify-center py-3 px-3 cursor-pointer transition-colors duration-150
      hover:bg-gray-100 focus:bg-gray-100 focus:outline-none bg-white-300
      ${isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
    `}
    role="option"
    aria-selected={isSelected}
    tabIndex={0}
  >
    <img src={option.icon} alt={`${option.id} icon`} className="w-6 h-6 mr-2" />
  </li>
)

const CustomSelect: React.FC<SelectProps> = (props) => {
  const {
    isOpen,
    selectRef,
    toggleDropdown,
    handleOptionSelect,
    selectedOption
  } = useSelectLogic(props)

  const options = props.options
  const placeholder = props.placeholder || 'Select option'
  const disabled = props.disabled || false
  const className = props.className || ''

  const error = isControllerProps(props) ? props.error : undefined
  const name = isControllerProps(props) ? props.name : undefined

  return (
    <div className={`relative w-20  ${className}`} ref={selectRef}>
      <button
        type="button"
        name={name}
        className={`
          flex h-14 w-full items-center justify-between 
          bg-white border rounded-lg px-3 py-2
          transition-all duration-200 focus:!outline-none focus:!ring-0 
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200'}
          ${
            disabled
              ? 'opacity-50 cursor-not-allowed bg-gray-50'
              : 'cursor-pointer hover:border-gray-300 hover:shadow-sm'
          }
          ${isOpen ? ' shadow-sm' : ''}
        `}
        onClick={disabled ? undefined : toggleDropdown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={
          selectedOption ? `Selected: ${selectedOption.id}` : placeholder
        }
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        <div className="flex items-center min-w-0">
          {selectedOption ? (
            <>
              <img
                src={selectedOption.icon}
                alt={`${selectedOption.id} icon`}
                className="w-6 h-6 flex-shrink-0"
              />
              <span className="ml-2 text-sm font-medium text-gray-900 truncate sr-only">
                {selectedOption.id}
              </span>
            </>
          ) : (
            <span className="text-sm text-gray-500">{placeholder}</span>
          )}
        </div>

        {!disabled && <DropdownArrow isOpen={isOpen} />}
      </button>

      {error && (
        <p
          id={`${name}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}

      {isOpen && !disabled && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul
            className="max-h-60 overflow-auto py-1"
            role="listbox"
            aria-label="Select options"
          >
            {options.length > 0 ? (
              options.map((option) => (
                <SelectOption
                  key={option.id}
                  option={option}
                  onSelect={handleOptionSelect}
                  isSelected={selectedOption?.id === option.id}
                />
              ))
            ) : (
              <li className="py-3 px-3 text-sm text-gray-500 text-center">
                No hay opciones disponibles
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CustomSelect
