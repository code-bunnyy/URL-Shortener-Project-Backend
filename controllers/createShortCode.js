import Url from "../models/Url.js";
import redis from "../config/redis.js";
import { encodeBase62 } from "../utils/base62.js";

export const createShortCode = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                message: "originalUrl is required",
            });
        }

        const existingUrl = await Url.findOne({ originalUrl });

        if (existingUrl) {
            return res.status(200).json({
                shortCode: existingUrl.shortCode,
                originalUrl: existingUrl.originalUrl,
                shortUrl: `${process.env.BACKEND_URL}/u/${existingUrl.shortCode}`,
            });
        }

        const counterValue = await redis.incr("url:counter");
        const shortCode = encodeBase62(counterValue);

        const url = await Url.create({
            shortCode,
            originalUrl,
        });

        return res.status(201).json({
            shortCode: url.shortCode,
            originalUrl: url.originalUrl,
            shortUrl: `${process.env.BACKEND_URL}/u/${url.shortCode}`,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Could not shorten URL",
        });
    }
};