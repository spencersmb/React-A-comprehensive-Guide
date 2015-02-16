/*** @jsx React.DOM */

//Create react component
var HelloWorld = React.createClass({
    //SET an initial state
    getInitialState: function(){
        return {
            username: '@tylermcginnis33',
            myName: "Tyler",
            friends: ['Jake Lingwall', 'Murphy Randall', 'Merrick Christensen']
        }
    },
    //this method gets called everytime user types in the input
    handleChange: function(e){

        this.setState({
            //this.setState calls the virtual DOM looks at the target value of username and if its different changes the view.
            username: e.target.value
        });
    },
    addFriend: function(friend){
        this.setState({
            friends: this.state.friends.concat([friend])
        });
    },
    render: function(){
        return (
            <div>
                <h1>Hello {this.state.username}</h1> <br />
                {/* This sets up a simple 2 way data bind input changes the username.*/}
                Change Name: <input type='text' value={this.state.username} onChange={this.handleChange} />
                <hr/>
                <h3> Hello, {this.state.myName}</h3>

                {/* Pass the addnew method to the child */}
                <AddFriend addnew={this.addFriend}/>

                {/* Call Show list render function */}
                <ShowList names ={this.state.friends} />
            </div>
        )
    }
});

var ShowList = React.createClass({
    render: function(){

        //If you needed to manipulate some piece of data outside where the data lives, you’d pass the getter/setter method into that component as props.

        //map over listitems array and set it as li friend
        var listItems = this.props.names.map(function(friend){
            return <li> {friend} </li>;
            //creates a new array, calls our callback function on each item in the array, and fills the new array with the result of calling the callback function on each item.
        });

        return(
            <div>
                <h3> Friends </h3>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }
});

var AddFriend = React.createClass({
    getInitialState: function(){
        return {
           newFriend: ''
        }
    },
    updateNewFriend: function(e){
        //update the value={this.state.newFriend} onChange
      this.setState({
          newFriend: e.target.value
      });
    },
    handleAddNew: function(){
        //get text input value and set it as new text
        //this addnew function is passed down from the parent and we set its new state with the current state of new friend as and object.
        if(this.state.newFriend === '' || this.state.newFriend === null){
            alert('type in a name');
        } else{
            this.props.addnew(this.state.newFriend);
            this.setState({
               newFriend:''
            });
            alert('name added');
        }

    },
    render:function(){
        return(
            <div>
            <input type="text" value={this.state.newFriend} onChange={this.updateNewFriend} />
            <button onClick={this.handleAddNew}> Add Friend </button>
            </div>
        )
    }
});


// The first argument is the component you want to render, the second argument is the DOM node where you want to render the component.
React.render(<HelloWorld/>, document.getElementById('app'));

