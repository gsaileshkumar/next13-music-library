import lastFmApi from "@/lib/api";
import { getImage } from "@/lib/helper";
import { Album } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type ArtistPageProps = {
  params: {
    artist: string;
  };
};

export const metadata = {
  title: "Fun FM - Artist Page",
  description: "Music Library",
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
              <li key={album.name} className="flex w-1/3 flex-wrap">
                <Link href={`/${artist}/${album.name}`} prefetch={false}>
                  <div className="flex gap-2 p-1 md:p-2">
                    <div className="flex-shrink-0">
                      <Image
                        src={getImage(album.image)}
                        alt={album.name}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover object-center"
                      />
                    </div>
                    <p className="text-lg text-slate-700 text-ellipsis">
                      {album.name}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
