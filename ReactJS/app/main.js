import 'fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import _ from 'underscore';
import {CommentList} from 'app/components/CommentList';
import {CommentForm} from 'app/components/CommentForm';

class MainApp extends React.Component {
	
	constructor(props){
		super(props);
		
		this.original_comments = [
			{author:'Aitch', content:'This is a comment', date:'2016-01-20'},
			{author:'XuXi', content:'This is a comment', date:'2016-01-21'},
		];
		
		this.state = { data :  this.original_comments };
		
		this._onResetHandler = this._onResetHandler.bind(this);
		this._updateComments = this._updateComments.bind(this);
	}
	
	render(){
		return (
			   <div>
				   <div className="ui raised very padded text container segment">
						<CommentList data={this.state.data}
							         editComment={this._updateComments.bind(this, 'edit')}
									 removeComment={this._updateComments.bind(this, 'remove')}>
						</CommentList>
						<CommentForm legend="Comment here..." 
							         addComment={this._updateComments.bind(this, 'add')}
									 ref="commentform">
						</CommentForm>
			       </div>
			   	   <div className="ui raised text container segment">
					   <div className="ui footer field">
						   <button className="ui icon button" onClick={this._onResetHandler}>
							   <i className="icon bomb"></i>
						   </button>
					   </div>
				   </div>
		       </div>);
	}
	
	_onResetHandler(e){
		e.preventDefault();
		this.original_comments = [];
		this.setState({ data : this.original_comments });
	}
	
	_updateComments(mode, data){
		
		switch(mode){
			case 'add':
			    console.info(data);
				if(!_.isUndefined(data.eleIdx) && !_.isNull(data.eleIdx)){
					this.original_comments[data.eleIdx] = data;
 				}else{
					this.original_comments.push(data);
				}
				this.setState( { data:this.original_comments });
				break;
				
			case 'edit':
				var idx = data;
				var selectedItem = this.original_comments[idx];
				
				this.refs.commentform.setState({
					name:    selectedItem.author,
					comment: selectedItem.content,
					eleIdx:  idx
				})
				break;
				
			case 'remove':
				var idx = data;
				this.original_comments.splice(idx, 1);
				this.setState( { data:this.original_comments });
				break;
		}
	}
}

ReactDOM.render(<MainApp/>, document.getElementById('container'));