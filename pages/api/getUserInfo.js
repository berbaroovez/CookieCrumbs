import { auth } from "@/lib/firebase-admin";
import { getUserInfo } from "@/lib/db-admin";

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const userInfo = await getUserInfo(uid);

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ error });
  }
};
