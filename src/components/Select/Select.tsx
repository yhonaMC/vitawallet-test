import React, { useState } from 'react'
import type { SelectProps } from './type'

const CustomSelect: React.FC<SelectProps> = ({
  options,
  setSelectedOption,
  selectedOption
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOptionClick = (option: (typeof options)[0]) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  return (
    <div className="relative w-[5rem] ">
      <div
        className="flex h-[3.375rem] items-center justify-between bg-white border border-grey-100 rounded-md  px-3 cursor-pointer "
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <img
            src={selectedOption.icon}
            alt="icons-select"
            className="w-6 h-6 mr-2"
          />
        </div>
        <svg
          className={`w-4 h-4 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white-300 border border-grey-100 rounded-md shadow-lg ">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className="flex items-center py-2 px-3 hover:bg-gray-200 cursor-pointer"
            >
              <img
                src={option.icon}
                alt="icon-option-select"
                className="w-6 h-6 mr-2"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomSelect
