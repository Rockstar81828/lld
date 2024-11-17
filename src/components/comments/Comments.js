import React, { useState } from "react";
import Comment from "./Comment";
import "./Comments.css";

const Comments = () => {
  const [comments, setComments] = useState({
    userName: "Rockstar",
    message: "Hey there",
    commentId: 1,
    subComment: [],
    familyId: 0,
  });
  const onAllReply = ({
    parentId,
    newComment,
    message,
    isEdit = false,
    isDelete = false,
    curId,
  }) => {
    const commentsClone = structuredClone(comments);

    const findParentAndUpdate = (id, curComment) => {
      if (curComment.commentId === id) {
        if (isEdit) {
          curComment.message = message;
        } else if (isDelete) {
          const newChildComments = curComment.subComment.filter(
            (c) => c.commentId !== curId
          );
          curComment.subComment = newChildComments;
          console.log(parentId, curId, newChildComments);
        } else {
          curComment.subComment.push(newComment);
        }
        return;
      } else {
        curComment.subComment.forEach((comment) => {
          findParentAndUpdate(parentId, comment);
        });
      }
    };

    findParentAndUpdate(parentId, commentsClone);
    setComments(commentsClone);
  };
  return (
    <Comment
      userName={comments.userName}
      message={comments.message}
      commentId={comments.commentId}
      onAllReply={onAllReply}
      subComment={comments.subComment}
      familyId={comments.familyId}
    />
  );
};

export default Comments;
