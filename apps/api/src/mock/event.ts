import { ConnpassApiResponse, RawEvent } from "../infrastructure/repositories/eventRepository";

export const generateMockResponse = (params: {
  keyword?: string;
  prefecture: string;
  ym: string;
}): ConnpassApiResponse => {
  const events: RawEvent[] = []; // 型を適宜修正する

  const baseDate = new Date(params.ym);

  for (let i = 0; i < 5; i++) {
    const eventDate = new Date(baseDate);
    eventDate.setDate(baseDate.getDate() + i * 2); // 2日ごとにイベントを設定

    events.push({
      id: i + 1, // APIのレスポンスに合わせてidを設定
      event_id: i + 1,
      title: params.keyword
        ? `【${params.keyword}】勉強会 #${i + 1}`
        : `${params.prefecture}エンジニアMeetup #${i + 1}`,
      catch: "株式会社ビープラウドが主催するWeb系技術討論の会", // 固定のキャッチコピー
      description: "今回は「Python プロフェッショナル　プログラミング」執筆プロジェクトの継続的ビルドについて、お話しして頂きます。",
      url: `https://bpstudy.connpass.com/event/${i + 1}/`, // URLを動的に設定
      event_url: `https://bpstudy.connpass.com/event/${i + 1}/`, // 同じくevent_url
      image_url: "string", // 仮の画像URL
      hash_tag: "bpstudy", // 仮のハッシュタグ
      started_at: eventDate.toISOString(), // 開始日時
      ended_at: eventDate.toISOString(), // 終了日時（仮で同じ日時）
      limit: 80, // 定員を仮に設定
      event_type: "participation", // イベントタイプを仮に設定
      open_status: "open", // ステータスを仮に設定
      series: {
        id: 1,
        subdomain: "bpstudy",
        title: "BPStudy",
        url: "https://bpstudy.connpass.com/series/1/",
      },
      address: `${params.prefecture}県XX市YY町${i + 1}-${i + 1}`, // 住所を動的に生成
      place: `${params.prefecture}テックスペース`, // 場所を動的に設定
      lat: "35.729402000000", // 仮の緯度
      lon: "139.718209000000", // 仮の経度
      owner_id: 8, // 所有者ID（仮の値）
      owner_nickname: "haru860", // 所有者のニックネーム
      owner_display_name: "佐藤 治夫", // 所有者の名前
      accepted: Math.floor(Math.random() * 30) + 20, // 参加人数（ランダムに生成）
      waiting: 15, // 待機人数（仮の値）
      updated_at: new Date().toISOString(), // 更新日時を現在日時に設定
    });
  }

  // 最終的なレスポンス形式に合わせて戻す
  return {
    results_returned: events.length,
    results_available: 91, // 仮のデータ
    results_start: 1,
    events: events,
  };
};
