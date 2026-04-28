# v0-project — 運用ノート

## Vercel 環境変数の取り扱い方針

### 原則
- **secret に当たる値 (API キー / トークン / DB 認証情報など) を Preview / Production に登録するときは、必ず Sensitive Environment Variables として登録する。**
- 公開して問題ない値 (例: `NEXT_PUBLIC_*` 系、ビルド設定フラグ、URL 等) は通常の Environment Variable でよい。
- Development 環境の secret は `vercel env pull` でローカルに取得した `.env*` をコミットしないこと (`.gitignore` 要)。

### なぜ Sensitive にするか
- Sensitive Environment Variables はダッシュボードや API から値を再取得できない (write-only)。
- 2026-04 の Vercel セキュリティインシデントでは、Sensitive 指定されていない環境変数のみが侵害対象となった。Sensitive 指定のものは影響を受けなかった。

### 追加 / 更新手順 (ダッシュボード操作)
1. Vercel ダッシュボード → 対象プロジェクト → **Settings** → **Environment Variables**
2. **Add New** をクリック
3. Key / Value を入力
4. 環境 (Production / Preview / Development) を選択
5. secret の場合は **"Sensitive"** トグルを ON にしてから Save
   - ※ 一度 Sensitive として保存した変数は、後から値を閲覧できない点に注意
6. 既存の平文 secret を Sensitive 化する場合は、一度 Remove してから Sensitive 指定で再登録する
7. 反映には再デプロイが必要 (`vercel --prod` など)

### ローテーション時の基本フロー
1. 発行元サービス (Supabase, Stripe, OpenAI, …) 側で新しいキーを発行
2. Vercel ダッシュボードで該当変数を Edit → 新しい値を貼り付け → Save (必要に応じて Sensitive 化)
3. 再デプロイ
4. 動作確認後、発行元サービスで旧キーを失効 (revoke)

### 参考
- Vercel 公式: Sensitive Environment Variables
- 2026-04 インシデント告知: https://vercel.com/kb/bulletin/vercel-april-2026-security-incident
