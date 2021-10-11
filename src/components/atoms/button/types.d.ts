import {HTMLProps} from "react";

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large',
  classes?: string[];
  id?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void; 
};
