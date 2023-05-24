import lastFmApi from "@/lib/api";
import Link from "next/link";

export default async function Page() {
  const topArtistsResp = await lastFmApi.chart.fetchTopArtists(10);
  return (
    <main>
      <h2>Top 10 Artists</h2>
      <ul>
        {topArtistsResp.artists.map((artist) => {
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
