import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Chat from "./Chat";
import Anime from "./Anime";
import Movies from "./Movies";

export default class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Header></Header>
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
              <h1 className="display-4">Welcome to Chatty</h1>
              <p className="lead">
                A great place to share your thoughts with friends
              </p>
              <div className="mt-4"></div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-sm rcorners" id="moviesb">
                <Link to="/movies">
                  <button className="btn btn-primary px-5" type="submit">
                    Go to Movies room
                  </button>
                </Link>
                <Movies />
              </div>
              <div className="col-sm rcorners" id="wolfsb">
                <Link to="/chats">
                  <button className="btn btn-primary px-5" type="submit">
                    Go to chat room
                  </button>
                </Link>
                <Chat />
              </div>
              <div className="col-sm rcorners" id="animeb">
                {" "}
                <Link to="/anime">
                  <button className="btn btn-primary px-5" type="submit">
                    Go to Anime room
                  </button>
                </Link>
                <Anime />
              </div>
            </div>
          </div>
        </section>
        <Footer></Footer>
      </div>
    );
  }
}
