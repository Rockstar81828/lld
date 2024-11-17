import React, { useState } from "react";

const Comment = (props) => {
  const {
    userName,
    message,
    subComment,
    commentId,
    repliedFor,
    familyId,
    onAllReply,
  } = props;

  //   const [curComment, setCurComment] = useState({
  //     userName: un,
  //     message: msg,
  //     subComment: sc,
  //     commentId: cId,
  //     repliedFor: rf,
  //     familyId: fId,
  //   });

  //   const { userName, message, subComment, commentId, repliedFor, familyId } =
  //     curComment;

  //   const [childComments, setChildComments] = useState(subComment);
  const [isEditorShown, setIsEditorShown] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editMsg, setEditMsg] = useState(message);
  const [replyUserName, setReplyUserName] = useState("");
  const [replyMessage, setReplyMessage] = useState("");

  const onReply = (e, id) => {
    // console.log("==> reply", id);
    setIsEditorShown(true);
  };

  const onEdit = () => {
    setIsEdit(true);
  };

  const onEditCancel = () => {
    setIsEdit(false);
  };

  const onEditPost = () => {
    // setCurComment({ ...curComment, message: editMsg });
    onAllReply({ parentId: commentId, message: editMsg, isEdit: true });
    setIsEdit(false);
  };

  const onDelete = (id) => {
    onAllReply({ parentId: familyId, isDelete: true, curId: id });
  };

  const onCancel = () => {
    cleanUp();
  };

  const cleanUp = () => {
    setIsEditorShown(false);
    setReplyMessage("");
    setReplyUserName("");
  };

  const onPost = (msg) => {
    const newComment = {
      commentId: Math.random() * Math.random(),
      userName: replyUserName,
      message: replyMessage,
      subComment: [],
      repliedFor: msg,
      familyId: commentId,
    };
    // setChildComments([...childComments, newComment]);
    // setCurComment({
    //   ...curComment,
    //   subComment: [...childComments, newComment],
    // });
    onAllReply({ parentId: commentId, newComment });
    cleanUp();
  };

  return (
    <div className="comment-container">
      <div className="parent-comment-container">
        <div className="user-name-container">{userName}</div>
        <div className="message-container">
          {isEdit ? (
            <textarea
              value={editMsg}
              onChange={(e) => setEditMsg(e.target.value)}
            />
          ) : (
            message
          )}
        </div>
        <div className="button-container">
          {!isEdit && (
            <>
              <button onClick={(e) => onReply(e, commentId)}>Reply</button>
              <button onClick={() => onEdit()}>Edit</button>
              <button onClick={(e) => onDelete(commentId)}>Delete</button>
            </>
          )}
          {isEdit && (
            <>
              <button onClick={onEditCancel}>Cancel</button>
              <button onClick={onEditPost}>Post</button>
            </>
          )}
        </div>
        <div>Replied for - {repliedFor} </div>
      </div>
      {subComment.map((comment) => (
        <Comment
          key={comment.commentId}
          userName={comment.userName}
          message={comment.message}
          subComment={comment.subComment}
          commentId={comment.commentId}
          repliedFor={message}
          onAllReply={onAllReply}
          familyId={comment.familyId}
        />
      ))}
      {isEditorShown && (
        <div className="parent-comment-container">
          <div className="user-name-container">
            <input
              value={replyUserName}
              onChange={(e) => setReplyUserName(e.target.value)}
            />
          </div>
          <div className="message-container">
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button onClick={onCancel}>Cancel</button>
            <button onClick={() => onPost(message)}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
};

Comment.defaultProps = {
  subComment: [],
  repliedFor: "this is first comment",
};

export default Comment;
