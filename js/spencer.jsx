/*** @jsx React.DOM */

var QuizQuestion = React.createClass({
    getInitialState: function(){
        //MUST BE AN OBJECT
        return{
            question: 'Enter A Question Title',
            answers: [],
            questionObject:{}
        }
    },
    createNewAnswer: function (answer) {
        answers = this.state.answers.push(answer);
        this.setState({
            answers: this.state.answers
        });
        console.log(this.state.answers);
    },
    handleQuestionChange: function (title) {
        var state = this.state;
        state.question = title;
        this.setState(state);
    },
    render: function(){
        return (
            <div>

                <div>
                <h1>{this.state.question}</h1>

                <ListAnswers answer={this.state.answers} />


                <hr/><br/>

                Question Title: <br/>
                    <AddTitle handleQuestionChange={this.handleQuestionChange}/>

                Create Possible Answer: <br/>
                    <NewAnswer
                        createNewAnswer = {this.createNewAnswer}
                    />
                </div>

                {/* Create new Quiz Object below */}

            </div>

        )
    }
});

var ListAnswers = React.createClass({
    render: function(){
        var listAnswers = this.props.answer.map(function(answer){
            return <li><input type='radio' name='question1' value={answer} />{answer}</li>;
        });
        return(
            <ul>
                {listAnswers}
            </ul>
        );
    }
});

var AddTitle = React.createClass({
    getInitialState: function(){
        //MUST BE AN OBJECT
        return{
            question: 'Enter Question Here'
        }
    },
    handleTitle: function(e){
        this.props.handleQuestionChange(e.target.value)
    },
    render: function(){
        return (

            <div>
                <input type='text' name='addTitle' placeholder="Enter an a Title" value={this.props.question} onChange={this.handleTitle} />
                <br/>
                <br/>
            </div>
        )
    }
});

var NewAnswer = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function() {
        //MUST BE AN OBJECT
        return {
            answer: ''
        }
    },
    handleNewAnswer: function(e){
        this.props.createNewAnswer(this.state.answer);
        this.setState({answer:""});
    },
    render:function (){
        return(
            <div>
                <li>
                    <input type='text' name='addQuestion' placeholder="Enter an answer" valueLink={this.linkState('answer')}/>
                </li>
                <button onClick={this.handleNewAnswer} className="btn btn-success" type="button">
                    Add Answer
                </button>
            </div>

        );
    }

});

React.render(<QuizQuestion />, document.getElementById('app'));