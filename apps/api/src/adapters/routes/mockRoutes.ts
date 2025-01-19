// src/adapters/routes/mockRoutes.ts
import { Hono } from 'hono';
import { env } from '../../env.js';
import { AppType } from '../../application/type.js';

// パラメーターから動的にモックデータを生成する関数
const generateMockEvents = (params: {
  keyword?: string;
  prefecture: string;
  ym: string;
}) => {
  const events = [];
  const baseDate = new Date(params.ym);

  for (let i = 0; i < 5; i++) {
    const eventDate = new Date(baseDate);
    eventDate.setDate(baseDate.getDate() + i * 2); // 2日ごとにイベントを設定

    events.push({
      event_id: i + 1,
      title: params.keyword
        ? `【${params.keyword}】勉強会 #${i + 1}`
        : `${params.prefecture}エンジニアMeetup #${i + 1}`,
      place: `${params.prefecture}テックスペース`,
      address: `${params.prefecture}県XX市YY町${i + 1}-${i + 1}`,
      started_at: eventDate.toISOString(),
      ended_at: new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2時間後
      catch: "エンジニアのための技術共有と交流の場",
      description: "※これはモックデータです。実際のイベントではありません。\n\n" +
                  "今回は以下のテーマについて話し合います：\n" +
                  "・最新のWeb技術動向\n" +
                  "・システム設計のベストプラクティス\n" +
                  "・開発生産性の向上について",
      accepted: Math.floor(Math.random() * 30) + 20, // 20-50人
    });
  }

  return events;
};

export const registerMockRoutes = (app: Hono<AppType>) => {
  if (env.NODE_ENV !== 'local') {
    return;
  }

  app.get('/event', async (c) => {
    const { keyword, prefecture, ym } = c.req.query();

    if (!prefecture || !ym) {
      return c.json({
        error: 'prefecture and ym are required',
      }, 400);
    }

    const events = generateMockEvents({
      keyword,
      prefecture,
      ym,
    });

    // APIレスポンスの形式に合わせる
    return c.json({
      events: events,
    });
  });
};
