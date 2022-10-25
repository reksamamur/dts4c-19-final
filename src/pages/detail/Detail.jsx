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
  Menu,
  MenuItem,
} from "@mui/material";

import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { Star } from "@mui/icons-material";

import { ThemeProvider } from "@mui/material/styles";
import { ThemeCreate } from "../../utils/themeprovider/theme-create";

import moment from "moment-timezone";
import debounce from "lodash.debounce";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
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
  voteState,
}) => {
  const [timePost, setTimePost] = useState();

  const postTimes = () => {
    let agos = moment(isoDate).fromNow();
    setTimePost(agos);
  };

  useEffect(() => {
    postTimes();
  }, [timePost]);

  const [anchorEl, setAnchorEl] = useState(null);
  const openShare = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <IconButton onClick={handleClick}>
            <ShareIcon />
          </IconButton>
          <IconButton onClick={vote}>
            <ThumbUpOffAltIcon />
          </IconButton>
          {voteState ? (
            <CircularProgress variant="determinate" value={progress} />
          ) : (
            <></>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openShare}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <FacebookShareButton
                url={source}
                style={{ display: "flex", alignItems: "center" }}
              >
                <FacebookIcon size={32} round /> &nbsp;Facebook
              </FacebookShareButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <TwitterShareButton
                url={source}
                style={{ display: "flex", alignItems: "center" }}
              >
                <TwitterIcon size={32} round /> &nbsp;Twitter
              </TwitterShareButton>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <WhatsappShareButton
                url={source}
                style={{ display: "flex", alignItems: "center" }}
              >
                <WhatsappIcon size={32} round />
                &nbsp;WhatsApp
              </WhatsappShareButton>
            </MenuItem>
            <MenuItem onClick={share}>
              <InsertLinkIcon
                size={32}
                style={{
                  background: "#b50a0a",
                  color: " #fff",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                }}
              />
              &nbsp;Copy Link
            </MenuItem>
          </Menu>
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
  const [anchorEl, setAnchorEl] = useState(null);
  const openShare = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
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
