import { bucket } from "../lib/firebase/firebase.ts";
import { nanoid } from "nanoid";

export const generateUserAvatarBlob = async (id: string) => {
  const res = await fetch(`https://api.dicebear.com/7.x/thumbs/png?seed=${id}`);
  const blob = await res.blob();
  return blob;
};

export const saveUserAvatar = async (avatarBlob: Blob, userId: string) => {
  const arrayBuffer = await avatarBlob.arrayBuffer();
  const buf = Buffer.from(arrayBuffer);
  const token = nanoid();
  const metadata = {
    metadata: {
      firebaseStorageDownloadTokens: token,
    },
    contentType: "image/png",
  };
  await bucket.file(`avatars/${userId}`).save(buf, {
    metadata: metadata,
  });
  const url = `${process.env.FIREBASE_STORAGEURL}/avatars%2F${userId}?alt=media&token=${token}`;
  return url;
};
