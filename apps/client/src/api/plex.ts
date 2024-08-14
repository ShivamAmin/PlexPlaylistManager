import ky from 'ky';

const clientID = localStorage.getItem('X-Plex-Client-Identifier') || '';

const plexApi = ky.create({
  headers: {
    'X-Plex-Client-Identifier': clientID,
    'X-Plex-Product': 'PlexPlaylistManager',
  }
});

export function getPIN() {
  return plexApi.post('https://plex.tv/api/v2/pins?strong=true')
    .json()
    .then((res: any) => {
      return {id: res.id, code: res.code}
    });
}

export function verifyPIN(code: string, pinID: string) {
  return plexApi.get('https://plex.tv/api/v2/pins/' + pinID + '?code=' + code)
    .json()
    .then((res: any) => {
      return {authToken: res.authToken}
    });
}