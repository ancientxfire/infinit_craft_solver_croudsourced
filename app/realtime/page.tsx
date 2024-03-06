"use client"

import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
export const revalidate = 0;

export default async function Realtime() {
    const client = createClient();
    useEffect(() => {
        client.channel("public.infinicraftCombinations").on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'infinicraftCombinations' }, payload => {
            console.log('Change received!', payload)
            console.log(payload.new.emoji)
            document.getElementById("combCardName")!.innerHTML = payload.new.result + payload.new.emoji
            document.getElementById("combCard1")!.innerHTML = payload.new.ingredient_1
            document.getElementById("combCard2")!.innerHTML = payload.new.ingredient_2
            document.getElementById("combCard3")!.innerHTML = payload.new.username
            document.getElementById("combCard4")!.innerHTML = payload.new.comb_id
            document.getElementById("combCard5")!.innerHTML = payload.new.isNew
        })
            .subscribe()
    }, []);
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">

            <div className="animate-in  h-screen flex items-center justify-center flex-col">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-20">Latest Combination: </h1>

                <Card>
                    <CardHeader>
                        <CardTitle id="combCardName">River</CardTitle>
                    </CardHeader>
                    <CardContent>

                        <p id="combCard1">Water</p>
                        <p className="text-sm text-muted-foreground">
                            Item 1
                        </p>
                    </CardContent>
                    <CardContent>
                        <p id="combCard2">Water</p>
                        <p className="text-sm text-muted-foreground">
                            Item 2
                        </p>
                    </CardContent>
                    <CardContent>
                        <p id="combCard3">Matze</p>
                        <p className="text-sm text-muted-foreground">
                            User who found it
                        </p>
                    </CardContent>
                    <CardContent>
                        <p id="combCard4">000</p>
                        <p className="text-sm text-muted-foreground">
                            Number
                        </p>
                    </CardContent>
                    <CardContent>
                        <p id="combCard5">FALSE</p>
                        <p className="text-sm text-muted-foreground">
                            Is New?
                        </p>
                    </CardContent>

                </Card>
            </div>


            {/* <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
                <p>
                    Presented by
                    <span> </span>
                    <a href="https://mc-pixie.com?source=infcrCrouds" className="bold undeline" >MC-PIXIE</a>
                </p>
            </footer> */}

        </div>

    )
}