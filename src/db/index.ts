import { Index } from "@upstash/vector";

type Product = {
    id: string;
    imageId: string;
    name: string;
    size: "S" | "M" | "L";
    color: "white" | "beige" | "blue" | "green" | "purple"
}
export const db = new Index<Product>();