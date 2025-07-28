import React from 'react';

interface NameInputProps {
  value: string;
  placeholder: string;
  maxLength: number;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NameInput = React.memo(
  ({ value, placeholder, maxLength, onChangeName }: NameInputProps) => {
    return (
      <>
        <label htmlFor="nickname" id="nickname-desc" className="sr-only">
          {placeholder}
        </label>
        <input
          required
          aria-describedby="nickname-desc"
          type="text"
          id="nickname"
          name="nickname"
          className="border-thirdary h-[40px] flex-1 overflow-hidden rounded-md border-1 px-4 text-xs"
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          onChange={onChangeName}
        />
      </>
    );
  },
);

NameInput.displayName = 'NameInput';
