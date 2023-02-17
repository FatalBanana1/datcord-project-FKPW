import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  actionResetDirectMessages,
  thunkReadAllDirectMessages,
} from "../../../store/directMessages";
import { io } from "socket.io-client";

let socket;

export default function DMIndex({ theme }) {
  let dispatch = useDispatch();
  let { senderId, friendId } = useParams();
  //states
  const [isLoaded, setIsLoaded] = useState(false);
  const [edit, setEdit] = useState(999999990);
  const [reload, setReload] = useState(0);
  const [loadBottom, setLoadBottom] = useState(false);
  // controlled form input
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  // img upload
  const [imageButton, setImageButton] = useState(false);
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  //selectors
  const alldms = useSelector((state) => state.channelMessages);
  let dms = Object.values(alldms);
  const user = useSelector((state) => state.session.user);

  // -------------

  // scroll
  const endMsgRef = useRef(null);
  const scrollToBottom = () => {
    if (!endMsgRef.current) {
      return;
    } else if (edit === 999999999 || edit === 999999990) {
      endMsgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  //----------------

  //effects
  useEffect(() => {
    scrollToBottom();
  }, [loadBottom, messages, dms, newImage]);

  useEffect(() => {
    scrollToBottom();
    dispatch(thunkReadAllDirectMessages(friendId)).then(() => {
      setIsLoaded(true);
      setLoadBottom(true);
    });

    return () => {
      setChatInput("");
      setMessages([]);
      setEdit(999999990);
    };
  }, [friendId, senderId, image, reload]);

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();
    // socket.emit("join", { channelId: channelId, username: user.username });

    socket.on("direct_message", (direct_message) => {
      setMessages((messages) => [...messages, direct_message]);
    });

    // when component unmounts, disconnect
    return () => {
      setChatInput("");
      socket.disconnect();
      // setMessages([]);
      dispatch(actionResetDirectMessages());
    };
  }, [senderId, friendId]);

  // ----------------------

  if (isLoaded && friendId && user && theme) {
    const updateChatInput = (e) => {
      setChatInput(e.target.value);
    };

    //send chat messages through the websocket
    const sendChat = (e) => {
      e.preventDefault();
      if (chatInput.length < 1) return null;
      socket.emit("direct_message", {
        sender_id: senderId,
        message: chatInput,
        friend_id: friendId,
      });
      setChatInput("");
    };

    // ---------------

    // handlers

    // delete
    // const deleteHandler = (e) => {
    // 	setIsLoaded(false);
    // 	const payload = {
    // 		serverId,
    // 		channelId,
    // 		id: e.target.dataset.id,
    // 		sender_id: e.target.dataset.sender,
    // 	};
    // 	// return
    // 	return dispatch(thunkDeleteChannelMessage(payload)).then(() =>
    // 		setIsLoaded(true)
    // 	);
    // };

    // // delete
    // const deleteHandlerCurr = (e) => {
    // 	setIsLoaded(false);
    // 	const payload = {
    // 		serverId,
    // 		channelId,
    // 		id: e.target.dataset.id,
    // 		sender_id: e.target.dataset.sender,
    // 	};
    // 	const msg = messages.filter(
    // 		(el) => el.message !== e.target.dataset.msg
    // 	);
    // 	setMessages(msg);
    // 	// console.log(`find message in delete`, msg);

    // 	// return
    // 	return dispatch(thunkDeleteChannelMessage(payload))
    // 		.then(() => {
    // 			setChatInput("");
    // 			setMessages([]);
    // 			dispatch(thunkReadAllChannelMessages(serverId, channelId));
    // 		})
    // 		.then(() => setEdit(999999990))
    // 		.then(() => setIsLoaded(true));
    // };

    // -------------

    // edit
    const handleEdit = (e) => {
      setEdit(e.target.dataset.id);
    };

    // edit child change
    const handleEditChange = (e) => {
      setEdit(e);
      if (e === 0) {
        // console.log(`front CM index`, e, edit);
        setChatInput("");
        setMessages([]);
        setLoadBottom(true);
      }
    };

    // -------------

    // upload images
    const imageLinks = {
      ".pdf": 1,
      ".png": 1,
      ".jpg": 1,
      jpeg: 1,
      ".gif": 1,
      ".svg": 1,
    };
    const sendImage = async (e) => {
      e.preventDefault();
      //img upload
      const formData = new FormData();
      formData.append("image", image);
      setImageLoading(true);
      const res = await fetch(`/api/dms/images/${friendId}`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        await res.json();
        setImage("");
        dispatch(thunkReadAllDirectMessages(friendId))
          .then(() => {
            setIsLoaded(true);
            setLoadBottom(true);
            setImageButton(false);
            setImageLoading(false);
          })
          .then(() => setEdit(999999990));
      } else {
        setImageLoading(false);
        console.log("Error uploading image to AWS!", res);
      }
      setChatInput("");
      setNewImage(false);
    };
    const updateImage = (e) => {
      const file = e.target.files[0];
      setImage(file);
    };

    const imageClickHandler = (message) => {
      return (
        <div>
          <img src={message.message}></img>
        </div>
      );
    };

    // --------------------
    // date
    let date = new Date();

    console.log(`front dm index ==========`, messages);

    // return

    return (
      user && (
        <div className="cms-container">
          <div className="cms-ch-name" id={theme}>{`# ${friendId}`}</div>

          <div className="cms-ct">
            <div className="cm-overflow" id={theme}>
              {dms.length
                ? dms.map((message, i) => (
                    <div id={theme} className="row justify" key={message.id}>
                      {i - 1 >= 0 &&
                      dms[i - 1] &&
                      message.sender_id &&
                      message.sender_id === dms[i - 1].sender_id ? (
                        <div className="cm-spacer"></div>
                      ) : (
                        <div
                          // to="#"
                          className="img-link"
                          data-id={message.id}
                          // onClick={memberClickHandler}
                        >
                          <img
                            src={message.display_pic}
                            alt="crown"
                            className="pic-icon"
                            data-id={message.id}
                          />
                        </div>
                      )}

                      {message.id == edit ? null : ( // /> // 	serverId={serverId} // 	channelId={channelId} // 	onChange={handleEditChange} // 	message={message} // <CMEdit
                        <div className="msg-ct">
                          <div className="cms-msg-header" id={theme}>
                            {i - 1 >= 0 &&
                            dms &&
                            dms.length &&
                            dms[i - 1] &&
                            message.sender_id &&
                            message.sender_id === dms[i - 1].sender_id ? (
                              <div className="cm-spacer2"></div>
                            ) : (
                              <>
                                {senderId === user.id ? (
                                  <div
                                    id={theme}
                                    className="cms-admin"
                                  >{`${message.sender_nickname}`}</div>
                                ) : (
                                  <div id={theme} className="cms-member">
                                    {`${message.sender_nickname}`}{" "}
                                  </div>
                                )}

                                <div className="cms-msg-date" id={theme}>
                                  {message.created_at.slice(0, 22)}
                                </div>
                              </>
                            )}

                            {user.id === message.sender_id ? (
                              <div
                                id={theme}
                                className="cms-options absolute-op"
                              >
                                <div
                                  className="cms-edit"
                                  data-id={message.id}
                                  onClick={handleEdit}
                                >
                                  Edit
                                </div>
                                <div
                                  className="cms-delete"
                                  // onClick={
                                  // 	deleteHandler
                                  // }
                                  data-id={message.id}
                                  data-sender={message.sender_id}
                                >
                                  Delete
                                </div>
                              </div>
                            ) : null}
                          </div>

                          {message.created_at == message.updated_at &&
                          !imageLinks[
                            message.message.slice(message.message.length - 4)
                          ] ? (
                            <div className="cms-msg-detail">{`${message.message}`}</div>
                          ) : imageLinks[
                              message.message.slice(message.message.length - 4)
                            ] ? (
                            <div>
                              <img
                                src={message.message}
                                className="aws-image"
                                alt={`uploaded by ${message.sender_nickname}`}
                              ></img>
                            </div>
                          ) : (
                            <div className="row">
                              <div className="cms-msg-detail">{`${message.message}`}</div>
                              <div className="cms-msg-detail edited">{`(edited)`}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                : null}

              {messages.length > 0
                ? messages.map((message, i) => (
                    <div id={theme} key={`s_${i}`} className="row justify">
                      {i >= 1 ? (
                        <div>
                          {message.sender_id &&
                          message.sender_id === messages[i - 1].sender_id ? (
                            <div className="cm-spacer"></div>
                          ) : null}
                        </div>
                      ) : i >= 1 &&
                        dms &&
                        dms.length - 1 &&
                        dms[dms.length - 1].sender_id === message.sender_id ? (
                        <div className="cm-spacer"></div>
                      ) : (
                        <div className="img-link">
                          <img
                            src={message.display_pic}
                            alt="crown"
                            className="pic-icon"
                          />
                        </div>
                      )}

                      {message.id == edit ? // 	onChange={handleEditChange} // 	message={message} // <CMEdit
                      // />
                      null : (
                        <div className="msg-ct">
                          <div className="cms-msg-header">
                            {i >= 1 ? (
                              <div>
                                {message.sender_id &&
                                message.sender_id ===
                                  messages[i - 1].sender_id ? (
                                  <div className="cm-spacer2"></div>
                                ) : null}
                              </div>
                            ) : i >= 1 &&
                              dms &&
                              dms.length - 1 &&
                              dms[dms.length - 1].sender_id ===
                                message.sender_id ? (
                              <div className="cm-spacer2"></div>
                            ) : (
                              <>
                                {message.role === "owner" ? (
                                  <>
                                    <div
                                      id={theme}
                                      className="cms-admin"
                                    >{`${message.sender_nickname}`}</div>
                                    {/* <img
																			src={
																				crown
																			}
																			alt="crown"
																			className="icon"
																		/> */}
                                  </>
                                ) : message.role === "admin" ? (
                                  <div
                                    id={theme}
                                    className="cms-admin"
                                  >{`${message.sender_nickname}`}</div>
                                ) : message.role === "member" ? (
                                  <div id={theme} className="cms-member">
                                    {`${message.sender_nickname}`}{" "}
                                  </div>
                                ) : (
                                  <div
                                    id={theme}
                                    className="cms-pending"
                                  >{`${message.sender_nickname}`}</div>
                                )}
                                <div className="cms-msg-date">
                                  {date.toUTCString().slice(0, 22)}
                                </div>
                              </>
                            )}

                            {+user.id === +message.sender_id ? (
                              <div
                                id={theme}
                                className="cms-options absolute-op"
                              >
                                <div
                                  className="cms-edit"
                                  data-id={message.id}
                                  data-sender={message.sender_id}
                                  onClick={handleEdit}
                                >
                                  Edit
                                </div>
                                <div
                                  className="cms-delete"
                                  // onClick={
                                  // 	deleteHandlerCurr
                                  // }
                                  data-id={message.id}
                                  data-msg={message.message}
                                  data-sender={message.sender_id}
                                >
                                  Delete
                                </div>
                              </div>
                            ) : null}
                          </div>

                          {imageLinks[
                            message.message.slice(message.message.length - 4)
                          ] ? (
                            <div>
                              <img
                                src={message.message}
                                className="aws-image"
                                alt={`uploaded by ${message.sender_nickname}`}
                              ></img>
                            </div>
                          ) : (
                            <div className="cms-msg-detail">{`${message.message}`}</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                : null}
              <div ref={endMsgRef} />
            </div>

            {friendId ? (
              <div className="cm-form-container">
                {!imageButton ? (
                  <button
                    id={theme}
                    className="cm-img-input"
                    onClick={() => setImageButton(true)}
                  >
                    +
                  </button>
                ) : (
                  <button
                    id={theme}
                    className="cm-img-input-x"
                    onClick={() => setImageButton(false)}
                  >
                    x
                  </button>
                )}

                {imageButton ? (
                  // image upload
                  <form onSubmit={sendImage} className="submit-cm">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={updateImage}
                    />
                    <button type="submit">Submit</button>
                    {imageLoading && <div>Loading...</div>}
                  </form>
                ) : null}
                {!imageButton ? (
                  // text input
                  <form onSubmit={sendChat} className="submit-cm">
                    <input
                      value={chatInput}
                      onChange={updateChatInput}
                      className="cm-text-input"
                      id={theme}
                    />
                  </form>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      )
    );
  } else return <div>Sliding into your DMs...</div>;
}
