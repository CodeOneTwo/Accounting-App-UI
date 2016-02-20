/// <reference path="../typings/tsd.d.ts" />

import * as React from "react";
import * as ReactDOM  from "react-dom";
import {RaisedButton} from "material-ui";
import {MyAppProps} from "./MyAppInterface";

interface CommentState {

}

interface MyAppState {

}

class MyApp extends React.Component<MyAppProps, MyAppState> {
  render () {
      return <div className="myApp">
          <h1>Hello {this.props.name} {this.props.age}</h1>
          <h2>This is your first time here</h2>
          <p>How about you say hi to the Program</p>
          <CommentList />
          <RaisedButton label="Default" />
          </div>;
  }
}
class CommentList extends React.Component<CommentState, MyAppState> {
  render () {
      return <div className="commentEntry">
          <h2>Hello Ptite</h2>
          </div>;
  }
}
ReactDOM.render(<MyApp name="hans" age={424242}/> , document.getElementById("reacttarget"));
