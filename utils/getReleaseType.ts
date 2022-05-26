import { Release } from "../clients/github/models";

// TODO: improve this
export const getReleaseType = (
  releases: Release[]
): ["major" | "minor" | "patch" | "other", boolean] => {
  if (releases.length < 2) {
    return ["other", false];
  }

  const tagRegEx = /(\d+\.)(\d+\.)(\d+)/gm;
  const newTag = releases[0].tagName;
  const oldTag = releases[1].tagName;
  const [mainOldTag] = oldTag.split("-");
  const [mainNewTag] = newTag.split("-");

  const oldTagClear = mainOldTag.match(tagRegEx);
  const newTagClear = mainNewTag.match(tagRegEx);

  const [oldMajor, oldMinor, oldPatch] = oldTagClear
    ? oldTagClear[0].split(".")
    : [];
  const [newMajor, newMinor, newPatch] = newTagClear
    ? newTagClear[0].split(".")
    : [];

  const releaseType =
    oldMajor !== newMajor && oldMajor < newMajor
      ? "major"
      : oldMinor !== newMinor
      ? "minor"
      : oldPatch !== newPatch
      ? "patch"
      : "other";
  return [releaseType, newMajor >= oldMajor];
};
