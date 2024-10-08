const WatchHistory = require('../Models/history.model');
require('dotenv').config();

const addWatchHistory = async (req, res) => {
    const { movieId, name, imageUrl } = req.body;
    const userId = req.user.user.id;  // Lấy từ token

    // Log dữ liệu để kiểm tra
    console.log('Dữ liệu từ request:', { movieId, name, imageUrl, userId });

    try {
        // Tìm bản ghi đã tồn tại
        const existingHistory = await WatchHistory.findOne({ userId, movieId });

        if (existingHistory) {
            // Nếu bản ghi tồn tại, cập nhật thông tin
            existingHistory.name = name;
            existingHistory.imageUrl = imageUrl;
            existingHistory.watchedAt = new Date(); // Cập nhật thời gian xem
            await existingHistory.save(); // Lưu lại bản ghi đã cập nhật

            return res.status(200).json(existingHistory); // Trả về bản ghi đã cập nhật
        } else {
            // Nếu bản ghi không tồn tại, tạo mới
            const newHistory = new WatchHistory({ userId, movieId, name, imageUrl, watchedAt: new Date() });
            await newHistory.save();
            return res.status(201).json(newHistory); // Trả về bản ghi mới
        }
    } catch (error) {
        console.error('Lỗi khi lưu lịch sử:', error); // Log lỗi
        res.status(500).json({ error: 'Lỗi khi thêm lịch sử xem' });
    }
};

const getWatchHistory = async (req, res) => {
    const userId = req.user.user.id;  // Lấy từ token

    try {
        const history = await WatchHistory.find({ userId }).sort({ watchedAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy lịch sử xem' });
    }
};

module.exports = { 
    addWatchHistory,
    getWatchHistory
};
