/* eslint-disable */

import './App.css';
import { useState } from 'react';

function App() {

  const [post, setPost] = useState(['라면 맛집', '뽀로롱', '주말 데이트'])
  const [like, setLike] = useState([0, 0, 0])

  // Modal
  const [modal, setModal] = useState(false)
  const [title, setTitle] = useState(0)

  // Input
  let [userInput, setUserInput] = useState('')

  // func
  function changeTitle() {
    const newPosts = [...post]
    newPosts[0] = '돈까스 맛집'
    setPost(newPosts)
  }

  function handleLike(i) {
    const newLikes = [...like]
    newLikes[i] += 1
    setLike(newLikes)
  }

  function sortTitle() {
    const newPosts = [...post]
    newPosts.sort()
    setPost(newPosts)
  }

  function switchModal(i) {
    setModal(!modal)
    setTitle(i)
  }

  function deletePost(i) {
    const newPosts = [...post]
    newPosts.splice(i,1)
    setPost(newPosts)
  }

  function getInput(e) {
    setUserInput(e.target.value)
  }

  function createPost() {

    if (userInput === '') {
      alert("제목을 입력해 주세요!")
      return
    }

    const newPosts = [...post]
    newPosts.unshift(userInput)
    setPost(newPosts)

    const newLikes = [...like]
    newLikes.unshift(0)
    setLike(newLikes)
  }

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()

  // jsx
  return (
    <div className="App">
      <div className="black-nav">
        <h4>Jiyeong's React</h4>
      </div>

      <button onClick={changeTitle}>글 제목 수정 😎</button>
      <button onClick={sortTitle}>정렬 매직 ✨</button>

      {
        post.map((data, i)=> {
          return (
            <>
            <div className="list" key={i}>
              <h4 onClick={() => {switchModal(i)}}>
                {data}
                <span onClick={(e) => { e.stopPropagation(); handleLike(i)}}>👍</span> {like[i]} 
              </h4>
              <p>{month}월 {date}일 발행</p>
              <button className="delete_button" onClick={() => {deletePost(i)}}>삭제</button>
            </div>
            </>
            
          )
        })
      }
      {modal ? <Modal post={post} changeTitle={changeTitle} title={title}/> : null}
      
      {/* 1.html 직접 하나 만들 필요 없음 / 2.array에 자료 추가 */}
      <input onChange={getInput}/>
      <button onClick={createPost}>등록</button>
    </div>
  );
}

function Modal(props) {
  return(
    <div className="modal">
      <h4>{props.post[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={props.changeTitle}>글 수정</button>
    </div>
  )
}


export default App;
