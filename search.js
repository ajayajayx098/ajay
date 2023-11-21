import googleIt from 'google-it';
import axios from 'axios';
import cheerio from 'cheerio';

export async function googleSearch(query) {
  try {
    const results = await googleIt({ query });
    return results.map((result) => ({ title: result.title, href: result.link }));
  } catch (error) {
    throw new Error(`Error during Google search: ${error.message}`);
  }
}

export async function getHeadlines(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const headlines = [];

    $('h2').each((index, element) => {
      headlines.push($(element).text().trim());
    });

    return headlines;
  } catch (error) {
    throw new Error(`Error fetching webpage: ${error.message}`);
  }
}
