import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import getDb from "../config/connection";

export async function craeteNewSavePoint(req: Request, res: Response) {
  const { name } = req.body ?? undefined;
  const { points } = req.body ?? 0;
  const newUser = uuid();

  try {
    const db = await getDb();
    const sendObejct: {
      name: any;
      token: string;
    } = {
      name: name,
      token: newUser,
    };
    const dbUser = await db.collection("users").insertOne(sendObejct);
    await db.collection("points").insertOne({
      user_id: dbUser.insertedId,
      points: points,
    });
    return res.status(201).send(sendObejct);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getUser(req: Request, res: Response) {
  const { token } = req.params;
  try {
    const db = await getDb();
    const user = await db.collection("users").findOne({ token: token });
    if (!user) return res.sendStatus(404);
    const userPoints = await db
      .collection("points")
      .findOne({ user_id: user._id });
    let objectReturn = {
      name: user?.name,
      token: user?.token,
      points: userPoints?.points,
      upgrade: [] as string[], 
    };

    for (let i = 0; i < userPoints?.length; i++) {
      if (i >= 2 && userPoints[i].upgrade) {
        objectReturn.upgrade[i - 2] = userPoints[i].upgrade[i - 2];
      }
    }

    return res.status(200).send(objectReturn);
  } catch (err) {
    console.log(err.message);
  }
}

export async function updateUser(req: Request, res: Response) {
  const { token } = req.params;
  const { upgrade, points } = req.body;
  try {
    const db = await getDb();
    const user = await db.collection("users").findOne({ token: token });
    if (!user) return res.sendStatus(404);
    const userPoints = await db
      .collection("points")
      .findOne({ user_id: user._id });
    let objectReturn = {
      name: user?.name,
      token: user?.token,
      points: userPoints?.points,
      upgrade: [] as string[], 
    };

    Object.keys(userPoints).forEach((key) => {
      if (key.startsWith("upgrade") && typeof userPoints[key] === "string") {
        objectReturn.upgrade.push(userPoints[key]);
      }
    });

    if (upgrade && typeof upgrade === "string") {
      objectReturn.upgrade.push(upgrade);
      await db.collection("points").updateOne(
        { user_id: user._id },
        { $set: { [`upgrade${objectReturn.upgrade.length - 1}`]: upgrade } }
      );
    }

    if (points && typeof points === "number") {
      await db.collection("points").updateOne(
        { user_id: user._id },
        { $set: { points: points } }
      );
      objectReturn.points = points;
    }

    return res.status(201).send(objectReturn);
  } catch (err) {
    console.log(err.message);
    return res.sendStatus(500);
  }
}