
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

type Data = {
    name: string
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>) {

    const { id } = req.query;


    if (req.method === "GET") {
        try {
            let { db } = await connectToDatabase();
            let results = await db.collection("products").find({}).toArray();
            return res.status(200).json({ status: { code: 200, message: 'OK' }, data: results });
        } catch (error) {
            return res.json({ message: error, success: false })
        }
    }

    if (req.method === "POST") {
        try {
            const product = req.body;
            let { db } = await connectToDatabase();
            let results = await db.collection("products").insert(product);
            return res.status(200).json({ status: { code: 200, message: 'OK' }, data: results });
        } catch (error) {
            return res.json({ message: error, success: false })
        }
    }

    // if (req.method === "PUT") {
    //     try {
    //         const product = req.body;
    //         let { db } = await connectToDatabase();
    //         await db.collection("products")
    //             .updateOne({ _id: new ObjectId(req.query.id) }, { $set: product });
    //         return res.status(204).json({ status: { code: 204, message: "Updated successfully" } });;
    //     } catch (error) {
    //         return res.json({ message: error, success: false })
    //     }
    // }

    // if (req.method === "DELETE") {
    //     try {
    //         let { db } = await connectToDatabase();
    //         await db.collection("products")
    //             .deleteOne({ _id: new ObjectId(req.query.id) });
    //         return res.status(204).json({ status: { code: 204, message: "Updated successfully" } });;
    //     } catch (error) {
    //         return res.json({ message: error, success: false })
    //     }
    // }


}