import moment from 'moment';

// Returns details about what's currently playing. Polls the api every minute it appears.
// https://legacy-api.kexp.org/play/?limit=1&end_time=2017-06-06T19:24:00Z

export const nowPlaying = () => {
  // Taken from http://kexp.org/Resources/Scripts/kexp.header-1.1.js
  const date = moment(new Date()).utc().format('YYYY-MM-DDTHH:mm:00').toString() + 'Z';

  console.log('Load now playing from KEXP api');
  return fetch(`https://legacy-api.kexp.org/play/?limit=1&end_time=${date}`)
    .then(res => res.json())
    .then(json => {
      const nowPlaying = {};
      if (Array.isArray(json.results) && json.results.length > 0) {
        const result = json.results[0];
        nowPlaying.playType = result.playtype.name;
        if (result.artist) {
          nowPlaying.artist = result.artist.name;
        }
        if (result.release) {
          nowPlaying.release = result.release.name;
        }
        if (result.releaseevent) {
          nowPlaying.releaseYear = result.releaseevent.year;
        }
        if (result.track) {
          nowPlaying.track = result.track.name;
        }
        if (Array.isArray(result.comments) && result.comments.length) {
          const comment = result.comments[0].text.trim();
          if (comment.length > 0) {
            nowPlaying.comment = comment;
          }
        }
      }

      return nowPlaying;
    });
};
