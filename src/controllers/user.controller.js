export async function getBindData(_req, res) {
  const { userData } = res.locals;
  const { shortenedUrls } = res.locals;
  const body = { ...userData, shortenedUrls };

  return res.status(200).send(body);
}
