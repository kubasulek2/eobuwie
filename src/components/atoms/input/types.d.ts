export type InputProps = {
  value: string;
  onChange(v: string): void;
  type?: "text" | "date" 
  placeholder?: string
  id?:string
  classes?:string[]
}