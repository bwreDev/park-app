// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // Create a Supabase client configured to use cookies
  const supabase = createRouteHandlerClient({ cookies });

  // This assumes you have a `parks` table in Supabase. Check out
  // the `Create Table and seed with data` section of the README 👇
  // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
  const { data: park_images } = await supabase.from("park_images").select();

  return NextResponse.json(park_images);
}
