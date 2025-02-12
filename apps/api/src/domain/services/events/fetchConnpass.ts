import { ConnpassApiResponse, conpassEventToEntityEvent, Event } from "@workspace/contract"
import axios from "axios"

const CONNPASS_API_URL = "https://connpass.com/api/v1/event/";
const PREFECTURES = ["osaka", "hyogo"];

const getTodayYYYYMMDD = (): string => {
  const today = new Date();
  return `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
};

export const fetchConnpassEvents = async (): Promise<Event[]> => {
  const today = getTodayYYYYMMDD();
  const thisMonth = `${today.slice(0, 6)}`; // yyyymm形式で今月を取得

  try {
    const response = await axios.get<ConnpassApiResponse>(`${CONNPASS_API_URL}`, {
      params: {
        order: 2, // 開催日時順
        ym: thisMonth,
        prefecture: PREFECTURES,
      },
      // OR検索に対応していないため、paramsSerializerを使用してprefectureを複数キーで送信する
      paramsSerializer: params => {
        return Object.entries(params)
          .map(([key, value]) =>
            Array.isArray(value)
              ? value.map(v => `${key}=${encodeURIComponent(v)}`).join("&")
              : `${key}=${encodeURIComponent(value)}`
          )
          .join("&");
      },
    });

    if (response.data.results_available === 0) {
      console.log("No events found from Connpass API.");
      return [];
    }
    const events = response.data.events.map(event => conpassEventToEntityEvent(event));
    return events;
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
