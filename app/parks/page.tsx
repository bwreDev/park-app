"use client";

// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState, Fragment } from "react";

import { classNames } from "@/lib/classNames";

export default function Parks() {
  const [parks, setParks] = useState<any[]>([]);

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const updateParkWithImage = async (parks: any[], imagePath: string) => {};

  useEffect(() => {
    const getParks = async () => {
      // This assumes you have a `parks` table in Supabase. Check out
      // the `Create Table and seed with data` section of the README 👇
      // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
      const { data: parks } = await supabase.from("parks").select();
      if (parks) {
        setParks(parks);
      }
      const { data: images } = await supabase.storage
        .from("park_images")
        .list();

      if (images && parks) {
        const imagePath = images.map((image) => image.name).at(0);
        console.log(imagePath);
        updateParkWithImage(parks, imagePath);
      }

      console.log(images);
    };

    getParks();
  }, [supabase, setParks]);

  return (
    <div className="text-white">
      {parks.map((park) => {
        console.log(park);
        return (
          <div key={park.id} className={classNames("p-4", "bg-neutral-900")}>
            <h3 className="font-semibold text-lg">{park.title}</h3>
            <p>{park.street_address}</p>
            <p>{park.city}</p>
            <p>{park.zip_code}</p>
          </div>
        );
      })}
    </div>
  );
}
