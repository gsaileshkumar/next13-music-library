import lastFmApi from "@/lib/api";
import { getImage } from "@/lib/helper";
import { Artist } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Page() {
  const topArtists = await lastFmApi.getTopArtists();
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold text-slate-700">Top 10 Artists</h2>
      <ul>
        {topArtists.artists.map((artist: Artist) => {
          return (
            <li key={artist.name}>
              <Link href={`/${artist.name}`} prefetch={false}>
                <div className="flex gap-2 p-1 md:p-2">
                  <div className="flex-shrink-0">
                    <Image
                      src={getImage(artist.image)}
                      alt={artist.name}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover object-center"
                    />
                  </div>
                  <p className="text-lg text-slate-700">{artist.name}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
