const Post = require('../models/post');

async function getPosts(req, res) {
    try{
    const posts = await Post
        .find({})
        .sort('-created')
        .limit(50)
        .select('author category title created')
        .populate('category')
        .populate('author', 'fullName username')

        .exec();

    res.json(posts);
} catch (error) {
    console.error(error);        
    res.status(500).json({ message: 'Failed to fetch posts' });

}
}

async function getSinglePost(req, res) {
    try {
        const postId = req.params.postId;
        const post = await Post.findOne({ _id: postId }).exec();

        res.json(post);
    } catch {
        console.log(err)
        res.status(500).json({ message: 'server error' })
    }
}

async function createPost(req, res) {
    const body = req.body;
    console.log(req.body)
    const post = new Post(body);

    try {
        await post.save();
        res.json(post)
    } catch (err) {

        res.status(500).json({ message: err.message});
        return;
    }
}

function removePost() {

}

function updatePost() {

}

module.exports = {
    getPosts,
    getSinglePost,
    createPost,
    removePost,
    updatePost
}