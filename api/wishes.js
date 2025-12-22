
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

    if (req.method === 'GET') {
        const guestPassword = req.headers['x-guest-password'];
        const adminPassword = req.headers['x-admin-password'];

        if (guestPassword === process.env.GUEST_PASSWORD || adminPassword === process.env.ADMIN_PASSWORD) {
            try {
                let wishesStr = await redis.get('wishes');
                let wishes = wishesStr ? JSON.parse(wishesStr) : null;

                if (!wishes) {
                    wishes = [
                        "Chúc bạn Giáng Sinh an lành! 🎄",
                        "Năm mới thật nhiều niềm vui và hạnh phúc! ❤️",
                        "Sức khỏe dồi dào, vạn sự như ý! 🎉"
                    ];
                    // Cache for 30 days
                    await redis.set('wishes', JSON.stringify(wishes));
                }
                return res.status(200).json(wishes);
            } catch (error) {
                console.error("Redis GET Error:", error);
                return res.status(500).json({ error: 'Connection Failed: ' + error.message });
            }
        } else {
            return res.status(401).json({ error: 'Sai mật khẩu rồi!' });
        }
    }

    else if (req.method === 'POST') {
        const adminPassword = req.headers['x-admin-password'];
        if (adminPassword !== process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ error: 'Không có quyền Admin!' });
        }

        const { wishes } = req.body;
        if (!Array.isArray(wishes)) {
            return res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
        }

        try {
            await redis.set('wishes', JSON.stringify(wishes));
            return res.status(200).json({ success: true, wishes });
        } catch (error) {
            console.error("Redis SAVE Error:", error);
            return res.status(500).json({ error: 'Save Failed: ' + error.message });
        }
    }

    else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
