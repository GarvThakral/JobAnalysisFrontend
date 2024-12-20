import React from 'react';

interface InputProps {
  variant: 'primary' | 'secondary';
  placeholder: string;
  size: 'sm' | 'md' | 'lg';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const variantStyles = {
  primary: 'bg-purple-600 text-white placeholder-white focus:ring-2 focus:ring-purple-400 focus:border-transparent',
  secondary: 'bg-purple-300 text-purple-600 placeholder-purple-600 focus:ring-2 focus:ring-purple-200 focus:border-transparent',
};

const sizeStyles = {
  sm: 'px-4 py-1 w-36',
  md: 'px-6 py-3 w-56 md:w-64',
  lg: 'px-8 py-3 w-72 lg:w-80',
};

export function Input(props:InputProps){
    const baseStyle = 'rounded-2xl outline-none transition duration-300 ease-in-out focus:outline-none focus:ring-2';
    const combinedClassName = `${baseStyle} ${variantStyles[props.variant]} ${sizeStyles[props.size]} ${props.className || ''}`;

    return (
      <input
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={combinedClassName}
      />
    );
}
export default Input;
