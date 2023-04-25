const Post = require('../models/post');

async function getPosts(req, res) {
  try {

    const posts = await Post
      .find({author: req.user._id})
      .sort('-created')
      .limit(50)
      .select('author category title created')
      .populate('category')
      .populate('author', 'fullName username')

      .exec();

    res.json(posts);
  } catch (error) {
    console.log(error)
    res.status(500).json ({ message: error.message });

  }
}

async function getSinglePost(req, res) {
  try {
    const postId = req.params.postId;
    const post = await Post
    .findOne({_id: postId, author: req.user._id})
    .exec();

    res.json(post);
  } catch (error){
    console.log(error)
    res.status(500).json ({ message: error.message });
  }
}

async function createPost(req, res) {
  const body = req.body;
  const post = new Post(body);

  post.author = req.user._id;

  try {
    await post.save();
    res.json(post)
  } catch (error) {
    res.status(500).json ({ message: error.message });
}
}


async function removePost(req,res) {
  try {
    const postId = req.params.postId;
    const post = await Post
    .deleteOne({_id: postId, author: req.user._id})
    .exec()
    res.send('removed')

    } catch (error) {
    res.status(500).send(error.message);
    
  }

}


async function updatePost(req,res) {
  try {
    const postId = req.params.postId;
    const content = req.body.content;
    const post = await Post.updateOne(
      {_id: postId, author: req.user._id },
      { $set: { content: content }}).exec();
    res.send(content)
  } catch (error) {
    res.status(500).send(error.message)
  }
}



module.exports = {
  getPosts,
  getSinglePost,
  createPost,
  removePost,
  updatePost
}