(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{159:function(t,e,n){},161:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),r=n(51),l=n.n(r),i=n(60),c=n(52),u=n(53),s=n(59),m=n(54),f=n(61),h=function(t){var e=t.note;return o.a.createElement("li",null,e.content)},p=function(t){var e=t.message;return null===e?null:o.a.createElement("div",{className:"error"},e)},d=n(12),g=n.n(d),v={getAll:function(){return g.a.get("/api/notes").then(function(t){return t.data})},create:function(t){return g.a.post("/api/notes",t).then(function(t){return t.data})},update:function(t,e){return g.a.put("".concat("/api/notes","/").concat(t),e).then(function(t){return t.data})}},w=n(55),b=n(57),E=n.n(b),k=n(58),N=n.n(k),S=function(t){function e(){var t;return Object(c.a)(this,e),(t=Object(s.a)(this,Object(m.a)(e).call(this))).toggleVisible=function(){t.setState({showAll:!t.state.showAll})},t.addNote=function(e){e.preventDefault();var n={content:t.state.newNote,date:new Date,important:Math.random()>.5};v.create(n).then(function(e){t.setState({notes:t.state.notes.concat(e),newNote:""})})},t.toggleImportanceOf=function(e){return function(){var n=t.state.notes.find(function(t){return t.id===e}),a=Object(i.a)({},n,{important:!n.important});v.update(e,a).then(function(n){t.setState({notes:t.state.notes.map(function(t){return t.id!==e?t:n})})}).catch(function(a){t.setState({error:"muistiinpano '".concat(n.content,"' on jo valitettavasti poistettu palvelimelta"),notes:t.state.notes.filter(function(t){return t.id!==e})}),setTimeout(function(){t.setState({error:null})},5e4)})}},t.handleNoteChange=function(e){console.log(e.target.value),t.setState({newNote:e.target.value})},t.state={notes:[],newNote:"",showAll:!0,error:null},t}return Object(f.a)(e,t),Object(u.a)(e,[{key:"componentWillMount",value:function(){var t=this;v.getAll().then(function(e){t.setState({notes:e})})}},{key:"render",value:function(){var t=this,e=this.state.showAll?this.state.notes:this.state.notes.filter(function(t){return!0===t.important}),n=this.state.showAll?"vain t\xe4rke\xe4t":"kaikki";Object(w.withStyles)(function(t){return{head:{backgroundColor:t.palette.common.black,color:t.palette.common.white},body:{fontSize:14}}})(E.a);return o.a.createElement("div",null,o.a.createElement("h1",null,"Muistiinpanot"),o.a.createElement(p,{message:this.state.error}),o.a.createElement("div",null,o.a.createElement("li",{className:"note"},"  ",o.a.createElement("button",{onClick:this.toggleVisible},"n\xe4yt\xe4 ",n)," ")),o.a.createElement(N.a,null,o.a.createElement("table",null,e.map(function(e){return o.a.createElement(h,{key:e.id,note:e,toggleImportance:t.toggleImportanceOf(e.id)})}))),o.a.createElement("form",{onSubmit:this.addNote},o.a.createElement("input",{value:this.state.newNote,onChange:this.handleNoteChange}),o.a.createElement("button",{type:"submit"},"tallenna")))}}]),e}(a.Component);n(159);console.log("hello world"),l.a.render(o.a.createElement(S,null),document.getElementById("root"))},62:function(t,e,n){t.exports=n(161)}},[[62,2,1]]]);
//# sourceMappingURL=main.4f6a63be.chunk.js.map