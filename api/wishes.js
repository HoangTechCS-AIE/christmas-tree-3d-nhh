
import Redis from 'ioredis';

// Singleton pattern for Vercel (to avoid too many connections in hot reloads)
let redis;

if (!redis) {
    const connectionString = process.env.REDIS_URL || process.env.KV_URL || process.env.KV_REST_API_URL;

    if (!connectionString) {
        console.error("FATAL: Missing REDIS_URL or KV_URL");
    } else {
        // Handle case where user might confuse https url with redis url
        // ioredis needs 'redis://' or 'rediss://'
        if (connectionString.startsWith('http')) {
            console.warn("Warning: Using HTTP URL with ioredis. This might fail if not using REST proxy.");
        }

        try {
            redis = new Redis(connectionString);
        } catch (e) {
            console.error("Redis Init Error:", e);
        }
    }
}

export default async function handler(req, res) {
    // Check connection first
    if (!redis) {
        return res.status(500).json({ error: 'Server Config Error: Missing Database URL (REDIS_URL)' });
    }

    const WISH_KEY = 'wish_groups'; // New key for the object structure

    if (req.method === 'GET') {
        const guestPassword = req.headers['x-guest-password'];
        const adminPassword = req.headers['x-admin-password'];

        try {
            // Fetch the entire group structure
            let groupsStr = await redis.get(WISH_KEY);
            let groups = groupsStr ? JSON.parse(groupsStr) : null;

            // Initialize if empty
            if (!groups) {
                groups = {
                    "guest": [
                        "Chúc bạn Giáng Sinh an lành! 🎄",
                        "Năm mới thật nhiều niềm vui và hạnh phúc! ❤️",
                        "Sức khỏe dồi dào, vạn sự như ý! 🎉"
                    ]
                };
                // Cache for 30 days
                await redis.set(WISH_KEY, JSON.stringify(groups));
            }

            // 1. Admin Access: Return EVERYTHING
            if (adminPassword === process.env.ADMIN_PASSWORD) {
                return res.status(200).json(groups);
            }

            // 2. Guest Access: Check specific password key
            if (guestPassword && groups[guestPassword]) {
                return res.status(200).json(groups[guestPassword]);
            }

            // 3. Failed Auth
            return res.status(401).json({ error: 'Mật khẩu không đúng hoặc chưa được tạo!' });

        } catch (error) {
            console.error("Redis GET Error:", error);
            return res.status(500).json({ error: 'Connection Failed: ' + error.message });
        }
    }

    else if (req.method === 'POST') {
        const adminPassword = req.headers['x-admin-password'];
        if (adminPassword !== process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ error: 'Không có quyền Admin!' });
        }

        try {
            // body should be the full object: { "pass1": [...], "pass2": [...] }
            const newGroups = req.body;

            if (!newGroups || typeof newGroups !== 'object') {
                return res.status(400).json({ error: 'Dữ liệu không hợp lệ (phải là Object JSON)' });
            }

            // Save to Redis
            await redis.set(WISH_KEY, JSON.stringify(newGroups));

            return res.status(200).json({ success: true, groups: newGroups });
        } catch (error) {
            console.error("Redis SAVE Error:", error);
            return res.status(500).json({ error: 'Save Failed: ' + error.message });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
