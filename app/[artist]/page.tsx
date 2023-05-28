import lastFmApi from "@/lib/api";
import { Album } from "@/lib/types";
import Card from "../card";
import Link from "next/link";

type ArtistPageProps = {
  params: {
    artist: string;
  };
};

export const dynamic = "force-dynamic";

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { artist } = params;
  const topAlbums = await lastFmApi.getTopAlbumsForArtist(artist);
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold text-slate-700">{topAlbums.artist}</h2>
      <h2 className="text-lg font-bold text-slate-700">Top Albums</h2>
      <ul className="flex flex-wrap">
        {topAlbums.albums
          ?.sort((album1: Album, album2: Album) =>
            album1.name.localeCompare(album2.name)
          )
          .filter((album: Album) => album.name.indexOf("null") === -1)
          .map((album: Album) => {
            return (
              <li
                key={album.name}
                className="flex flex-wrap w-full md:w-1/2 lg:w-1/3"
              >
                <Link
                  href={`/${artist}/${album.name.replace("/", " ")}`}
                  prefetch={false}
                >
                  <Card title={album.name} image={album.image} />
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
