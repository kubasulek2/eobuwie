export type ButtonProps = {
  size?: "small" | "medium" | "large";
  classes?: string[];
  id?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void; 
}