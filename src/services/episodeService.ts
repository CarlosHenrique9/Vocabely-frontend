import api from './api';

interface WatchTimeParams {
  episodeId: number;
  seconds: number;
}

const watchEpisodeService = {
  getWatchTime: async (episodeId: number) => {
    const token = sessionStorage.getItem("vocabely-token");

    const res = await api
      .get(`/episodes/${episodeId}/watchTime`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log(error.response.data.message);

        return error.response;
      });

    return res;
  },

  setWatchTime: async ({ episodeId, seconds }: WatchTimeParams) => {
    const token = sessionStorage.getItem("vocabely-token");

    const res = await api
      .post(
        `/episodes/${episodeId}/watchTime`,
        { seconds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        console.log(error.response.data.message);

        return error.response;
      });

    return res;
  },
};

export default watchEpisodeService;
