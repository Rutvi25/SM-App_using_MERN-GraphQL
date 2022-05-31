const { AuthenticationError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports ={
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts
      } catch(err) {
        throw new Error(err);
      }
    },
    async getPost(_, { PostId }) {
      try {
        const post = await Post.findById(PostId);
        if(post) {
          return post;
        } else {
          throw new Error('Post not found')
        }
      } catch(err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      console.log(user)
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const post = await newPost.save();
      return post
    },
    async deletePost(_, {PostId}, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(PostId);
        if(user.username === post.username) {
          await post.delete();
          return 'Post deleted'
        } else {
          throw new AuthenticationError('Action not allowed')
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
}