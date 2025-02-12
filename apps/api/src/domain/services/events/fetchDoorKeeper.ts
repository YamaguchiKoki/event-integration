import { DoorkeeperEvent, DoorkeeperEventResponse, doorkeeperEventToEntityEvent, Event } from "@workspace/contract"
import axios from "axios"

const KEYWORDS = ["IT", "プログラミング", "AI", "ソフトウェア"];
const PREFECTURES = ["osaka", "hyogo"];
const DOORKEEPER_API_URL = "https://api.doorkeeper.jp"

const getTodayISOString = (): string => new Date().toISOString().split("T")[0]; // YYYY-MM-DD

/**
 * 都道府県ごとにイベントを取得する
 * @returns 取得したイベントの配列
 */
const fetchEventsByPrefectures = async (): Promise<DoorkeeperEvent[]> => {
  const today = getTodayISOString();
  try {
    const response = await axios.get<DoorkeeperEventResponse>(
      `${DOORKEEPER_API_URL}/events`,
      {
        params: {
        sort: "starts_at",
        until: today,
        locale: "ja",
        expand: "group",
        prefecture: PREFECTURES,
      },
      // OR検索に対応していないため、paramsSerializerを使用してprefectureを複数送信する
      paramsSerializer: params => {
        return Object.entries(params)
          .map(([key, value]) =>
            Array.isArray(value)
              ? value.map(v => `${key}=${encodeURIComponent(v)}`).join("&")
              : `${key}=${encodeURIComponent(value)}`
          )
          .join("&");
      },
      }
    )
    return response.data.events ?? [];
  } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers
        });
      }
      console.error(error);
      return [];
  }
}

/**
 * キーワードごとにイベントを取得する
 * キーワードは同名キーで複数送ればOR検索にならないため、キーワードごとに個別リクエストする->TODO: 考える
 * @param keyword キーワード
 * @returns 取得したイベントの配列
 */
const fetchEventsByKeyword = async (keyword: string): Promise<DoorkeeperEvent[]> => {
  const today = getTodayISOString();

  try {
    const response = await axios.get<DoorkeeperEventResponse>(`${DOORKEEPER_API_URL}/events`, {
      params: {
        sort: "starts_at",
        until: today,
        locale: "ja",
        expand: "group",
        q: keyword,
      },
    });
    return response.data.events ?? [];
  } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error response:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers
        });
      }
      console.error(error);
      return [];
  }
};

/**
 * グループIDからグループのpublic_urlを取得する
 * @param events イベントの配列
 * @returns グループIDとpublic_urlのマッピング
 */
const fetchGroupPublicUrls = async (events: DoorkeeperEvent[]): Promise<Map<string, string>> => {
  const groupIdsSet = new Set(events.map(event => String(event.group)).filter(id => id !== undefined));

  const groupUrlMap = new Map<string, string>();

  const groupRequests = Array.from(groupIdsSet).map(async (groupId) => {
    try {
      const response = await axios.get(`${DOORKEEPER_API_URL}/groups/${groupId}`);
      groupUrlMap.set(groupId, response.data.public_url);
    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error response:", {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            headers: error.response?.headers
          });
        }
        console.error(error);
        return [];
    }
  });

  await Promise.all(groupRequests);
  return groupUrlMap;
};

export const fetchDoorkeeperEvents = async (): Promise<Event[]> => {
  const keywordResults = await Promise.all(KEYWORDS.map(fetchEventsByKeyword));
  const prefectureResults = await fetchEventsByPrefectures();

  const rawEvents = [...keywordResults.flat(), ...prefectureResults];
  if (rawEvents.length === 0) {
    console.log("No events found from Doorkeeper API.");
    return [];
  }

  const groupUrlMap = await fetchGroupPublicUrls(rawEvents);

  const events = rawEvents.map(event => doorkeeperEventToEntityEvent(event, groupUrlMap));
  return events;
}
