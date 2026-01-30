import { NextResponse } from "next/server";
import {getModels} from "@/lib/mistral";
import {FetchError} from "@/lib/error";

export async function GET() {
    try {
        const res = await getModels();
        if (!res.ok){
            return NextResponse.json(
                { error: "Mistral Error" },
                { status: 500 }
            );
        }
        const models = (await res.json()).data;
        const validModels = models.filter(model => !model.deprecated);
        const uniqueModels = Array.from(
            new Map(validModels.map(model => [model.name, model])).values()
        );
        return NextResponse.json(uniqueModels, { status: 200 });
    } catch (error) {
        console.error("GET /api/data error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}