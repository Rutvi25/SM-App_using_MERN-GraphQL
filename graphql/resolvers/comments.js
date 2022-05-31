const { userInputError, UserInputError } = require('apollo-server')

const Post = require('../../models/Post');

module.exports = {
  Mutation: {
    createComment: async(_, {PostId, body}, context) => {
      const { username } = checkAuth(context);
      if(body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty'
          }
        })
      }
      const post = await Post.findById(postId);
      if(post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        })
        await post.save();
        return post
      } else throw new userInputError('Post not found')
    }
  }
}