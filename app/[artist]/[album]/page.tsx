import lastFmApi from "@/lib/api";
import { getImage } from "@/lib/helper";
import Image from "next/image";

type AlbumOverviewPageProps = {
  params: {
    artist: string;
    album: string;
  };
};

export default async function AlbumOverviewPage({
  params,
}: AlbumOverviewPageProps) {
  console.log("album page params", params);
  const { artist, album } = params;
  console.log(decodeURIComponent(artist), decodeURIComponent(album));
  const albumInfoResp = await lastFmApi.album.fetch(
    decodeURIComponent(artist),
    decodeURIComponent(album)
  );
  const albumName = decodeURIComponent(albumInfoResp.name);
  return (
    <div>
      <Image
        src={getImage(albumInfoResp.image)}
        alt={albumName}
        width={200}
        height={100}
      />
      <p>Tracks:</p>
      <ul>
        {albumInfoResp.tracks.map((track) => {
          return <li key={track.name}>{track.name}</li>;
        })}
      </ul>
    </div>
  );
}
