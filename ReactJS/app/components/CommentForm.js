import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';

export class CommentForm extends React.Component{
	
	constructor(props){
		
		super(props);
		
		this.state = {
			name:    '',
			comment: '',
			eleIdx: null
		};
		
		this._onChangeHandler = this._onChangeHandler.bind(this);
		this._onClickHandler  = this._onClickHandler.bind(this);
	}
	
	render(){
		
		return <form className="ui form">
					<h4 className="ui dividing header">{this.props.legend}</h4>
					<div className="field">
						<label>You Name</label>
						<input type="text" name="name" placeholder="name here..." value={this.state.name} onChange={this._onChangeHandler} />
					</div>
					<div className="field">
						<label>Comment</label>
						<input type="text" name="comment" placeholder="your comment" value={this.state.comment} onChange={this._onChangeHandler} />
					</div>
					<div className="field">
						<button className="ui icon button blue" onClick={this._onClickHandler}>
							<i className="icon save"></i> Save
						</button>
					</div>
		       </form>;
	}
	
	_onChangeHandler(e){
		e.preventDefault();
		this.setState({ 
			[e.target.name] : e.target.value
		});
	}
	
	_onClickHandler(e){
		
		e.preventDefault();
		
		if(!this.state.name.trim().length){
			return false;
		}
		
		let comment = {
			eleIdx:  this.state.eleIdx,
			author:  this.state.name,
			content: this.state.comment,
			date:    moment().format('YYYY-MM-DD')
		};
		
		if(!_.isUndefined(this.props.addComment)){
			this.props.addComment(comment);
			this.setState({
				name:    '',
				comment: '',
				eleIdx: null
			});
		}
		
		return false;
	}
	
}

CommentForm.defaultProps = { legend:"Form" };
CommentForm.propTypes = { legend : React.PropTypes.string.isRequired };