import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import style from '../styles/styles.less';

class Demo extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="box" style={style}>{this.props.text}</div>
    );
  }
}

ReactDOM.render(
  <Demo text="This is a text"/>,
  document.querySelector('.container')
);
