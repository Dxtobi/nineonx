const { default: axios } = require("axios");
const  cheerio  = require("cheerio");


/**https://9jarocks.net
 * @async
 * @function getMovies
 * @description Fetches a list of movies based on a provided tag.
 * @param {string} tag - The tag to search for movies.
 * @returns {Promise<Array<{ imageUrl: string, info_link: string, title: string, type:string }>>}
 *   A promise that resolves to an array of movie objects. Each object has the following properties:
 *     - `imageUrl`: The URL of the movie poster image (extracted using a regular expression).
 *     - `info_link`: The URL of the movie details page.
 *     - `title`: The title of the movie.
 *     - `type`: series or movie.
 */

const getMovies = async (tag) => {
    let data = [];
    const axiosResponse = await axios.request({
      method: 'GET',
      url: `https://9jarocks.net/tag/${tag}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      },
    });
    const $ = cheerio.load(axiosResponse.data);
    const regex = /url\((.*?)\)/;
  
    $('.post-element').each((index, element) => {
      const title = $(element).find('.thumb-title a').text().trim();
      const info_link = $(element).find('a').attr('href');
      const match = $(element).find('.slide').attr('style');
      const type = $(element).find('.thumb-overlay a.post-cat').text().trim();

      const imageUrl = regex.exec(match)[1];

      data.push({ imageUrl, info_link, title, type });
    });
    return data;
  };
  
  /**https://9jarocks.net
   * @async
   * @function searchMovies
   * @description Fetches a list of movies based on a search term.
   * @param {string} tag - The search term to use for finding movies.
   * @returns {Promise<Array<{ imageUrl: string, info_link: string, title: string }>>}
   *   A promise that resolves to an array of movie objects. Each object has the following properties:
   *     - `imageUrl`: The URL of the movie poster image (extracted using a regular expression).
   *     - `info_link`: The URL of the movie details page.
   *     - `title`: The title of the movie.
   */
  const searchMovies = async (tag) => {
    let data = [];
    const axiosResponse = await axios.request({
      method: 'GET',
      url: `https://9jarocks.net/?s=${tag}`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      },
    });
    const $ = cheerio.load(axiosResponse.data);
    const regex = /url\((.*?)\)/;
  
    $('.post-element').each((index, element) => {
      const title = $(element).find('.thumb-title a').text().trim();
      const info_link = $(element).find('a').attr('href');
      const match = $(element).find('.slide').attr('style');
      const imageUrl = regex.exec(match)[1];
      data.push({ imageUrl, info_link, title });
    });
    return data;
  };
  
/**https://9jarocks.net
   * @async
   * @function getDetails
   * @description Fetches the full details of a movie given its URL.
   * @param {string} url - The URL of the movie details page.
   * @returns {Promise<{ details: string, imageUrl: string, info_link: string, title: string, youtube: string, episodes: Array<{ episode: string, download_link: string }> }>}
   *   A promise that resolves to an object containing the movie's details. The object has the following properties:
   *     - `details`: The movie plot description (if available, extracted from a blockquote).
   *     - `imageUrl`: The URL of the movie poster image (if available).
   *     - `info_link`: The URL of the movie details page.
   *     - `title`: The title of the movie.
   *     - `youtube`: The URL of the YouTube trailer (if available, extracted from an iframe).
   *     - `episodes`: An array of episode objects (if applicable, extracted from paragraphs). Each episode object has the following properties:
   *       - `episode`: The episode title or number (if available, extracted from emphasized text).
   *       - `download_link`: The URL to download the episode (if available, extracted from a link with the class "fa-fa-download").
   */
const getDetails = async (url) => {
      console.log(url)
      let data = {
          details: '',
          imageUrl: '',
          info_link: '',
          title: '',
          youtube:'',
  
          episodes:[]
      };
      const axiosResponse = await axios.request({
        method: 'GET',
        url: `${url}`,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        },
      });
      const $ = cheerio.load(axiosResponse.data);
      const regex = /url\((.*?)\)/;
    let episodes =[]
      $('.entry-content').each((index, element) => {
        const title = $('.entry-header h1.post-title').text().trim();
        const info_link = $(element).find('p a').attr('href');
        const imageUrl = $(element).find('p img').attr('src');
        const details = $(element).find('blockquote p').text().trim();
        const youtube = $(element).find('div.tie-fluid-width-video-wrapper iframe').attr('src');
      //  const imageUrl = regex.exec(match)[1];
      console.log(youtube)
      $(element).find('p').each((i, p) => {
          let episode = $(p).find('em').text().trim();
          let download_link = $(p).find('a.fa-fa-download').attr('href')
         
         
          episodes.push({episode, download_link, })
  
      });
      episodes = episodes.filter((e)=>e.episode!="" || e.download_link)
        data={ imageUrl, info_link, title, details,youtube, episodes };
      });
      return data;
};
  
/**https://9jarocks.net
 * @async
 * @function getMovies
 * @description Fetches a list of movies based on a provided tag.
 * @param {string} tag - The tag to search for movies.
 * @returns {Promise<Array<{ imageUrl: string, info_link: string, title: string, type:string }>>}
 *   A promise that resolves to an array of movie objects. Each object has the following properties:
 *     - `imageUrl`: The URL of the movie poster image (extracted using a regular expression).
 *     - `info_link`: The URL of the movie details page.
 *     - `title`: The title of the movie.
 *     - `type`: series or movie.
 */

const getByCategory = async (category) => {
  let data = [];
  const axiosResponse = await axios.request({
    method: 'GET',
    url: `https://9jarocks.net/category/videodownload/${category}`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    },
  });
  const $ = cheerio.load(axiosResponse.data);
  const regex = /url\((.*?)\)/;

  $('.post-element').each((index, element) => {
    const title = $(element).find('.thumb-title a').text().trim();
    const info_link = $(element).find('a').attr('href');
    const match = $(element).find('.slide').attr('style');
    const type = $(element).find('.thumb-overlay a.post-cat').text().trim();

    const imageUrl = regex.exec(match)[1];

    data.push({ imageUrl, info_link, title, type });
  });
  return data;
};

/**https://9jarocks.net
 * @async
 * @function getMovies
 * @description Fetches a list of movies based on a provided tag.
 * @param {string} tag - The tag to search for movies.
 * @returns {Promise<Array<{ imageUrl: string, info_link: string, title: string, type:string }>>}
 *   A promise that resolves to an array of movie objects. Each object has the following properties:
 *     - `imageUrl`: The URL of the movie poster image (extracted using a regular expression).
 *     - `info_link`: The URL of the movie details page.
 *     - `title`: The title of the movie.
 *     - `type`: series or movie.
 */

const getDownloadLink= async (url) => {
  let data = '';
  const axiosResponse = await axios.request({
    method: 'GET',
    url: `${url}`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    },
  });
  const $ = cheerio.load(axiosResponse.data);

  try {
  
    let info_link =''//= $('.container').find('.download-timer a span').text();
    $('script').each((i, elem) => {
      const scriptContent = $(elem).html();
      const hrefMatch = scriptContent.match(/href='([^']*)'/);
      if (hrefMatch && hrefMatch[1]) {
        info_link = hrefMatch[1];
      }
  });
    return info_link
  } catch (error) {
    // @ts-ignore
    console.error("<<<<☣>>>>", error.message);
    return {}
  }
  
//   const info_link = $('.container').find('.download-timer a span').text();
//   data=info_link
// console.log(info_link)
  
//   return axiosResponse.data;
};
module.exports = {
    getDetails, searchMovies, getMovies, getByCategory, getDownloadLink
}