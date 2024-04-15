import { db } from "@/db";
import { ProductFilterValidator } from "@/lib/validator/product-validator";
import { NextRequest, NextResponse } from "next/server";

class Filter {
  private filters: Map<string, string[]> = new Map();

  hasFilter() {
    return this.filters.size > 0;
  }

  add(key: string, operator: string, value: string | number) {
    const filter = this.filters.get(key) || [];

    filter.push(
      `${key} ${operator} ${typeof value === "number" ? value : `"${value}"`}`
    );

    this.filters.set(key, filter);
  }

  addRaw(key: string, rawFilter: string) {
    this.filters.set(key, [rawFilter]);
  }

  get() {
    const parts: string[] = [];
    this.filters.forEach((filter) => {
      const groupedValue = filter.join(` OR `);
      parts.push(`(${groupedValue})`);
    });
    return parts.join(" AND ");
  }
}
export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { color, price, size, sort } = ProductFilterValidator.parse(
    body.filter
  );
  const products = await db.query({
    topK: 12,
    vector: [0, 0, 0],
    includeMetadata: true,
  });

  return NextResponse.json(products);
  // return new Response(JSON.stringify(products))
};
