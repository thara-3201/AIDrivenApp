import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  fullWidth = false,
  loading = false,
}) => {
  const className = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full-width' : ''} ${
    loading ? 'btn-loading' : ''
  }`;

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <span className="btn-spinner"></span>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
