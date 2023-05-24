import lastFmApi from "@/lib/api";
import { getImage } from "@/lib/helper";
import { Track } from "@/lib/types";
import Image from "next/image";

type AlbumOverviewPageProps = {
  params: {
    artist: string;
    album: string;
  };
};

export const dynamic = "force-dynamic";

export default async function AlbumOverviewPage({
  params,
}: AlbumOverviewPageProps) {
  const { artist, album } = params;
  const albumInfo = await lastFmApi.getAlbumInfo({
    artist: decodeURIComponent(artist),
    album: decodeURIComponent(album),
  });
  return (
    <div>
      <h2>{albumInfo.artist}</h2>
      <h2>{albumInfo.name}</h2>
      <Image
        src={getImage(albumInfo.image)}
        alt={albumInfo.name}
        width={200}
        height={100}
      />
      <p>Album Play count: {albumInfo.playCount}</p>
      {albumInfo.tracks.length ? (
        <>
          <p>Tracks:</p>
          <ul>
            {albumInfo.tracks.map((track: Track) => {
              return <li key={track.name}>{track.name}</li>;
            })}
          </ul>
        </>
      ) : null}
    </div>
  );
}
