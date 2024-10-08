const Comment = require('../Models/comment.model');
const Movie = require('../Models/movie.model');

// Lấy danh sách bình luận
exports.getComments = async (req, res) => {
  const { movieId } = req.query;

  if (!movieId || typeof movieId !== 'string') {
    return res.status(400).json({ error: 'Invalid movieId format' });
  }

  try {
    const comments = await Comment.find({ movieId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Thêm một bình luận mới
exports.addComment = async (req, res) => {
  const {userId, movieId, username, content, title } = req.body;
  // const userId = req.user.user.id;
  // Kiểm tra xem movieId có được cung cấp không
  if (!movieId || typeof movieId !== 'string') {
    return res.status(400).json({ error: 'Invalid movieId format' });
  }

  // Kiểm tra các trường bắt buộc khác
  if (!userId || !username || !content.trim()) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Tìm phim theo ID
    const movie = await Movie.findOne({ id: movieId }); // Tìm theo id nếu cần thiết
    console.log('Movie found:', movie);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Tạo bình luận mới
    const newComment = new Comment({
      movieId,
      userId,
      username,
      content,
      
    });

    // Lưu bình luận vào cơ sở dữ liệu
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// Xóa một bình luận
exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (deletedComment) {
      res.status(200).json(deletedComment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

// Chỉnh sửa một bình luận
exports.editComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
    if (updatedComment) {
      res.status(200).json(updatedComment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit comment' });
  }
};
