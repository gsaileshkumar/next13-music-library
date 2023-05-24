import lastFmApi from "@/lib/api";
import { getImage } from "@/lib/helper";
import Image from "next/image";
import Link from "next/link";

type ArtistPageProps = {
  params: {
    artist: string;
  };
};
export default async function ArtistPage({ params }: ArtistPageProps) {
  console.log("artists page params", params);
  const { artist } = params;
  console.log(decodeURIComponent(artist));
  const topAlbumsResp = await lastFmApi.artist.fetchTopAlbums(
    decodeURIComponent(artist)
  );
  const artistName = decodeURIComponent(topAlbumsResp.search.artist.name);
  return (
    <div>
      <h2>{artistName}</h2>
      <h2>Top Albums</h2>
      <ul>
        {topAlbumsResp.albums
          .sort((album1, album2) => album1.name.localeCompare(album2.name))
          .filter((album) => album.name.indexOf("null") === -1)
          .map((album) => {
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
