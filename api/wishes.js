
import { createClient } from '@vercel/kv';

const kv = createClient({
    url: process.env.KV_REST_API_URL || process.env.REDIS_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN || process.env.REDIS_REST_API_TOKEN,
});

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const guestPassword = req.headers['x-guest-password'];
        const adminPassword = req.headers['x-admin-password'];

        // Allow Admin to see list without guest password logic if needed, 
        // OR Guest with correct password.
        if (guestPassword === process.env.GUEST_PASSWORD || adminPassword === process.env.ADMIN_PASSWORD) {
            try {
                let wishes = await kv.get('wishes');
                if (!wishes) {
                    // Default wishes if empty
                    wishes = [
                        "Chúc bạn Giáng Sinh an lành! \ud83c\udf84",
                        "Năm mới thật nhiều niềm vui và hạnh phúc! \u2764\ufe0f",
                        "Sức khỏe dồi dào, vạn sự như ý! \ud83c\udf89"
                    ];
                    await kv.set('wishes', wishes);
                }
                return res.status(200).json(wishes);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Database connection failed' });
            }
        } else {
            return res.status(401).json({ error: 'Sai mật khẩu rồi!' });
        }
    }

    // ADMIN ONLY OPERATIONS
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
            return res.status(500).json({ error: 'Lỗi lưu database' });
        }
    }

    else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
