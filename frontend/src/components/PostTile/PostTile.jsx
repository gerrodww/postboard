import { useSelector } from 'react-redux';
import NewComment from './NewComment';
import NewLike from './NewLike';
import Unlike from './Unlike';
import './PostTile.css';

const PostTile = ({ posts }) => {
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className='posts-container'>
      {posts?.sort((a, b) => b.id - a.id).map((post) => (
        <div className='post-tile' key={post.id}>
          <h2>{post.User.username}</h2>
          <p className='post-body'>{post.body}</p>
          {currentUser && post.Comments.length > 0 && (
            <div className='comments-container'>
              <h4>Comments</h4>
              <ul>
                {post.Comments.sort((a, b) => a.id - b.id).map(comment => (
                  <li key={comment.id}>{comment.body}</li>
                  ))}
              </ul>
            </div>
          )}
          {currentUser && (
            <p>Likes: {post.Likes.length}</p>
            )}
          <div>
            {currentUser && (
              <NewComment postId={post.id}/>
            )}
          </div>
          {currentUser && currentUser.id !== post.userId && (
            <>
            {post.Likes?.some(like => like.userId === currentUser.id) ? (
            <Unlike postId={post.id}/>
          ) : (
            <NewLike postId={post.id}/>
          )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default PostTile;