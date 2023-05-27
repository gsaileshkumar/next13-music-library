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

export const metadata = {
  title: "Fun FM - Album Page",
  description: "Music Library",
};

export const dynamic = "force-dynamic";

export default async function AlbumOverviewPage({
  params,
}: AlbumOverviewPageProps) {
  const { artist, album } = params;
  const albumInfo = await lastFmApi.getAlbumInfo({
    artist,
    album,
  });
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold text-slate-700">{albumInfo.artist}</h2>
      <h2 className="text-lg font-bold text-slate-700">{albumInfo.name}</h2>
      <Image
        src={getImage(albumInfo.image)}
        alt={albumInfo.name}
        width={200}
        height={200}
      />
      <p className="text-slate-700 font-bold">
        Album Play count: {albumInfo.playCount}
      </p>
      {albumInfo.tracks.length ? (
        <>
          <p className="text-slate-700 font-semibold">Tracks:</p>
          <ul>
            {albumInfo.tracks.map((track: Track) => {
              return (
                <li key={track.name} className="text-slate-700 italic">
                  {track.name}
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </div>
  );
}
