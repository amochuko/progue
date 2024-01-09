import axios from 'axios';
import { ENV } from './utils/config';
// import { sendTelegramMessage } from './utils';

interface MinLiquidity {
  minLiquidity: number;
}

interface Token {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  infinite_supply: boolean;
  last_updated: string;
  date_added: string;
  tags: string[];
  platform: {};
  self_reported_circulating_supply: number;
  self_reported_market_cap: number;
  quote: Record<string, { [index: string]: any }>;
}

/**
 *
 * @param minLiquidity {number} minimum amount of liquidity
 */
export async function getNewListings({ minLiquidity }: MinLiquidity) {
  let msg = '';
  const headers = {
    'X-CMC_PRO_API_KEY': ENV.COINMARKETCAP_API_KEY,
    Accept: 'application/json',
    'Accept-Encoding': 'deflate, gzip',
  };

  try {
    const latestListings = await axios.get(
      ENV.COINMARKETCAP_LASTEST_LISTINGS_URL,
      {
        headers,
      }
    );

    // Filter tokens with pools in specified dex platforms and liquidity greater than minLiquidity
    let filteredTokens = latestListings?.data?.data.filter((token: Token) => {
      if (
        token.platform &&
        token.platform['name'].toLowerCase() == 'ethereum' &&
        token.quote.USD.volume_24h < minLiquidity
      ) {
        return token;
      }
    });

    const tokenIdArr = [];
    const tokenInfoRequest = filteredTokens.slice(0, 15).map(async (token) => {
      tokenIdArr.push(token.id);

      return await axios.get(
        `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${token.id}`,
        {
          headers,
        }
      );
    });

    const tokenInfoResponse = await axios.all(tokenInfoRequest);
    const result = tokenInfoResponse.map((resp: any, i) => {
      if (resp.data.status.error_code === 0) {
        const res = resp.data.data[tokenIdArr[i]];

        return {
          name: res.name,
          symbol: res.symbol,
          contract_address: res.contract_address,
          infinite_supply: res.infinite_supply,
          platform: res.platform,
          urls: res.urls,
        };
      }
    });

    result.forEach((token: any) => {
      let website = token.urls?.website?.[0];
      let twitter = token.urls?.twitter?.[0];
      let telegram = token.urls?.chat?.[0];
      let facebook = token.urls?.facebook?.[0];
      let reddit = token.urls?.reddit?.[0];

      msg += `
      Token Name: ${token.name}
      Website: ${typeof website === 'undefined' ? 'Not Available' : website}
      Twitter: ${typeof twitter === 'undefined' ? 'Not Available' : twitter}
      Telegram: ${typeof telegram === 'undefined' ? 'Not Available' : telegram}
      Facebook: ${typeof facebook === 'undefined' ? 'Not Available' : facebook}
      Reddit: ${typeof reddit === 'undefined' ? 'Not Available' : reddit}
      `;
    });

    return msg;
  } catch (err) {
    throw Error(err);
  }
}
