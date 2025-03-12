"use client"

import type React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
}

export const Input = ({ type, placeholder, className, ...props }: InputProps) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${className}`}
    {...props}
  />
)

export const Button = ({ children, className, ...props }: ButtonProps) => (
  <button
    className={`bg-pink-500 hover:bg-pink-600 text-white font-medium px-4 py-2 rounded-md ${className}`}
    {...props}
  >
    {children}
  </button>
)

