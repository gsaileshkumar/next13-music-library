export class LastFMApi {
  baseUrl: string = "";
  apiKey: string = "";

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  getTopArtists = async () => {
    const method = "chart.gettopartists";
    const topArtists = await fetch(
      `${this.baseUrl}?format=json&api_key=${this.apiKey}&limit=10&method=${method}`,
      { cache: "no-store" }
    );
    const topArtistsResp = await topArtists.json();
    return {
      artists: topArtistsResp.artists.artist.map(({ name }: any) => {
        return { name };
      }),
    };
  };

  getTopAlbumsForArtist = async (artist: string) => {
    const method = "artist.gettopalbums";
    const topAlbums = await fetch(
      `${this.baseUrl}?format=json&api_key=${this.apiKey}&artist=${artist}&method=${method}`,
      { cache: "no-store" }
    );
    const topAlbumsResp = await topAlbums.json();
    return {
      artist: topAlbumsResp["topalbums"]["@attr"]["artist"],
      albums: topAlbumsResp["topalbums"]["album"].map((album: any) => {
        console.log(album);
        console.log(album.image[1]["#text"]);
        return {
          name: album.name,
          image: album.image[1]["#text"],
        };
      }),
    };
  };

  getAlbumInfo = async ({
    artist,
    album,
  }: {
    artist: string;
    album: string;
  }) => {
    const method = "album.getinfo";
    const albumInfo = await fetch(
      `${this.baseUrl}?format=json&api_key=${this.apiKey}&artist=${artist}&album=${album}&method=${method}`,
      { cache: "no-store" }
    );
    const albumInfoResp = await albumInfo.json();
    const tracks = Array.isArray(albumInfoResp?.album?.tracks?.track)
      ? albumInfoResp?.album?.tracks?.track?.map((track: any) => {
          return {
            name: track.name,
          };
        })
      : [];
    return {
      artist: albumInfoResp.album.artist,
      name: albumInfoResp.album.name,
      playCount: albumInfoResp.album.playcount,
      image: albumInfoResp.album.image[1]["#text"],
      tracks,
    };
  };
}

const lastFmApi = new LastFMApi(
  process.env.LAST_FM_API_BASE_URL ?? "",
  process.env.LAST_FM_API_KEY ?? ""
);
export default lastFmApi;
