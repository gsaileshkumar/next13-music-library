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
export default async function ArtistPage({ params }: ArtistPageProps) {
  const { artist } = params;
  const topAlbums = await lastFmApi.getTopAlbumsForArtist(
    decodeURIComponent(artist)
  );
  return (
    <div>
      <h2>{topAlbums.artist}</h2>
      <h2>Top Albums</h2>
      <ul>
        {topAlbums.albums
          .sort((album1: Album, album2: Album) =>
            album1.name.localeCompare(album2.name)
          )
          .filter((album: Album) => album.name.indexOf("null") === -1)
          .map((album: Album) => {
            const albumName = decodeURIComponent(album.name);
            return (
              <li key={album.name}>
                <Link href={`/${artist}/${album.name}`} prefetch={false}>
                  {albumName}
                </Link>
                <Image
                  src={getImage(album.image)}
                  alt={album.name}
                  width={200}
                  height={100}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
