import axios from 'axios';

import { Article, ArticleModel } from '../models';

const DATA_API_URL = "https://www.reddit.com/r/pics/.json?jsonp=";
async function fetchData() {
  try {
    const fetchedRes = await axios.get(DATA_API_URL);
    const fetchedData = fetchedRes.data;
    const childrenData = fetchedData?.data?.children;

    if (!childrenData) {
      return false;
    }

    const dataFilterPromise = childrenData.map(async(childData) => {
      const { id, url, score, title, author, num_comments, thumbnail, thumbnail_width, thumbnail_height, preview } = childData.data;
      const resolutions = preview?.images[0]?.resolutions;
      const resolution = {
        url: '', width: 0, height: 0
      }
      if (resolutions) {
        for (const resolutioni of resolutions) {
          resolution.url = resolutioni.url;
          resolution.width = resolutioni.width;
          resolution.height = resolutioni.height;
          if (resolution.width == thumbnail_width) {
            break;
          }
        }
      }

      return {
        id, url, thumbnail, score, title, author, num_comments, resolution
      }
    });

    const filteredData = await Promise.all(dataFilterPromise);
    return filteredData;
  } catch (e) {
      return false;
  }
}

async function saveData(data) {
  try {
    // Check data already exists in the database
    const filterPromise = data.filter(async(item: ArticleModel)=> {
      const exist = await Article.findOne({
        where: {id: item.id}
      });
      
      if (exist) {
        return false;
      } else {
        return true;
      }
    });
    const filteredData = await Promise.all(filterPromise);
    await Article.bulkCreate(filteredData);
  } catch (e) {
    return false;
  }
}

export async function initData() {
  const fetchResult = await fetchData();
  if (!fetchResult) {
      return false;
  }

  // const savedResult = await saveData(fetchResult);

  return true;
}
