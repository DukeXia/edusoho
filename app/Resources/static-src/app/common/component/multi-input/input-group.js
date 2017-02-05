import React, { Component } from 'react';
import { trim } from '../../unit';
import { send } from '../../server';
import Options from './options';

export default class InputGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      searched: true,
      resultful: false,
      searchResult:[],
    }
    this.searchable = this.props.searchable.enable;
    this.addable = this.props.addable;
    this.searchableUrl = this.props.searchable.url;
  }

  selectChange(name,data) {
    if(data) {
      this.context.addItem(name,data);
    }
    this.setState({
      itemName: '',
    });
  }

  onFocus(event) {
    //在这种情况下，重新开启搜索功能；
    this.setState({
      searched: true,
    })
  }

  handleNameChange (event){
    let value = trim(event.currentTarget.value);
    this.setState({
      itemName: value,
      searchResult: [],
      resultful:false,
    });

    if(this.searchable && value.length > 0 && this.state.searched) {
      setTimeout(()=>{
        send(this.searchableUrl+value,searchResult=>{
          if(this.state.itemName.length>0) {
            console.log({'searchResult': searchResult});
            this.setState({
              searchResult: searchResult,
              resultful : true,
            });
          }
        });
      },100)
    }
  }

  handleAdd()  {
    if(this.state.itemName.length>0) {
      this.context.addItem(this.state.itemName,this.state.itemData);
    }
    this.setState({
      itemName:'',
      searchResult:[],
      resultful: false,
    })
  }

  render (){
    return (
      <div className="input-group">
        <input className="form-control" value={this.state.itemName} onChange={event => this.handleNameChange(event)} onFocus = {event=>this.onFocus(event)}  />
        { this.searchable && this.state.resultful && <Options searchResult ={this.state.searchResult} selectChange ={(event,name)=>this.selectChange(event,name)} resultful={this.state.resultful}/> }
        { this.addable && <span className="input-group-btn"><a className="btn btn-default" onClick={()=>this.handleAdd()}>添加</a></span> }
      </div>
    );
  }
}

InputGroup.contextTypes = {
  addItem:React.PropTypes.func,
};