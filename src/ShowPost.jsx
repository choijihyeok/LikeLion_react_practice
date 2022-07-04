import React, { useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  PostSection,
  PostTitleDiv,
  PostTitle,
  PostListDiv,
  PagingSection,
  LoadingDiv,
  LoadingImg,
  PagenumberDiv,
  CursorDiv,
  PostRepl,
  PostReplDiv,
  ReplTitleDiv,
  ReplWriter,
  Repl,
  ReplInput,
  ReplSubmitDiv,
  WriterDiv,
} from "./styledComponent";

const ShowPost = ({apiUrl}) => {
  const Params = useParams();
  const [post, setPost] = useState(null);
  const [repls, setRepls] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [replLoading, setReplLoading] = useState(true);
  const replInput = useRef();

  useEffect(() =>{
    axios.get(`${apiUrl}posts/${Params.postID}`)
    .then(response => {
      setPost(response.data);
      setPostLoading(false);
      setRepls(response.data.repls);
      setReplLoading(false);
      replInput.current.focus();
    })
  }, []);

  const [repl, setRepl] = useState("");

  const onChange = (e) => {
    setRepl(e.target.value);
  };
  const countRepls = (repls) => {
    console.log("리뷰 개수 세는 중 ... ");
    return repls.length;
  };
  const onSubmitRepl = () => {
    axios.post(`${apiUrl}repl/`, {
      contents: repl,
      post: Params.postID,
    }).then(() =>{
      window.location.reload();
    })
  }
  const PostAndRepl = React.memo(({post, postLoading, replLoading, repls, replCount}) => {
    return (
      <>
        <PostTitleDiv>
          <PostTitle>{post && post.title}</PostTitle>
        </PostTitleDiv>

        {postLoading ? (
          <LoadingDiv>
            <LoadingImg src={`${process.env.PUBLIC_URL}/img/loading.svg`} />
          </LoadingDiv>
        ) : (
          <PostReplDiv>{post && post.contents}</PostReplDiv>
        )}
        {/*post contents*/}
        <ReplTitleDiv>댓글 {replCount} </ReplTitleDiv>
        {replLoading ? (
          <LoadingDiv>
            <LoadingImg src={`${process.env.PUBLIC_URL}/img/loading.svg`} />
          </LoadingDiv>
        ) : (
          repls &&
          repls.map((element) => (
            <PostReplDiv key={element}>
              <ReplWriter>익명</ReplWriter>
              <Repl>{element}</Repl>
            </PostReplDiv>
          ))
        )}
      </>
    );
  });
  const replCount = useMemo(() => countRepls(repls), [repls]);
  return (
    <div>
      <PostSection>
        <PostAndRepl
          post={post}
          postLoading={postLoading}
          replCount={replCount}
          replLoading={replLoading}
          repls={repls}
        />

        <WriterDiv>
          <ReplInput
            onChange={onChange}
            value={repl}
            ref={replInput}
          ></ReplInput>
          <ReplSubmitDiv onClick={onSubmitRepl}>
            <span>입력</span>
          </ReplSubmitDiv>
        </WriterDiv>
      </PostSection>
    </div>
  );
};

export default ShowPost;
