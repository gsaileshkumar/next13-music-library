import lastFmApi from "@/lib/api";
import { Artist } from "@/lib/types";
import Link from "next/link";
import Card from "./card";

export const dynamic = "force-dynamic";

export default async function Page() {
  const topArtists = await lastFmApi.getTopArtists();
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold text-slate-700">Top 10 Artists</h2>
      <ul className="flex flex-wrap">
        {topArtists.artists.map((artist: Artist) => {
          return (
            <li key={artist.name} className="w-full md:w-1/2 lg:w-1/3">
              <Link href={`/${artist.name}`} prefetch={false}>
                <Card title={artist.name} image={artist.image} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
