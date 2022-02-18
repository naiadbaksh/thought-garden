import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Info from "./Info";
import {
  BlackOutlineButton,
  GreenButton,
  Header,
  PageWrapper,
  ButtonsContainer,
  PageOverlay,
  HomePageContainer,
  RoomCode,
  ThoughtGarden,
} from "./Components.styled";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
      current: 0,
    };
    this.clearRoomCode = this.clearRoomCode.bind(this);
  }

  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
  }

  renderHomePage() {
    return (
      <>
        <HomePageContainer>
          <PageOverlay></PageOverlay>
          <PageWrapper id="homePageWrapper">
            <ThoughtGarden />
            <ButtonsContainer>
              <GreenButton href="/join">JOIN A ROOM</GreenButton>
              <BlackOutlineButton href="/info">INFO</BlackOutlineButton>
              <GreenButton href="/create">CREATE A ROOM</GreenButton>
            </ButtonsContainer>
          </PageWrapper>
        </HomePageContainer>
      </>
    );
  }

  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return this.state.roomCode ? (
                <Redirect to={`/room/${this.state.roomCode}`} />
              ) : (
                this.renderHomePage()
              );
            }}
          />
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/info" component={Info} />
          <Route path="/create" component={CreateRoomPage} />
          <Route
            path="/room/:roomCode"
            render={(props) => {
              return <Room {...props} leaveRoomCallback={this.clearRoomCode} />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}
