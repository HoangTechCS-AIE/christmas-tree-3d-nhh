
import { createClient } from '@vercel/kv';

export default async function handler(req, res) {
    // 1. Debug & Validation - Runs on EVERY request
    const kvUrl = process.env.KV_REST_API_URL || process.env.REDIS_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN || process.env.REDIS_REST_API_TOKEN;

    if (!kvUrl || !kvToken) {
        console.error("FATAL: Missing Environment Variables");
        console.error("URL Status:", kvUrl ? "OK" : "MISSING");
        console.error("TOKEN Status:", kvToken ? "OK" : "MISSING");

        return res.status(500).json({
            error: `Server Config Error: ${!kvUrl ? 'Missing URL' : ''} ${!kvToken ? 'Missing TOKEN' : ''}`.trim()
        });
    }

    // 2. Safe Connection
    const kv = createClient({
        url: kvUrl,
        token: kvToken,
    });

    // 3. Request Handling
    if (req.method === 'GET') {
        const guestPassword = req.headers['x-guest-password'];
        const adminPassword = req.headers['x-admin-password'];

        if (guestPassword === process.env.GUEST_PASSWORD || adminPassword === process.env.ADMIN_PASSWORD) {
            try {
                let wishes = await kv.get('wishes');
                if (!wishes) {
                    wishes = [
                        "Chúc bạn Giáng Sinh an lành! 🎄",
                        "Năm mới thật nhiều niềm vui và hạnh phúc! ❤️",
                        "Sức khỏe dồi dào, vạn sự như ý! 🎉"
                    ];
                    await kv.set('wishes', wishes);
                }
                return res.status(200).json(wishes);
            } catch (error) {
                console.error("KV GET Error:", error);
                return res.status(500).json({ error: 'Database Connection Failed: ' + error.message });
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
            await kv.set('wishes', wishes);
            return res.status(200).json({ success: true, wishes });
        } catch (error) {
            console.error("KV SET Error:", error);
            return res.status(500).json({ error: 'Database Save Failed: ' + error.message });
        }
    }

    else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
