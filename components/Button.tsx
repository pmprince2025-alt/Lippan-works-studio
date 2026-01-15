import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  size = 'md',
  className = '', 
  ...props 
}) => {
  // Default to justify-center unless overridden in className
  const baseStyles = "rounded-lg font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-clay-800 text-white hover:bg-clay-900 shadow-md hover:shadow-lg active:scale-[0.98]",
    secondary: "bg-clay-200 text-clay-900 hover:bg-clay-300 active:scale-[0.98]",
    outline: "border-2 border-clay-800 text-clay-800 hover:bg-clay-50 active:scale-[0.98]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const widthStyle = fullWidth ? "w-full" : "";
  
  // check if justification is specified in className to avoid conflict
  const justifyStyle = className.includes('justify-') ? '' : 'justify-center';

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${justifyStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;