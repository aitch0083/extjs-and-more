import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Comment} from 'app/components/Comment';
import _ from 'underscore';

export class CommentList extends React.Component{
	
	constructor(props){
		super(props);
		
		this._onEditClickHandler   = this._onEditClickHandler.bind(this);
		this._onRemoveClickHandler = this._onRemoveClickHandler.bind(this);
	}
	
	render(){
		var nodes = this.props.data.map( (record, idx) => {
			return <Comment author={record.author}
							content={record.content}
							date={record.date}
							key={idx}
							eleIdx={idx}
							onEditClickHandler={this._onEditClickHandler}
							onRemoveClickHandler={this._onRemoveClickHandler}>
					</Comment>
		});
		
		return (<div className="ui comments">{nodes}</div>);
	}
	
	_onEditClickHandler(idx, evt){
		evt.preventDefault();
		
		if(!_.isUndefined(this.props.editComment)){
			this.props.editComment(idx);
		}
	}
	
	_onRemoveClickHandler(idx, evt){
		evt.preventDefault();
		
		if(!_.isUndefined(this.props.removeComment)){
			this.props.removeComment(idx);
		}
	}
}

CommentList.propTypes = {
	editComment:   React.PropTypes.func.isRequired,
	removeComment: React.PropTypes.func.isRequired
};