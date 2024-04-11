import { db } from "@/db"
import { NextResponse } from "next/server";

export const POST = async () => {
    const products = await db.query({
        topK: 12,
        vector: [0, 0, 0],
        includeMetadata: true
    });

    return NextResponse.json(products)
    // return new Response(JSON.stringify(products))
}