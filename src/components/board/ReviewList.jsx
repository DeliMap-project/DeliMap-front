import style from '/src/styles/board/ReviewList.module.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const ReviewList = () => {

  const navigate = useNavigate();


  const [isReviewList, setIsReviewList] = useState([]);
  const [isReviewMenu, setIsReviewMenu] = useState(null);
  const member_id = localStorage.getItem('board_member_id');

  // 리뷰 리스트
  useEffect(() => {
    const board_no = localStorage.getItem('board_no');
    let reviewParam = {
      board_no: board_no,
    }
    axios.post(`http://localhost:3300/review/list`, reviewParam)
        .then(response => {
          setIsReviewList(response.data);
        });
  }, []);

  const hashTagListView = (review_hashtag) => {
    localStorage.setItem('review_hashtag', review_hashtag);
  }

  const reviewList_delete = (deleteReview_no) => {
    if (confirm("리뷰를 삭제하시겠습니까?")) {
      let deleteParam = {
        review_no: deleteReview_no.toString()
      }
      axios.post(`http://localhost:3300/review/deleteReview`, deleteParam).then(response => {
        location.reload();
      });
    } else {
      return false;
    }
  }
  const reviewList_menu = (reviewNo) => {
    setIsReviewMenu(isReviewMenu === reviewNo ? null : reviewNo);
  }

  return (
      <>
        <div className={style['review-list-tit']}>리뷰</div>
        {isReviewList.length >0 ? (
            <div>
        {isReviewList.map(ReviewList => {
          return (
              <div className={style['review-list-wrap']} key={ReviewList.review_no}>
                <label>
                  <div className={style['review-list-profile']}></div>
                  <span className={style['review-list-member-nickname']}>{ReviewList.member_nickname}</span>
                  <span className={style['review-list-review-space']}>ㅣ</span>
                  <div className={style["review-list-review-date"]}>{ReviewList.review_date}</div>
                  <div className={style['review-list-menu']}>
                    <img className={style['review-list-menu-img']} src={'/src/assets/icons8-menu-32.png'} alt={'메뉴'}
                         onClick={() => reviewList_menu(ReviewList.review_no)}/>
                    {isReviewMenu === ReviewList.review_no && (
                        <div>
                          <span className={style['review-list-btn-report']}>신고</span>
                          {member_id === ReviewList.member_id ?
                              <span className={style['review-list-btn-delete']}
                                    onClick={() => reviewList_delete(ReviewList.review_no)}>삭제</span> : null
                          }
                        </div>
                    )}
                  </div>
                </label>
                <div className={style['review-list-content']}>
                  <div className={style["review-list-content-img"]}>
                  <img src="/src/assets/고양이1.jpg" alt="이미지"/>
                </div>
                <div className={[style['review-list-score'], style['drag-disable']].join(" ")}>
                  <label>
                      {ReviewList.review_score >= 1 ?
                          <img src={'/src/assets/icons8-fullstar-48.png'} alt="별점"/> : <img src={'/src/assets/icons8-binstar-48.png'} alt="별점"/>}
                      {ReviewList.review_score >= 2 ?
                          <img src={'/src/assets/icons8-fullstar-48.png'} alt="별점"/> : <img src={'/src/assets/icons8-binstar-48.png'}  alt="별점"/>}
                      {ReviewList.review_score >= 3 ?
                          <img src={'/src/assets/icons8-fullstar-48.png'} alt="별점"/> : <img src={'/src/assets/icons8-binstar-48.png'} alt="별점"/>}
                      {ReviewList.review_score >= 4 ?
                          <img src={'/src/assets/icons8-fullstar-48.png'} alt="별점"/> : <img src={'/src/assets/icons8-binstar-48.png'} alt="별점"/>}
                      {ReviewList.review_score >= 5 ?
                          <img src={'/src/assets/icons8-fullstar-48.png'} alt="별점"/> : <img src={'/src/assets/icons8-binstar-48.png'} alt="별점"/>}
                  </label>
                </div>
                <div className={style["review-list-review-content"]}>
                  <span>{ReviewList.review_content}</span>
                </div>
                <div className={style["review-list-review-hashtag"]}>
                  <span>{ReviewList.review_hashtag !== null ? ReviewList.review_hashtag.split(', ')[0] : ''}</span>
                  <span>{ReviewList.review_hashtag !== null ? ReviewList.review_hashtag.split(', ')[1] : ''}</span>
                  <span>{ReviewList.review_hashtag !== null ? ReviewList.review_hashtag.split(', ')[2] : ''}</span>
                  <span>{ReviewList.review_hashtag !== null ? ReviewList.review_hashtag.split(', ')[3] : ''}</span>
                  <span>{ReviewList.review_hashtag !== null ? ReviewList.review_hashtag.split(', ')[4] : ''}</span>
                </div>
                </div>
                <hr className={style["review-list-hr"]}/>
              </div>
          )
        })}
            </div> ) : <div className={style['review-list-is-not']}> - 리뷰를 적어주세요. - </div>}
      </>
  )
}

export default ReviewList
