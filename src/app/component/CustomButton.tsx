// import React from "react";
// import Image from "next/image";

// interface ButtonProps {
//   onClickHandler: () => void;
//   text?: string;
//   imgIcon?: string;
//   altText?: string;
// }

// const CustomButton = ({
//   imgIcon,
//   text,
//   altText = "",
//   onClickHandler,
// }: ButtonProps) => {
//   return (
//     <button
//       onClick={onClickHandler}
//       className="w-full flex items-center justify-center gap-2 border rounded-lg p-3 mb-3 hover:bg-gray-50"
//     >
//       {imgIcon && <Image src={imgIcon} alt={altText} width={20} height={20} />}
//       {text}
//     </button>
//   );
// };

// export default CustomButton;

// components/LoadingButton.tsx
import { ButtonHTMLAttributes } from 'react';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const LoadingButton = ({ 
  loading, 
  children, 
  variant = 'primary',
  ...props 
}: LoadingButtonProps) => {
  const baseStyles = "w-full p-3 rounded-lg flex  gap-4 items-center justify-center";
  const variantStyles = {
    primary: "bg-black text-white hover:bg-gray-900",
    secondary: "border hover:bg-gray-50"
  };

  return (
    <button
      {...props}
      disabled={loading}
      className={`${baseStyles} ${variantStyles[variant]} ${loading ? 'opacity-70' : ''}`}
    >
      {loading ? (
       'Processing...'
      ) : children}
    </button>
  );
};
