export type StarRatingProps = {
  score: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4.5 | 5;
  votes: number;
  size?: "small" | "medium" | "large"; 
  id?: string
}