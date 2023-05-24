import lastFmApi from "@/lib/api";
import { Artist } from "@/lib/types";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Page() {
  const topArtists = await lastFmApi.getTopArtists();
  return (
    <main>
      <h2>Top 10 Artists</h2>
      <ul>
        {topArtists.artists.map((artist: Artist) => {
          return (
            <li key={artist.name}>
              <Link href={`/${artist.name}`} prefetch={false}>
                {artist.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
