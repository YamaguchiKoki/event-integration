import { Handler } from "aws-lambda";
import { fetchConnpassEvents } from "./fetchConnpass";
import { fetchDoorkeeperEvents } from "./fetchDoorkeeper";
export const handler: Handler = async () => {
  console.log("Fetching events from Doorkeeper and Connpass...");

  // Doorkeeper & Connpass のイベントを取得
  const [doorkeeperEvents, connpassEvents] = await Promise.all([
    fetchDoorkeeperEvents(),
    fetchConnpassEvents(),
  ]);

  console.log(`Fetched ${doorkeeperEvents.length} events from Doorkeeper`);
  console.log(`Fetched ${connpassEvents.length} events from Connpass`);
  // 1. どちらもから配列の場合即時リターン
  // 2. TiDB接続プール作成
  // 3. events.descriptionからembedding作成
  // 4. DB保存
}
