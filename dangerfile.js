// 追加行と削除行の合計が200行を超えた場合、警告を出す
const diffSize =
  danger.github.pr.additions + danger.github.pr.deletions;
if (diffSize > 200) {
  warn("差分が200行を超えています。PRの分割を検討してください。");
}

// 編集ファイル数が10ファイルを超えた場合、警告を出す
if (danger.github.pr.changed_files > 10) {
  warn("変更ファイル数が10を超えています。PRの分割を検討してください。");
}
