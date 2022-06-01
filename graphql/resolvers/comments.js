const { UserInputError, AuthenticationError } = require('apollo-server')

const checkAuth = require('../../util/check-auth')
const Post = require('../../models/Post');

module.exports = {
  Mutation: {
    createComment: async(_, { PostId, body }, context) => {
      const { username } = checkAuth(context);
      if(body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty'
          }
        })
      }
      const post = await Post.findById(PostId);
      if(post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        })
        await post.save();
        return post
      } else throw new userInputError('Post not found')
    },
    deleteComment: async(_, { PostId, commentId }, context) => {
      const { username } = checkAuth(context);
      const post = await Post.findById(PostId);
      if(post) {
        const commentIndex = post.comments.findIndex(comment => comment.id === commentId )
        if(post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else {
        throw new UserInputError('Post not found')
      }
    }
  }
}