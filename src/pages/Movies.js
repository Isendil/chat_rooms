import React, { Component } from "react";
import Header from "../components/Header";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      movies: [],
      content: "",
      readError: null,
      writeError: null,
      loadingmovies: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingmovies: true });
    const chatArea = this.myRef.current;
    try {
      db.ref("movies").on("value", (snapshot) => {
        let movies = [];
        snapshot.forEach((snap) => {
          movies.push(snap.val());
        });
        movies.sort(function (a, b) {
          return a.timestamp - b.timestamp;
        });
        this.setState({ movies });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingmovies: false });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingmovies: false });
    }
  }

  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("movies").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      });
      this.setState({ content: "" });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.handleSubmit(event);
    }
  };

  render() {
    return (
      <div>
        <Header />

        <div className="chat-area" ref={this.myRef} id="moviesb">
          {/* loading indicator */}
          {this.state.loadingmovies ? (
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            ""
          )}
          {/* chat area */}
          {this.state.movies.map((chat) => {
            return (
              <p
                key={chat.timestamp}
                className={
                  "chat-bubble " +
                  (this.state.user.uid === chat.uid ? "current-user" : "")
                }
              >
                {chat.content}
                <br />
                <span className="chat-time float-right">
                  {this.formatTime(chat.timestamp)}
                </span>
              </p>
            );
          })}
        </div>
        <form onSubmit={this.handleSubmit} className="mx-3">
          <textarea
            className="form-control"
            name="content"
            onChange={this.handleChange}
            value={this.state.content}
            onKeyPress={this.handleKeyPress}
          ></textarea>
          {this.state.error ? (
            <p className="text-danger">{this.state.error}</p>
          ) : null}
          <button type="submit" className="btn btn-submit px-5 mt-4">
            Send
          </button>
        </form>
        <div className="py-5 mx-3">
          Login in as:{" "}
          <strong className="text-info">{this.state.user.email}</strong>
        </div>
      </div>
    );
  }
}
