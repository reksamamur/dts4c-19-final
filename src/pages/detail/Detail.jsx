import { useState, useEffect, useCallback } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  addBookmark,
  addVotes,
  checkBookmark,
  removeBookmark,
  getVoted,
} from "../../utils";

import { useAuth } from "../../context/AuthContext";

import {
  Typography,
  Box,
  IconButton,
  Link,
  Snackbar,
  CircularProgress,
} from "@mui/material";

import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Star } from "@mui/icons-material";

import { ThemeProvider } from "@mui/material/styles";
import { ThemeCreate } from "../../utils/themeprovider/theme-create";

import moment from "moment-timezone";
import debounce from "lodash.debounce";

const DetailComp = ({
  bookmarkState,
  image,
  title,
  isoDate,
  contentSnippet,
  bookmark,
  deletebookmark,
  source,
  share,
  vote,
  progress,
  voteState
}) => {
  const [timePost, setTimePost] = useState();

  const postTimes = () => {
    let agos = moment(isoDate).fromNow();
    setTimePost(agos);
  };

  useEffect(() => {
    postTimes();
  }, [timePost]);

  return (
    <ThemeProvider theme={ThemeCreate}>
      <Box
        sx={{
          width: "100%",
          paddingBottom: "30px",
          paddingTop: "30px",
          paddingX: 5,
        }}
      >
        <Typography variant="title">{title}</Typography>

        <img src={image} className="image" />

        <Box sx={{ width: "100%", paddingTop: "10px" }}>
          {bookmarkState ? (
            <IconButton onClick={deletebookmark} sx={{ color: "#cc0000" }}>
              <Star />
            </IconButton>
          ) : (
            <IconButton onClick={bookmark}>
              <StarOutlineIcon />
            </IconButton>
          )}
          <IconButton onClick={share}>
            <ShareIcon />
          </IconButton>
          <IconButton onClick={vote}>
            <ThumbUpOffAltIcon />
          </IconButton>
          {voteState ? <CircularProgress variant="determinate" value={progress} /> : <></>}
          
        </Box>

        <Box sx={{ display: "flex", gap: 2, paddingTop: "30px" }}>
          <Typography variant="body1" gutterBottom>
            {timePost}
          </Typography>
          <Typography variant="body1" gutterBottom>
            CNN Indonesia
          </Typography>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle3">{contentSnippet}</Typography>
          <Link sx={{ cursor: "pointer" }} href={source} target="_blank">
            Read more
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const Detail = () => {
  const { user } = useAuth();
  const [snack, setSnack] = useState(false);

  const navigate = useNavigate();
  const searchParams = useParams();
  const { listDetailNews } = useSelector((store) => store.latestNews);

  const [bookmarkData, setBookmarkData] = useState({});
  const [bookmarkState, setBookmarkState] = useState(false);

  const [voteState, setVoteState] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchCheckBookmark = async () => {
    if (searchParams.slug) {
      if (!user) {
        setBookmarkData({});
        setBookmarkState(false);
      } else {
        const dataBookmark = await checkBookmark(user, searchParams.slug);

        if (dataBookmark.found === true) {
          setBookmarkData(dataBookmark.data);
          setBookmarkState(true);
        } else {
          setBookmarkState(false);
        }
      }
    }
  };

  useEffect(() => {
    fetchCheckBookmark();
  }, []);

  if (!searchParams.slug) return <h1>Not Slug</h1>;

  const find = listDetailNews.find((item) => item.slug == searchParams.slug);

  const bookmark = async () => {
    try {
      if (user) {
        await addBookmark(user, find);
        setBookmarkState(true);
      } else {
        alert("You need to sign in");
        navigate("/signin", {
          replace: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletebookmark = async () => {
    try {
      if (user) {
        await removeBookmark(user, bookmarkData.id);
        setBookmarkState(false);
      } else {
        alert("You need to sign in");
        navigate("/signin", {
          replace: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const votes = async () => {
    try {
      if (user) {
        setTimeout(async () => {
          await addVotes(user, find);
          setSnack(true);
        }, 900);
      } else {
        alert("You need to sign in");
        navigate("/signin", {
          replace: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (find) {
    const share = () => {
      navigator.clipboard.writeText(find.link);
      alert("Link copied");
    };

    return (
      <>
        <DetailComp
          image={find.image.large}
          bookmarkState={bookmarkState}
          contentSnippet={find.contentSnippet}
          bookmark={bookmark}
          deletebookmark={deletebookmark}
          isoDate={find.isoDate}
          title={find.title}
          source={find.link}
          share={share}
          vote={votes}
          voteState={voteState}
          progress={progress}
        />

        <Snackbar
          open={snack}
          autoHideDuration={900}
          onClose={() => setSnack(false)}
          message="Article Voted"
        />
      </>
    );
  }

  if (bookmarkState) {
    const share = () => {
      navigator.clipboard.writeText(bookmarkData.link);
      alert("Link copied");
    };

    return (
      <>
        <DetailComp
          image={bookmarkData.image.large}
          bookmarkState={bookmarkState}
          contentSnippet={bookmarkData.contentSnippet}
          bookmark={bookmark}
          deletebookmark={deletebookmark}
          isoDate={bookmarkData.isoDate}
          title={bookmarkData.title}
          source={bookmarkData.link}
          share={share}
          vote={votes}
          voteState={voteState}
          progress={progress}
        />

        <Snackbar
          open={snack}
          autoHideDuration={900}
          onClose={() => setSnack(false)}
          message="Article Voted"
        />
      </>
    );
  }

  return <h1>Not Found</h1>;
};

export default Detail;
