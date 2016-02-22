import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export class Comment extends React.Component{
	
	constructor(props){
		super(props);
	}
	
	render(){
		return <article className="ui comment">
					<a className="author">
						{this.props.author}
					</a>
					<div className="metadata">
						<span className="date">{this.props.date}</span>
						<a className="ui reply button green icon mini" onClick={this.props.onEditClickHandler.bind(this, this.props.eleIdx)}>
							<i className="icon edit"></i>
						</a>
	        			<a className="ui reply button red icon mini" onClick={this.props.onRemoveClickHandler.bind(this, this.props.eleIdx)}>
							<i className="icon remove"></i>
						</a>
					</div>
					<div className="text">{this.props.content}</div>
			   </article>;
	}
}

Comment.propTypes= {
	onEditClickHandler : React.PropTypes.func.isRequired,
	onRemoveClickHandler : React.PropTypes.func.isRequired
};