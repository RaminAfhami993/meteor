//******************************************************************************************
//****************************       defualt code      *************************************
//****************************************************************************************** 

// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';

// import './main.html';

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });
      
// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });









//******************************************************************************************
//****************************       main app using reactive var      **********************
//****************************************************************************************** 
// import { Template } from 'meteor/templating';
// import { ReactiveVar } from 'meteor/reactive-var';

// import './main.html';

// Template.todosList.onCreated(function todosListOnCreated() {
//   // counter starts at 0
//   this.todos = new ReactiveVar([
//     {
//       label: "bye milk",
//       done: false
//     },
//     {
//       label: "bye coffee",
//       done: false
//     },
//     {
//       label: "bye tea",
//       done: true
//     },
//     {
//       label: "bye cheese",
//       done: true
//     }
//   ]);  
// });

// Template.todosList.helpers({
//   todos() {
//     return Template.instance().todos.get();
//   }
// });

// Template.todosList.events({
//   "click .add-new-todo"(events, instance) {
//     const x = instance.todos.get();
//     x.push({label: 1})
//     instance.todos.set(x);
//   }
// })









//******************************************************************************************
//****************************        add database to app       ****************************
//****************************************************************************************** 
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'bootstrap/dist/css/bootstrap.min.css'
import './main.html';


import {Todos} from '../imports/api/todos.js';

Template.todosList.onCreated(function todosListOnCreated() {
  this.sortOrder =  new ReactiveVar(-1)
})



Template.todosList.helpers({
  todos() {        
    return Todos.find({}, {sort: {createdAt: Template.instance().sortOrder.get()}});
  }
});

Template.todosList.events({
  "click .add-new-todo"(event, instance) {
    Todos.insert({label: "4"});
  },
  "click li>button"(event, instance) {
    Todos.remove({_id: this._id});
  },
  "click #reverseOrder"(event, instance) {
    Template.instance().sortOrder.set(-Template.instance().sortOrder.get())
  },
  "submit #todo-form"(event, instance) {
    event.preventDefault();
    
    Todos.insert({label: $(event.target).find('[name=label]').val(), createdAt: new Date()})
    $(event.target)[0].reset();
  }
})

Template.todosList.events({
  "change li>input"(event, instance) {

    var isDone = Todos.findOne({_id: this._id}).done;
    Todos.update({_id: this._id}, {$set: {done: !isDone}});        
  }
});


