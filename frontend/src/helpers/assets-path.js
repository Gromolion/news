import urlJoin from "url-join";

export function assets(url) {
  return urlJoin("/api", url);
}
